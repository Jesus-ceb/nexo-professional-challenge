import React, { useEffect } from 'react'
import { RiArrowLeftSLine, RiArrowRightSLine, RiCloseLine } from 'react-icons/ri'

// Enlarged photo over a dark backdrop, with arrows (and keyboard) to move through every product image.
export const ImageLightbox = ({images, productName, index, onChange, onClose}) => {

    const hasMany = images.length > 1

    // circular navigation: after the last photo comes the first one and vice versa
    const showPrev = () => onChange((index - 1 + images.length) % images.length)
    const showNext = () => onChange((index + 1) % images.length)

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') onClose()
            if (!hasMany) return
            if (e.key === 'ArrowLeft') onChange((index - 1 + images.length) % images.length)
            if (e.key === 'ArrowRight') onChange((index + 1) % images.length)
        }

        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [index, images.length, hasMany, onChange, onClose])

    return (
        // clicking the dark backdrop closes the photo and goes back to the grid
        <div
        onClick={onClose}
        className="fixed inset-0 z-[60] bg-black/85 flex items-center justify-center"
        >
            {/* close button */}
            <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute top-4 right-4 text-white text-4xl cursor-pointer hover:text-[#A0CF8C]"
            >
                <RiCloseLine />
            </button>

            {/* previous arrow */}
            {hasMany && (
                <button
                type="button"
                onClick={(e) => { e.stopPropagation(); showPrev() }}
                aria-label="Foto anterior"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white text-4xl rounded-full p-1 cursor-pointer transition-colors"
                >
                    <RiArrowLeftSLine />
                </button>
            )}

            {/* enlarged photo: limited to the screen; object-contain shows it whole, vertical or horizontal */}
            <img
            src={images[index].url}
            alt={`${productName} ${index + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-w-[90vw] md:max-w-[70vw] max-h-[75vh] object-contain rounded-lg"
            />

            {/* next arrow */}
            {hasMany && (
                <button
                type="button"
                onClick={(e) => { e.stopPropagation(); showNext() }}
                aria-label="Foto siguiente"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white text-4xl rounded-full p-1 cursor-pointer transition-colors"
                >
                    <RiArrowRightSLine />
                </button>
            )}

            {/* counter */}
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
                {index + 1} / {images.length}
            </span>
        </div>
    )
}
