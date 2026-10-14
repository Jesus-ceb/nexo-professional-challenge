import { RiHeartFill, RiHeartLine } from "react-icons/ri"

const VARIANTS = {
    // over the card photo: white heart with the site's green outline and a soft shadow
    overlay: 'drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]',
    // on a white background (product detail)
    plain: 'text-slate-700 hover:text-[#5D9C42]',
}

// Heart that marks / unmarks a product as favorite. Stops the click so the card doesn't open the detail.
export const FavoriteButton = ({ isFavorite, onToggle, variant = 'overlay', className = '' }) => {

    const label = isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'

    return (
        <button
        type="button"
        aria-pressed={isFavorite}
        aria-label={label}
        title={label}
        onClick={(e) => {
            e.stopPropagation()
            onToggle()
        }}
        className={`size-10 flex items-center justify-center text-2xl rounded-full cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-90 ${VARIANTS[variant]} ${className}`}
        >
            {variant === 'overlay' ? (
                // filled heart (white, or red when marked) with the outline drawn on top
                <span className="relative inline-flex">
                    <RiHeartFill className={isFavorite ? 'text-red-500' : 'text-white'}/>
                    <RiHeartLine className={`absolute inset-0 ${isFavorite ? 'text-red-500' : 'text-[#5D9C42]'}`}/>
                </span>
            ) : isFavorite ? (
                <RiHeartFill className="text-red-500"/>
            ) : (
                <RiHeartLine/>
            )}
        </button>
    )
}
