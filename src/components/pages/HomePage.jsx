import { Header } from "../organisms/Header"
import { SearchSection } from "../organisms/SearchSection"
import { SmallCards } from "../molecules/SmallCards"
import { LargeCard } from "../molecules/LargeCard"
import { Footer } from "../organisms/Footer"
import { useEffect, useState } from "react"
import { getProducts } from "../../api/productService"

import { useNavigate } from "react-router-dom"



export const HomePage = () => {

    const navigate = useNavigate()



    // product status
    const [products, setProducts] = useState([])
    const [error, setError] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)


    // total pagination 10 products
    const PRODUCTS_PER_PAGE = 10;


    // shuffle Products
    const shuffleProducts = (products) =>{
        return [...products].sort(() => Math.random() - 0.5);
    }


    // Get the products when the HomePage opens
    useEffect(() => {



        getProducts()
        .then((data) => {
            console.log("PRODUCTOS RECIBIDOS:", data);
            const randomProducts = shuffleProducts(data)
            setProducts(randomProducts);
        })
        .catch((err) => {
            console.error("ERROR:", err);
            setError("No se pudieron cargar los productos");
        });



    }, []);

    // pagination
    const totalPages = Math.ceil(
        products.length / PRODUCTS_PER_PAGE
    )

    const startIndex =
        (currentPage - 1) * PRODUCTS_PER_PAGE;

    const currentProducts = products.slice(
        startIndex,
        startIndex + PRODUCTS_PER_PAGE
    );



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

                {/* className='mt-2 ml-14 flex flex-wrap w-fit gap-4'   */}
                {/* div de smallcards */}
                <div className='grid grid-cols-1 m-1 mx-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                <SmallCards text={'Hoteles'}/>
                <SmallCards text={'Departamentos'}/>
                <SmallCards text={'Hostales'}/>
                <SmallCards text={'Desayunos'}/>
                </div>  
                
                
            </div>

            {/* Large Cards section 2 */}
            <div className='bg-[#F0F7ED] pt-8 pb-10 px-4 md:px-10'>

                <h2 className='text-2xl md:text-3xl font-bold text-[#5D9C42]   w-fit '>
                Recomendaciones
                </h2>

                {/* Large Cards */}

                <div className ='grid grid-cols-1 m-6 md:grid-cols-2 gap-4 md:gap-6 lg:gap-x-8'>

                    {currentProducts.map((product) => (
                        <div
                        onClick={() => navigate(`/products/${product.id}`)} 
                        key={product.id} 
                        className ='max-w-3xl h-full rounded-lg cursor-pointer transition duration-200 hover:shadow-lg '
                        >
                            {/* Displays a default image if the user does not upload photos. */}
                            <LargeCard
                            imageURL={product.images?.[0]?.url}
                            name={product.name}
                            category={product.category?.category}
                            location={product.city?.city}
                            features={product.features}
                            />

                        </div>
                    ))}
                </div>

                {/* Renders the inter-page navigation controls ("Previous" and "Next") along with the current page indicator. */}

                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-8">

                        <button
                            onClick={() =>
                                setCurrentPage((page) => page - 1)
                            }
                            disabled={currentPage === 1}
                            className="px-4 py-2 rounded-md bg-[#5D9C42] text-white disabled:opacity-40"
                        >
                            Anterior
                        </button>

                        <span className="text-[#5D9C42] font-bold">
                            Página {currentPage} de {totalPages}
                        </span>

                        <button
                            onClick={() =>
                                setCurrentPage((page) => page + 1)
                            }
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 rounded-md bg-[#5D9C42] text-white disabled:opacity-40"
                        >
                            Siguiente
                        </button>

                    </div>

                )}


            </div>

            </div>

            {/* footer */}
            <Footer/>
            


        </div>
        </>
    )
}
