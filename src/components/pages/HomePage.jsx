import { Header } from "../organisms/Header"
import { SearchSection } from "../organisms/SearchSection"
import { SmallCards } from "../molecules/SmallCards"
import { ProductGrid } from "../organisms/ProductGrid"
import { Footer } from "../organisms/Footer"
import { SearchResults } from "../organisms/SearchResults"
import { Loader } from "../atoms/Loader"
import { useEffect, useMemo, useState } from "react"
import { getCategories, getProducts, searchProducts } from "../../api/productService"
import { countByCategory, getRandomCategoryImage, pluralizeCategory } from "../../utils/categoryUtils"
import { fromISODate } from "../../utils/dateUtils"

import { useNavigate, useSearchParams } from "react-router-dom"



export const HomePage = () => {

    const navigate = useNavigate()

    // search status: the search comes from the URL (/?q=...&checkIn=...&checkOut=...)
    const [searchParams] = useSearchParams()
    const searchQuery = searchParams.get('q') ?? ''
    const searchCheckIn = searchParams.get('checkIn') ?? ''
    const searchCheckOut = searchParams.get('checkOut') ?? ''
    const isSearching = Boolean(searchQuery || searchCheckIn || searchCheckOut)
    const searchKey = searchParams.toString()

    // results are stored with the search they belong to, so loading = "the stored search is not the current one"
    const [search, setSearch] = useState({ key: null, results: [], error: null })
    const searchLoading = search.key !== searchKey

    useEffect(() => {
        if (!isSearching) return

        let ignore = false
        searchProducts({ q: searchQuery, checkIn: searchCheckIn, checkOut: searchCheckOut })
        .then((results) => {
            if (!ignore) setSearch({ key: searchKey, results, error: null })
        })
        .catch((err) => {
            if (!ignore) setSearch({ key: searchKey, results: [], error: err.message })
        })

        // a newer search started: ignore the answer of this one
        return () => { ignore = true }
    }, [isSearching, searchKey, searchQuery, searchCheckIn, searchCheckOut])



    // product status
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)


    // shuffle Products
    const shuffleProducts = (products) =>{
        return [...products].sort(() => Math.random() - 0.5);
    }


    // Get the products and categories when the HomePage opens
    useEffect(() => {



        Promise.all([getProducts(), getCategories()])
        .then(([productsData, categoriesData]) => {
            const randomProducts = shuffleProducts(productsData)
            setProducts(randomProducts);
            setCategories(categoriesData);
        })
        .catch((err) => {
            console.error("ERROR:", err);
            setError("No se pudieron cargar los productos. Intenta de nuevo más tarde.");
        })
        .finally(() => setLoading(false));



    }, []);


    // Count and random image per category, computed once per load so the image doesn't change on every render
    const categoryCards = useMemo(() => {
        const counts = countByCategory(products)
        return categories.map((category) => ({
            id: category.id,
            text: pluralizeCategory(category.category),
            count: counts[category.id] ?? 0,
            imageURL: getRandomCategoryImage(products, category.id),
        }))
    }, [products, categories])



    return (
        <>
        {/* min-h-screen + flex-col + flex-1 on main: keeps the Footer at the bottom even with no products */}
        <div className='flex flex-col min-h-screen'>

            {/* Header with log + buttons */}
            <Header/>

            {/* Search Section: remounted when the URL search changes so the fields follow it (e.g. "Limpiar búsqueda") */}
            <SearchSection key={`search-${searchKey}`}/>

            {/* Search results: above the categories and recommendations, which stay as they are */}
            {isSearching && (
                <SearchResults
                key={`results-${searchKey}`}
                query={searchQuery}
                checkIn={fromISODate(searchCheckIn)}
                checkOut={fromISODate(searchCheckOut)}
                results={search.results}
                loading={searchLoading}
                error={search.error}
                />
            )}


            {/* Main */}
            <div className='flex-1 flex flex-col'>
            {/* Cards section: Small Cards */}
            <div className='flex flex-col w-full h-auto py-4'>

                <span
                className='text-2xl md:text-3xl font-bold text-[#5D9C42] mx-10 md:mx-24 lg:mx-40 xl:mx-52 mb-5 w-fit'
                >
                Buscar por tipo de alojamiento
                </span>

                {/* div de smallcards */}
                {loading && <Loader text="Cargando categorías..."/>}

                <div className='grid grid-cols-1 m-1 mx-10 md:mx-24 lg:mx-40 xl:mx-52 mb-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
                {categoryCards.map((card) => (
                    <SmallCards
                    key={card.id}
                    text={card.text}
                    count={card.count}
                    imageURL={card.imageURL}
                    onClick={() => navigate(`/productos?categorias=${card.id}`)}
                    />
                ))}
                </div>


            </div>

            {/* Large Cards section 2 */}
            <div className='flex-1 bg-[#F0F7ED] pt-8 pb-10 px-10 md:px-24 lg:px-40 xl:px-52'>

                <h2 className='text-2xl md:text-3xl font-bold text-[#5D9C42]   w-fit '>
                Recomendaciones
                </h2>

                {loading ? (
                    <Loader text="Cargando alojamientos..."/>
                ) : error ? (
                    <p className='mt-6 text-center text-red-600'>{error}</p>
                ) : products.length === 0 ? (
                    <p className='mt-6 text-center text-slate-600'>No hay alojamientos para mostrar</p>
                ) : (
                    <ProductGrid products={products}/>
                )}

            </div>

            </div>

            {/* footer */}
            <Footer/>



        </div>
        </>
    )
}
