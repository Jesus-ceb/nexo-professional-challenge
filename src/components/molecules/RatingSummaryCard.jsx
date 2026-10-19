import { RiChat3Line } from "react-icons/ri"
import { formatRating, ratingLabel } from "../../utils/ratingUtils"

// Rating box of the product detail: score + label + "Ver N comentarios" | comment icon + "Comentarios de reservas".
// The whole box is a button that opens the reviews window.
export const RatingSummaryCard = ({ rating, reviewCount, onClick }) => {

    return (
        <button
        type="button"
        onClick={onClick}
        aria-label={`Calificación ${formatRating(rating)}, ${ratingLabel(rating)}. Ver comentarios de reservas`}
        className="w-full md:w-auto md:max-w-xl flex flex-col sm:flex-row items-stretch gap-4 bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow p-4 text-left cursor-pointer"
        >
            {/* score */}
            <div className="flex items-center gap-3 shrink-0">
                <span className="bg-[#5D9C42] text-white text-2xl font-bold rounded-lg w-16 h-14 flex items-center justify-center">
                    {formatRating(rating)}
                </span>
                <div>
                    <p className="text-lg font-semibold text-slate-800">{ratingLabel(rating)}</p>
                    <p className="text-sm font-semibold text-[#5D9C42] underline-offset-2 hover:underline">
                        {reviewCount > 0
                            ? `Ver ${reviewCount} ${reviewCount === 1 ? 'comentario' : 'comentarios'}`
                            : 'Sé el primero en comentar'}
                    </p>
                </div>
            </div>

            {/* divider: horizontal on mobile, vertical from sm */}
            <span className="border-t sm:border-t-0 sm:border-l border-gray-200" aria-hidden="true"/>

            {/* comments */}
            <div className="flex items-center gap-3 min-w-0">
                <span className="shrink-0 size-11 rounded-full border-2 border-slate-700 text-slate-700 flex items-center justify-center text-xl">
                    <RiChat3Line/>
                </span>
                <div className="min-w-0">
                    <p className="font-semibold text-slate-800">Comentarios de reservas</p>
                    <p className="text-sm text-slate-600">Comparte tu experiencia</p>
                </div>
            </div>
        </button>
    )
}
