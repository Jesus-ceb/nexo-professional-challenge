import { Header } from "../organisms/Header"
import { Footer } from "../organisms/Footer"
import { SearchSection } from "../organisms/SearchSection"
import { ProductGrid } from "../organisms/ProductGrid"
import { CategoryFilterBar } from "../molecules/CategoryFilterBar"
import { useEffect, useMemo, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { RiArrowLeftCircleLine } from "react-icons/ri"
import { getCategories, getProducts } from "../../api/productService"
import { countByCategory, pluralizeCategory } from "../../utils/categoryUtils"



// Search results filtered by one or more categories; the filter lives in the URL (?categorias=1,3).
export const CategoryProductsPage = () => {

    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(null)


    useEffect(() => {
        Promise.all([getProducts(), getCategories()])
        .then(([productsData, categoriesData]) => {
            setProducts(productsData);
            setCategories(categoriesData);
        })
        .catch((err) => {
            console.error("ERROR:", err);
            setError("No se pudieron cargar los productos");
        });
    }, []);


    const categoriesParam = searchParams.get("categorias") ?? ""

    const selectedIds = useMemo(() =>
        categoriesParam.split(",").map(Number).filter((id) => id > 0),
    [categoriesParam])

    const setSelectedIds = (ids) => {
        setSearchParams(ids.length ? { categorias: ids.join(",") } : {})
    }

    const counts = useMemo(() => countByCategory(products), [products])

    const filteredProducts = useMemo(() =>
        selectedIds.length
            ? products.filter((product) => selectedIds.includes(product.category?.id))
            : products,
    [products, selectedIds])

    const title = selectedIds.length
        ? categories
            .filter((category) => selectedIds.includes(category.id))
            .map((category) => pluralizeCategory(category.category))
            .join(", ")
        : "Todos los alojamientos"



    return (
        <>
        {/* flex column so the footer always sits at the bottom of the screen */}
        <div className='flex flex-col min-h-screen'>

            {/* Header with log + buttons */}
            <Header/>

            {/* Search Section */}
            <SearchSection/>

            <div className='flex-1 bg-[#F0F7ED] pt-8 pb-10 px-4 md:px-10'>

                <h2 className='text-2xl md:text-3xl font-bold text-[#5D9C42] w-fit'>
                {title || "Alojamientos"}
                </h2>

                {/* Category filters */}
                <div className='mt-4'>
                    <CategoryFilterBar
                    categories={categories}
                    counts={counts}
                    selectedIds={selectedIds}
                    onChange={setSelectedIds}
                    />
                </div>

                {error ? (
                    <p className='mt-6 text-red-600'>{error}</p>
                ) : (
                    <>
                    <p className='mt-4 text-slate-700'>
                        Mostrando <span className='font-bold'>{filteredProducts.length}</span> de{' '}
                        <span className='font-bold'>{products.length}</span> alojamientos
                    </p>

                    {filteredProducts.length === 0 && products.length > 0 ? (
                        <div className='flex flex-col items-center gap-4 mt-10 text-center'>
                            <p className='text-slate-600'>No hay alojamientos para estos filtros</p>
                            <button
                            type="button"
                            onClick={() => setSelectedIds([])}
                            className="px-4 py-2 rounded-md bg-[#5D9C42] text-white cursor-pointer"
                            >
                                Limpiar filtros
                            </button>
                        </div>
                    ) : (
                        // key resets the pagination to page 1 when the filter changes
                        <ProductGrid key={categoriesParam} products={filteredProducts}/>
                    )}
                    </>
                )}

            </div>

            {/* footer */}
            <Footer/>

        </div>
        </>
    )
}
