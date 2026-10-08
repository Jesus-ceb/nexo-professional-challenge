import React, { useEffect, useState } from 'react'
import { Header } from '../organisms/Header'
import { Footer } from '../organisms/Footer'
import { useNavigate, useParams } from 'react-router-dom'
import { getProductById } from '../../api/productService'
import { RiArrowLeftCircleLine, RiMapPinLine } from 'react-icons/ri'
import { GalleryModal } from '../organisms/GalleryModal'
import { ProductFeatures } from '../molecules/ProductFeatures'
import { Loader } from '../atoms/Loader'

export const ProductDetailPage = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null)
    const [error, setError] = useState(null)

    // controla si el modal de galería está visible
    const [showGallery, setShowGallery] = useState(false)

    useEffect(() => {

        getProductById(id).then((data) => {
            setProduct(data)
        }).catch((err) => {
            console.error(err)
            setError("No se puede cargar el producto.")
        })
    
    
    }, [id]);

    // Loading and error keep the page layout (header, back button, footer) instead of a bare text.
    if (error || !product) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />

                <div className="bg-slate-700 w-full h-14 flex items-center justify-end px-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-white text-5xl cursor-pointer hover:text-[#5D9C42]"
                    >
                        <RiArrowLeftCircleLine />
                    </button>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center gap-4 px-4 py-16 text-center">
                    {error ? (
                        <>
                            <p className="text-red-600">{error}</p>
                            <button
                                onClick={() => navigate('/')}
                                className="px-6 py-2 rounded-md bg-[#5D9C42] text-white cursor-pointer"
                            >
                                Volver al inicio
                            </button>
                        </>
                    ) : (
                        <Loader text="Cargando producto..." />
                    )}
                </div>

                <Footer />
            </div>
        );
    }


    return (

        <>

        {/* Header with log + buttons */}
        <Header />

        {/* body */}

        <div className="min-h-screen bg-white">

                {/* barra oscura superior con botón de volver */}
                <div className="bg-slate-700 w-full h-14 flex items-center justify-end px-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-white text-5xl cursor-pointer hover:text-[#5D9C42]"
                    >
                        <RiArrowLeftCircleLine />
                    </button>
                </div>

                {/* barra clara con ubicación (izquierda) y categoría (derecha) */}
                <div className="bg-gray-100 w-full py-3 px-6 flex items-center justify-between ">
                    <div className="flex items-center gap-2 text-slate-700 cursor-pointer">
                        <span className='text-2xl'>
                            <RiMapPinLine />
                        </span>
                        <span>{product.address?.direction}, {product.city?.city}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-slate-700 font-semibold">{product.category?.category}</span>
                        {/* Badge circular, usando la cantidad de imágenes como dato real */}
                        <span className="bg-slate-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">
                            {product.images?.length ?? 0}
                        </span>
                    </div>
                </div>

                {/* Image: grilla de imágenes del producto */}
                    
                    <div className="px-6 mt-4">
                    {product.images?.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2 h-96 overflow-hidden ">

                            {/* Columna izquierda: una sola imagen grande, ocupa el 50% del ancho */}
                            <div className="h-96 overflow-hidden rounded-md">
                                <img
                                    src={product.images[0].url}
                                    alt={product.name}
                                    className="w-full h-full object-cover rounded-lg"
                                />

                            </div>

                            {/* Columna derecha: grilla interna 2x2, misma altura total que la imagen grande */}
                            <div className="grid grid-cols-2 grid-rows-2 gap-2 h-96 overflow-hidden">
                                {product.images.slice(1, 5).map((img, index) => (
                                    <div key={img.id} className="h-full overflow-hidden rounded-lg relative">
                                        <img
                                            src={img.url}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />

                                        {/* button watch galeri */}
                                        {index === 1 && (
                                            <button
                                                type="button"
                                                onClick={() => setShowGallery(true)}
                                                className="absolute top-3 right-3 bg-white text-slate-800 text-sm font-semibold px-4 py-2 rounded-full  shadow-md hover:bg-slate-100 transition-colors cursor-pointer hover:shadow-lg"
                                            >
                                                Ver galería
                                            </button>
                                        )}


                                    </div>
                                ))}

                                {/* Si hay menos de 4 imágenes adicionales, se rellenan los espacios con placeholders */}
                                {Array.from({ length: Math.max(0, 4 - (product.images.length - 1)) }).map((_, i) => (
                                    <div key={`placeholder-${i}`} className="w-full h-full rounded-lg bg-slate-200" />
                                ))}
                            </div>

                        </div>
                    ) : (
                        // Si el producto no tiene ninguna imagen, se muestra el bloque completo como placeholder
                        <div className="grid grid-cols-2 gap-2 h-96">
                            <div className="h-full rounded-lg bg-slate-200" />
                            <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="w-full h-full rounded-lg bg-slate-200" />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Contenido principal */}
                <div className="px-6 pt-6 pb-26">

                    <h1 className="text-3xl font-bold text-slate-800">
                        {product.name}
                    </h1>

                    {/* Descripción */}
                    <h2 className="text-xl font-bold text-slate-800 mt-6 border-b pb-2 ">
                        Conoce un poco más
                    </h2>
                    <p className="mt-8 mb-20 text-slate-600 leading-relaxed whitespace-pre-line text-justify ">
                        {product.description}
                    </p>

                    {/* Características */}
                    <ProductFeatures features={product.features} />
                </div>
            </div>

            {/* el modal solo se renderiza si showGallery es true */}
            {showGallery && (
                <GalleryModal 
                images={product.images}
                productName={product.name}
                onClose={() => setShowGallery(false)}
                />
            )}

        {/* footer */}
        <Footer />

        </>
        
    )
}
