import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { LargeCard } from "../molecules/LargeCard"

// total pagination 10 products
const PRODUCTS_PER_PAGE = 10;

// Paginated grid of LargeCards; each card opens the product detail.
export const ProductGrid = ({ products }) => {

    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1)

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
        </>
    )
}
