import { useState } from "react"

import { FEATURE_ICONS } from "../../data/featureIcons"

// Block to add or edit a feature: name + icon grid + "Guardar" / "Cancelar".
// It is a <div>, not a <form>, so it can live inside another form (the edit product window).
// onSave receives { name, icon } and may throw an Error whose message is shown to the user.
export const FeatureForm = ({ title, initialName = '', initialIcon = '', onSave, onCancel }) => {

    const [name, setName] = useState(initialName)
    const [icon, setIcon] = useState(initialIcon)
    const [error, setError] = useState(null)
    const [saving, setSaving] = useState(false)

    const handleSave = async () => {
        if (!name.trim() || !icon) {
            setError('Ingresa un nombre y selecciona un ícono')
            return
        }

        setError(null)
        setSaving(true)
        try {
            await onSave({ name: name.trim(), icon })
        } catch (err) {
            setError(err.message)
            setSaving(false)
        }
    }

    return (
        <div className="p-4 bg-white text-slate-700 rounded-sm border border-slate-200 flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-blue-900">{title}</h2>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold">Nombre</label>
                <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 text-black bg-[#E8E8E8] outline-none focus:ring-2 focus:ring-[#5D9C42] rounded-lg"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold">Ícono</label>
                <div className="grid grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
                    {FEATURE_ICONS.map((iconClass) => (
                        <button
                        key={iconClass}
                        type="button"
                        onClick={() => setIcon(iconClass)}
                        title={iconClass}
                        className={`h-10 rounded-lg text-xl flex items-center justify-center cursor-pointer transition-colors
                            ${icon === iconClass ? 'bg-[#5D9C42] text-white' : 'bg-[#E8E8E8] text-slate-700 hover:bg-slate-300'}`}
                        >
                            <i className={iconClass}></i>
                        </button>
                    ))}
                </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex gap-3">
                <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="bg-green-600 text-white rounded-lg p-2 px-6 cursor-pointer border border-transparent hover:border-green-600 hover:bg-white hover:text-green-600 transition-all duration-300 disabled:opacity-60"
                >
                    Guardar
                </button>
                <button
                type="button"
                onClick={onCancel}
                className="rounded-lg p-2 px-6 border border-slate-400 text-slate-600 cursor-pointer hover:bg-slate-100 transition-all duration-300"
                >
                    Cancelar
                </button>
            </div>
        </div>
    )
}
