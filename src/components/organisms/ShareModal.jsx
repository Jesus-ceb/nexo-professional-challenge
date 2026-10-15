import { useEffect, useState } from 'react'
import { SHARE_NETWORKS } from '../../data/shareNetworks'

const MAX_MESSAGE = 280
const PREVIEW_LENGTH = 140

// Short version of the description for the preview: first ~140 characters, cut at a space.
const shorten = (text = '') => {
    if (text.length <= PREVIEW_LENGTH) return text
    const cut = text.lastIndexOf(' ', PREVIEW_LENGTH)
    return `${text.slice(0, cut > 0 ? cut : PREVIEW_LENGTH)}…`
}

// Share window of the product detail: preview (image, short description, link), a message the user can edit,
// and the social network to share on. onNotify shows a short message (Toast) in the page.
export const ShareModal = ({ product, url, onClose, onNotify }) => {

    const [message, setMessage] = useState(`¡Mira este alojamiento en Nexo: ${product.name}!`)
    const [networkId, setNetworkId] = useState(null)

    const network = SHARE_NETWORKS.find((item) => item.id === networkId)

    // Escape closes the window.
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [onClose])

    const copy = (text, notice) => {
        navigator.clipboard.writeText(text)
            .then(() => onNotify(notice))
            .catch(() => onNotify('No se pudo copiar, cópialo manualmente'))
    }

    // For now sharing does nothing: no redirect to the network.
    // TODO: to enable it, copy the message when network.copyFirst and open network.buildUrl(url, message)
    // with window.open right in the click (not after a promise) so the browser doesn't block the popup.
    const handleShare = () => {}

    return (
        <div
        className="fixed inset-0 bg-black/70 z-50 flex items-start sm:items-center justify-center overflow-y-auto p-4"
        onClick={onClose}
        >
            <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="share-title"
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-lg rounded-lg p-5 sm:p-6"
            >

                {/* Header */}
                <div className="flex items-center justify-between">
                    <h2 id="share-title" className="text-xl font-bold text-slate-800">Compartir alojamiento</h2>
                    <button
                    type="button"
                    onClick={onClose}
                    aria-label="Cerrar"
                    className="text-slate-600 hover:text-slate-900 text-2xl cursor-pointer"
                    >
                        ×
                    </button>
                </div>

                {/* Preview: image + name + short description */}
                <div className="mt-4 border border-gray-200 rounded-md overflow-hidden">
                    <img
                    src={product.images?.[0]?.url || '/images/sin_imagen.jpg'}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                    />
                    <div className="p-3">
                        <p className="font-semibold text-slate-800">{product.name}</p>
                        <p className="mt-1 text-sm text-slate-600 line-clamp-3">{shorten(product.description)}</p>
                    </div>
                </div>

                {/* Direct link */}
                <label htmlFor="share-link" className="block mt-4 text-sm font-medium text-slate-700">Enlace del alojamiento</label>
                <div className="mt-1 flex gap-2">
                    <input
                    id="share-link"
                    type="text"
                    readOnly
                    value={url}
                    onFocus={(e) => e.target.select()}
                    className="flex-1 min-w-0 border border-gray-300 rounded-md px-3 py-2 text-sm text-slate-600 bg-gray-50"
                    />
                    <button
                    type="button"
                    onClick={() => copy(url, 'Enlace copiado')}
                    className="shrink-0 px-4 py-2 text-sm rounded-md border border-[#5D9C42] text-[#5D9C42] cursor-pointer hover:bg-[#F0F7ED]"
                    >
                        Copiar
                    </button>
                </div>

                {/* Custom message */}
                <label htmlFor="share-message" className="block mt-4 text-sm font-medium text-slate-700">Tu mensaje</label>
                <textarea
                id="share-message"
                rows={3}
                maxLength={MAX_MESSAGE}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-slate-700 resize-none focus:outline-none focus:ring-2 focus:ring-[#5D9C42]"
                />
                <p className="text-right text-xs text-slate-400">{message.length}/{MAX_MESSAGE}</p>

                {/* Network choice */}
                <p className="mt-2 text-sm font-medium text-slate-700">Elige dónde compartir</p>
                <div className="mt-2 grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {SHARE_NETWORKS.map((item) => {
                        const selected = item.id === networkId
                        return (
                            <button
                            key={item.id}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => setNetworkId(item.id)}
                            className={`flex flex-col items-center gap-1 p-2 rounded-md border-2 text-xs text-slate-700 cursor-pointer transition-colors
                                ${selected ? 'border-[#5D9C42] bg-[#F0F7ED]' : 'border-gray-200 hover:border-gray-300'}`}
                            >
                                <i className={`${item.icon} ${item.color} text-2xl`} aria-hidden="true"></i>
                                {item.name}
                            </button>
                        )
                    })}
                </div>

                {/* Share */}
                <button
                type="button"
                disabled={!network}
                onClick={handleShare}
                className="mt-5 w-full py-2.5 rounded-md bg-[#5D9C42] text-white font-semibold cursor-pointer hover:bg-[#4c8236] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    {network ? `Compartir en ${network.name}` : 'Compartir'}
                </button>

            </div>
        </div>
    )
}
