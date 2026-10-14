import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Loader } from "../atoms/Loader"
import { ProductGrid } from "./ProductGrid"
import { formatShort } from "../../utils/dateUtils"

// Results block shown under the search box; categories and recommendations stay below it.
export const SearchResults = ({ query, checkIn, checkOut, results, loading, error }) => {

    const navigate = useNavigate()
    const sectionRef = useRef(null)

    // Bring the results into view; HomePage remounts this block on every new search.
    useEffect(() => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, [])

    const count = results.length

    return (
        <section ref={sectionRef} id="resultados" aria-live="polite" className='scroll-mt-4 bg-white border-b border-gray-200 pt-8 pb-6 px-4 md:px-10'>

            <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-3'>
                <div>
                    <h2 className='text-2xl md:text-3xl font-bold text-[#5D9C42]'>
                        {query ? <>Resultados para «{query}»</> : 'Resultados de tu búsqueda'}
                    </h2>

                    <div className='flex flex-wrap items-center gap-2 mt-2 text-sm text-slate-600'>
                        {checkIn && checkOut && (
                            <span className='px-3 py-1 rounded-full bg-[#F0F7ED] text-[#5D9C42] font-medium'>
                                {formatShort(checkIn)} — {formatShort(checkOut)}
                            </span>
                        )}
                        {!loading && !error && (
                            <span>{count} {count === 1 ? 'alojamiento encontrado' : 'alojamientos encontrados'}</span>
                        )}
                    </div>
                </div>

                <button
                type="button"
                onClick={() => navigate('/')}
                className="self-start md:self-auto px-4 py-2 text-sm font-medium text-slate-600 underline cursor-pointer hover:text-[#5D9C42]"
                >
                    Limpiar búsqueda
                </button>
            </div>

            {loading ? (
                <Loader text="Buscando alojamientos..."/>
            ) : error ? (
                <p className='mt-6 text-center text-red-600'>{error}</p>
            ) : count === 0 ? (
                <div className='mt-6 text-center text-slate-600'>
                    <p className='font-medium'>No encontramos alojamientos para tu búsqueda.</p>
                    <p className='text-sm mt-1'>Prueba con otra ciudad, un tipo de alojamiento.</p>
                </div>
            ) : (
                <ProductGrid products={results}/>
            )}

        </section>
    )
}
