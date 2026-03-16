
export const SmallCards = ({text}) => {
    return (
        <>
        <div className="bg-white rounded-md w-full h-70 shadow-md overflow-hidden">

            
            <div className="w-full h-54">
                <img 
                src="./images/room_hotel.jpg" 
                alt="habitacion" 
                className="w-full h-full object-cover"
                />
            </div>

            <div className="p-1 h-auto ml-2 my-1.5 flex flex-col">
                <span className="text-[#5D9C42] text-lg font-bold">
                {text}
                </span>

                <span className="text-[#5D9C42] text-sm ">
                    98.000 Hoteles
                </span>
            </div>
            

        </div>
        </>
    )
}
