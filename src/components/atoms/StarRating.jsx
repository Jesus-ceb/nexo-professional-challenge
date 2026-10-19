import { useState } from "react"
import { RiStarFill, RiStarHalfFill, RiStarLine } from "react-icons/ri"
import { STAR_LABELS } from "../../utils/ratingUtils"

const STARS = [1, 2, 3, 4, 5]

// 1-5 stars. Without onChange it only shows a value (half stars included), in amber or the given color;
// with onChange it is an input: hover previews, click or arrow keys choose.
export const StarRating = ({ value = 0, onChange, className = '', color = 'text-amber-400' }) => {

    const [hover, setHover] = useState(null)

    if (!onChange) {
        return (
            <span role="img" aria-label={`${value} de 5 estrellas`} className={`inline-flex ${color} ${className}`}>
                {STARS.map((star) =>
                    value >= star ? <RiStarFill key={star}/>
                    : value >= star - 0.5 ? <RiStarHalfFill key={star}/>
                    : <RiStarLine key={star}/>
                )}
            </span>
        )
    }

    const shown = hover ?? value

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
            e.preventDefault()
            onChange(Math.min(5, value + 1))
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
            e.preventDefault()
            onChange(Math.max(1, value - 1))
        }
    }

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <div role="radiogroup" aria-label="Calificación" onMouseLeave={() => setHover(null)} onKeyDown={handleKeyDown} className="flex">
                {STARS.map((star) => (
                    <button
                    key={star}
                    type="button"
                    role="radio"
                    aria-checked={value === star}
                    aria-label={`${star} ${star === 1 ? 'estrella' : 'estrellas'}: ${STAR_LABELS[star - 1]}`}
                    tabIndex={value === star || (value === 0 && star === 1) ? 0 : -1}
                    onClick={() => onChange(star)}
                    onMouseEnter={() => setHover(star)}
                    className="p-0.5 text-3xl text-amber-400 cursor-pointer transition-transform hover:scale-110"
                    >
                        {shown >= star ? <RiStarFill/> : <RiStarLine/>}
                    </button>
                ))}
            </div>
            {shown > 0 && <span className="text-sm font-medium text-slate-600">{STAR_LABELS[shown - 1]}</span>}
        </div>
    )
}
