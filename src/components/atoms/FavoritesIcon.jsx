import { MdOutlineLuggage } from "react-icons/md"
import { RiHeartFill } from "react-icons/ri"

// "Mis viajes" icon: a suitcase with a small heart in the bottom-right corner.
// Size comes from the parent's font size (text-2xl, text-4xl...).
export const FavoritesIcon = ({ className = '' }) => {
    return (
        <span aria-hidden="true" className={`relative inline-flex text-[#5D9C42] ${className}`}>
            <MdOutlineLuggage/>
            <RiHeartFill className="absolute -bottom-0.5 -right-1 text-[0.55em] rounded-full bg-white p-[1px]"/>
        </span>
    )
}
