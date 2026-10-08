import { pluralizeCategory } from "../../utils/categoryUtils"

// Toggleable category chips to filter the results by one or more categories.
export const CategoryFilterBar = ({ categories, counts, selectedIds, onChange }) => {

    const toggle = (id) => {
        onChange(selectedIds.includes(id)
            ? selectedIds.filter((selected) => selected !== id)
            : [...selectedIds, id])
    }

    return (
        <div className="flex flex-wrap items-center gap-2">
            {categories.map((category) => {
                const selected = selectedIds.includes(category.id)
                return (
                    <button
                    key={category.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggle(category.id)}
                    className={`flex items-center gap-1 px-4 py-2 rounded-full border text-sm font-medium cursor-pointer transition-colors
                        ${selected ? 'border-[#5D9C42] bg-[#5D9C42] text-white' : 'border-[#5D9C42] bg-white text-[#5D9C42] hover:bg-[#5D9C42]/10'}`}
                    >
                        {pluralizeCategory(category.category)} ({counts[category.id] ?? 0})
                        {selected && <span aria-hidden="true" className="ml-1">✕</span>}
                    </button>
                )
            })}

            {selectedIds.length > 0 && (
                <button
                type="button"
                onClick={() => onChange([])}
                className="px-4 py-2 text-sm font-medium text-slate-600 underline cursor-pointer hover:text-[#5D9C42]"
                >
                    Limpiar filtros
                </button>
            )}
        </div>
    )
}
