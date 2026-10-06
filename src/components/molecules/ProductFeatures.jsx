// "¿Qué ofrece este lugar?" block in the product detail: every feature with its Remix icon.
export const ProductFeatures = ({ features = [] }) => {

    return (
        <section>
            <h2 className="text-xl font-bold text-slate-800 mt-6 border-b pb-2">
                ¿Qué ofrece este lugar?
            </h2>

            {features.length === 0 ? (
                <p className="mt-4 text-sm text-slate-500">Este producto no tiene características registradas</p>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                    {features.map((feature) => (
                        <li key={feature.id} className="flex items-center gap-2">
                            <i className={`${feature.icon} text-xl text-[#5D9C42]`}></i>
                            <span className="text-slate-700">{feature.name}</span>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}
