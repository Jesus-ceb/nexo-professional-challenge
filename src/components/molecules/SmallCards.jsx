// Clickable category card: shows a product image of the category and how many products it has.
export const SmallCards = ({ text, count = 0, imageURL, onClick }) => {
    return (
        <>
        <button
        type="button"
        onClick={onClick}
        className="bg-white rounded-md w-full h-70 shadow-md overflow-hidden text-left cursor-pointer transition duration-200 hover:shadow-xl hover:-translate-y-1"
        >


            <div className="w-full h-54">
                <img
                src={imageURL || "/images/room_hotel.jpg"}
                alt={text}
                className="w-full h-full object-cover"
                />
            </div>

            <div className="p-1 h-auto ml-2 my-1.5 flex flex-col">
                <span className="text-[#5D9C42] text-lg font-bold">
                {text}
                </span>

                <span className="text-[#5D9C42] text-sm mb-1  ">
                    {count} {count === 1 ? 'alojamiento' : 'alojamientos'}
                </span>
            </div>


        </button>
        </>
    )
}
