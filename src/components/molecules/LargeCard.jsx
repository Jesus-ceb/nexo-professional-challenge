

export const LargeCard = ({category, name, imageURL, location, features = []}) => {
    return (
        <>
        <div className="w-full h-full flex flex-col lg:flex-row bg-white rounded-md overflow-hidden">

            {/* image */}
            {/* fixed height: the photo's own proportions must not stretch the card */}
            <div className="w-full lg:w-2/5 h-52 lg:h-56 shrink-0">

                {/* si el usuario no sube imagen, muestra la siguiente por defecto */}
                <img
                src={imageURL || "/images/sin_imagen.jpg"}
                alt={name}
                className="w-full h-full object-cover"
                />
            </div>

            {/* RIGHT CONTENT */}
            <div className="flex flex-col flex-1 min-w-0 p-4 gap-2">

                {/* primer bloque: categoría + nombre (izquierda) y calificación (derecha) */}
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <span className="block text-xs uppercase text-[#A0CF8C]">
                            {category}
                        </span>
                        <h3 className="text-xl font-bold text-[#5D9C42] truncate">
                            {name}
                        </h3>
                    </div>

                    <div className="flex flex-col items-end shrink-0">
                        <span className="bg-[#5D9C42] w-10 h-10 rounded-xl text-white flex items-center justify-center">
                            8
                        </span>
                        <span className="text-[#5D9C42] text-sm font-bold whitespace-nowrap">
                            Muy bueno
                        </span>
                    </div>
                </div>

                {/* segundo bloque: ubicación */}
                <div className="flex items-center gap-1 text-sm text-[#5D9C42] min-w-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 shrink-0">
                        <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                    </svg>
                    <span className="truncate">
                        {location || 'Ubicación'} <span className="font-semibold">MOSTRAR EN EL MAPA</span>
                    </span>
                </div>

                {/* tercer bloque: solo los iconos de las características del producto (el nombre queda como tooltip) */}
                <div className="flex flex-wrap gap-2">
                    {features.map((feature) => (
                        <i
                        key={feature.id}
                        className={`${feature.icon} text-xl text-[#5D9C42]`}
                        title={feature.name}
                        aria-label={feature.name}
                        ></i>
                    ))}
                </div>

            </div>

        </div>
        </>
    )
}
