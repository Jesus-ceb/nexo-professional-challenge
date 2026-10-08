import { Header } from "../organisms/Header"
import { SearchSection } from "../organisms/SearchSection"
import { SmallCards } from "../molecules/SmallCards"
import { ProductGrid } from "../organisms/ProductGrid"
import { Footer } from "../organisms/Footer"
import { useEffect, useMemo, useState } from "react"
import { getCategories, getProducts } from "../../api/productService"
import { countByCategory, getRandomCategoryImage, pluralizeCategory } from "../../utils/categoryUtils"

import { useNavigate } from "react-router-dom"



export const HomePage = () => {

    const navigate = useNavigate()



    // product status
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [, setError] = useState(null)


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
            setError("No se pudieron cargar los productos");
        });



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
        <div>

            {/* Header with log + buttons */}
            <Header/>

            {/* Search Section */}
            <SearchSection/>


            {/* Main */}
            <div>
            {/* Cards section: Small Cards */}
            <div className='flex flex-col w-full h-auto py-4'>

                <span
                className='text-2xl md:text-3xl font-bold text-[#5D9C42]  ml-10 mx-auto w-fit'
                >
                Buscar por tipo de alojamiento
                </span>

                {/* div de smallcards */}
                <div className='grid grid-cols-1 m-1 mx-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
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
            <div className='bg-[#F0F7ED] pt-8 pb-10 px-4 md:px-10'>

                <h2 className='text-2xl md:text-3xl font-bold text-[#5D9C42]   w-fit '>
                Recomendaciones
                </h2>

                <ProductGrid products={products}/>

            </div>

            </div>

            {/* footer */}
            <Footer/>



        </div>
        </>
    )
}
