import { PRODUCT_POLICIES } from "../../data/productPolicies"

// "Políticas del alojamiento" block in the product detail: full width, one column on mobile and two from tablet,
// each policy with its icon, title and description.
export const ProductPolicies = ({ policies = PRODUCT_POLICIES }) => {

    return (
        <section className="w-full mt-22">
            <h2 className="text-xl font-bold text-slate-800 border-b-2 border-[#5D9C42] pb-2">
                Políticas del alojamiento
            </h2>

            <p className="mt-4 text-sm text-slate-500">
                Conoce las normas y cuidados antes de reservar.
            </p>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {policies.map((policy) => (
                    <li key={policy.id} className="flex gap-4 bg-white border border-gray-200 rounded-lg p-4 h-full">
                        <span className="shrink-0 size-11 rounded-full bg-[#F0F7ED] flex items-center justify-center">
                            <i className={`${policy.icon} text-2xl text-[#5D9C42]`} aria-hidden="true"></i>
                        </span>

                        <div>
                            <h3 className="font-semibold text-slate-800">{policy.title}</h3>
                            <p className="mt-1 text-sm text-slate-600 leading-relaxed">{policy.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}
