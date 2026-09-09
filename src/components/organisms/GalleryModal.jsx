import React from 'react'

export const GalleryModal = ({images, productName, onClose}) => {
    return (
        <>
        <div className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center overflow-y-auto p-6">
            <div className="bg-white w-full max-w-6xl rounded-lg p-6">

                {/* Header: nombre del producto + botón cerrar */}
                <div className="flex items-center justify-between ">
                    <h2 className="text-xl font-bold text-slate-800">{productName}</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-slate-600 hover:text-slate-900 text-2xl cursor-pointer"
                    >
                        ×
                    </button>
                </div>

                {/* Tab "Todos" (solo visual, sin funcionalidad de filtro) */}
                <div className="mt-4 border-b">
                    <span className="text-[#5D9C42] font-semibold border-b-2 border-[#5D9C42] pb-2 inline-block">
                        Todos
                    </span>
                </div>

                {/* Grilla de todas las imágenes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-6">
                    {images.map((img) => (
                        <div key={img.id} className="h-64 overflow-hidden rounded-lg">
                            <img
                                src={img.url}
                                alt={productName}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>

            </div>
        </div>
        </>
    )
}
