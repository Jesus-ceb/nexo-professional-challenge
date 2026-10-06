// Checkbox list to associate one or more features with a product (used in create and edit).
export const FeatureSelector = ({ features, selectedIds, onChange }) => {

    const toggle = (id) => {
        onChange(selectedIds.includes(id)
            ? selectedIds.filter((selected) => selected !== id)
            : [...selectedIds, id])
    }

    if (features.length === 0) {
        return <p className="text-sm text-slate-500">No hay características registradas</p>
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {features.map((feature) => {
                const checked = selectedIds.includes(feature.id)
                return (
                    <label
                    key={feature.id}
                    className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer border transition-colors text-slate-800
                        ${checked ? 'border-[#5D9C42] bg-[#5D9C42]/10' : 'border-transparent bg-[#E8E8E8] hover:border-slate-300'}`}
                    >
                        <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggle(feature.id)}
                        className="accent-[#5D9C42]"
                        />
                        <i className={`${feature.icon} text-lg text-[#5D9C42]`}></i>
                        <span className="text-sm">{feature.name}</span>
                    </label>
                )
            })}
        </div>
    )
}
