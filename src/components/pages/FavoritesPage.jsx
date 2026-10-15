import { Header } from "../organisms/Header"
import { Footer } from "../organisms/Footer"
import { ProductGrid } from "../organisms/ProductGrid"
import { Loader } from "../atoms/Loader"
import { FavoritesIcon } from "../atoms/FavoritesIcon"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { RiArrowLeftCircleLine } from "react-icons/ri"
import { getProducts } from "../../api/productService"
import { useFavorites } from "../../context/FavoritesContext"



// "Mis viajes": the products the logged-in user marked as favorite.
// The list is filtered from the global favorites on every render, so un-marking a heart here or anywhere
// else removes the product at once, without asking the backend again.
export const FavoritesPage = () => {

    const navigate = useNavigate()
    const { isFavorite } = useFavorites()

    // "Reintentar" bumps reloadKey; the data is stored with the attempt it belongs to,
    // so loading = "the stored attempt is not the current one"
    const [reloadKey, setReloadKey] = useState(0)
    const [data, setData] = useState({ key: null, products: [], error: null })
    const loading = data.key !== reloadKey


    useEffect(() => {
        let ignore = false

        getProducts()
        .then((products) => {
            if (!ignore) setData({ key: reloadKey, products, error: null })
        })
        .catch((err) => {
            console.error("ERROR:", err);
            if (!ignore) setData({ key: reloadKey, products: [], error: "No pudimos cargar tus favoritos en este momento." })
        })

        return () => { ignore = true }
    }, [reloadKey]);


    const favorites = data.products.filter((product) => isFavorite(product.id))
    const count = favorites.length



    return (
        <>
        {/* flex column so the footer always sits at the bottom of the screen */}
        <div className='flex flex-col min-h-screen'>

            {/* Header with log + buttons */}
            <Header/>

            <div className='relative flex-1 bg-[#F0F7ED] pt-8 pb-10 px-10 md:px-24 lg:px-40 xl:px-52'>

                {/* Title + back button (top right) */}
                <div className='flex items-start justify-between gap-4'>
                <div className='flex items-center gap-3'>
                    <FavoritesIcon className='text-4xl md:text-5xl'/>
                    <div>
                        <h1 className='text-2xl md:text-3xl font-bold text-[#5D9C42]'>
                            Mis viajes
                        </h1>
                        <p className='text-sm md:text-base text-slate-600'>
                            Tus alojamientos favoritos
                            {!loading && !data.error && count > 0 && (
                                <> · <span className='font-semibold'>{count}</span> {count === 1 ? 'alojamiento guardado' : 'alojamientos guardados'}</>
                            )}
                        </p>
                    </div>
                </div>

                    <button
                    type="button"
                    onClick={() => navigate(-1)}
                    aria-label="Volver"
                    title="Volver"
                    className="absolute top-3 right-4 md:right-8 lg:right-12 text-4xl md:text-5xl text-[#5D9C42] cursor-pointer transition-transform duration-200 hover:scale-110 hover:text-[#4c8236]"
                    >
                        <RiArrowLeftCircleLine/>
                    </button>
                </div>

                {loading ? (
                    <Loader text="Cargando tus favoritos..."/>
                ) : data.error ? (
                    <div className='mt-10 flex flex-col items-center gap-4 text-center'>
                        <p className='text-red-600'>{data.error} Inténtalo de nuevo más tarde.</p>
                        <button
                        type="button"
                        onClick={() => setReloadKey((key) => key + 1)}
                        className="px-6 py-2 rounded-md bg-[#5D9C42] text-white cursor-pointer hover:bg-[#4c8236]"
                        >
                            Reintentar
                        </button>
                    </div>
                ) : count === 0 ? (
                    <div className='mt-12 flex flex-col items-center gap-3 text-center text-slate-600'>
                        <FavoritesIcon className='text-6xl opacity-60'/>
                        <p className='text-lg font-semibold text-slate-700'>Todavía no tienes favoritos</p>
                        <p className='text-sm'>Toca el ❤ en cualquier alojamiento para guardarlo aquí.</p>
                        <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="mt-2 px-6 py-2 rounded-md bg-[#5D9C42] text-white cursor-pointer hover:bg-[#4c8236]"
                        >
                            Explorar alojamientos
                        </button>
                    </div>
                ) : (
                    // the heart on each card removes it from this list
                    <ProductGrid products={favorites}/>
                )}

            </div>

            {/* footer */}
            <Footer/>

        </div>
        </>
    )
}
