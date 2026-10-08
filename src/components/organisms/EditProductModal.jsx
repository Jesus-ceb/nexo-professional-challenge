import { useEffect, useState } from "react"

import { deleteProductImage, getCategories, getCities, getProductById, updateProduct, uploadProductImage } from "../../api/productService"
import { createFeature, getFeatures } from "../../api/featureService"
import { useAuth } from "../../context/AuthContext"
import { FeatureForm } from "../molecules/FeatureForm"
import { FeatureSelector } from "../molecules/FeatureSelector"

// Floating form over a translucent background to edit every field of a product.
// Nothing is sent until "Guardar"; "Cancelar" closes without changes.
export const EditProductModal = ({ product, onClose, onSaved }) => {

    const { token } = useAuth()

    // Form fields start with the current product data
    const [productName, setProductName] = useState(product.name ?? '')
    const [categoryId, setCategoryId] = useState(product.category?.id ?? '')
    const [direction, setDirection] = useState(product.address?.direction ?? '')
    const [cityId, setCityId] = useState(product.city?.id ?? '')
    const [description, setDescription] = useState(product.description ?? '')
    const [featureIds, setFeatureIds] = useState((product.features ?? []).map((f) => f.id))

    // Images: the ones already saved (minus the ones marked to remove) + new files to upload
    const [currentImages, setCurrentImages] = useState(product.images ?? [])
    const [removedImageIds, setRemovedImageIds] = useState([])
    const [newFiles, setNewFiles] = useState([])
    const [newPreviews, setNewPreviews] = useState([])

    const [categories, setCategories] = useState([])
    const [cities, setCities] = useState([])
    const [features, setFeatures] = useState([])

    const [error, setError] = useState(null)
    const [saving, setSaving] = useState(false)

    // "Añadir nueva" block for features inside this window
    const [showFeatureForm, setShowFeatureForm] = useState(false)

    // Saves the feature right away (it is global, not part of this product), adds it to the list
    // already checked for this product and hides the block. Errors are shown inside the block.
    const handleCreateFeature = async (featureData) => {
        const created = await createFeature(featureData, token)
        setFeatures((prev) => [...prev, created])
        setFeatureIds((prev) => [...prev, created.id])
        setShowFeatureForm(false)
    }

    //Call the API to retrieve real categories, cities and features.
    useEffect(() => {
        getCategories().then(setCategories).catch(() => setError('No se pudieron cargar las categorias'));
        getCities().then(setCities).catch(() => setError('No se cargaron las ciudades'));
        getFeatures().then(setFeatures).catch(() => setError('No se cargaron las características'));
    }, []);


    const handleFileChange = (e) => {
        const files = Array.from(e.target.files)
        setNewFiles((prev) => [...prev, ...files])
        setNewPreviews((prev) => [...prev, ...files.map((file) => URL.createObjectURL(file))])
        e.target.value = '';
    }

    const handleRemoveCurrentImage = (imageId) => {
        setCurrentImages((prev) => prev.filter((img) => img.id !== imageId))
        setRemovedImageIds((prev) => [...prev, imageId])
    }

    const handleRemoveNewImage = (indexToRemove) => {
        setNewFiles((prev) => prev.filter((_, i) => i !== indexToRemove))
        setNewPreviews((prev) => prev.filter((_, i) => i !== indexToRemove))
    }

    const handleSave = async (e) => {
        e.preventDefault();

        if (!productName.trim() || !categoryId || !cityId) {
            setError('Nombre, categoría y ciudad son obligatorios')
            return
        }

        setError(null)
        setSaving(true)
        try {
            await updateProduct(product.id, {
                name: productName.trim(),
                description,
                categoryId: Number(categoryId),
                cityId: Number(cityId),
                address: direction,
                featureIds,
            }, token)

            for (const imageId of removedImageIds) {
                await deleteProductImage(product.id, imageId, token)
            }
            for (const file of newFiles) {
                await uploadProductImage(product.id, file, token)
            }

            // Reload so the list gets the final state (data + images).
            onSaved(await getProductById(product.id))
        } catch (err) {
            setError(err.message)
        } finally {
            setSaving(false)
        }
    }


    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-6">

            <form onSubmit={handleSave} className="bg-white text-slate-700 w-full max-w-4xl rounded-lg p-6 flex flex-col gap-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl text-[#5D9C42]">Editar producto</h2>
                    <button
                    type="button"
                    onClick={onClose}
                    className="text-slate-600 hover:text-slate-900 text-2xl cursor-pointer"
                    aria-label="Cerrar"
                    >
                        ×
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-6">

                    {/* name box */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-slate-700">Nombre del producto</label>
                        <input
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="p-2 text-black bg-[#E8E8E8] outline-none focus:ring-2 focus:ring-[#5D9C42] rounded-lg"
                        />
                    </div>

                    {/* Categorie box */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-slate-700">Categoría</label>
                        <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="w-full bg-[#E8E8E8] text-slate-900 p-2 rounded-lg outline-none focus:ring-2 focus:ring-[#5D9C42]"
                        >
                            <option value="">Selecciona categoría</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.category}</option>
                            ))}
                        </select>
                    </div>

                    {/* Direction box */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-slate-700">Dirección</label>
                        <input
                        value={direction}
                        onChange={(e) => setDirection(e.target.value)}
                        className="p-2 text-black bg-[#E8E8E8] outline-none focus:ring-2 focus:ring-[#5D9C42] rounded-lg"
                        />
                    </div>

                    {/* City box */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-slate-700">Ciudad</label>
                        <select
                        value={cityId}
                        onChange={(e) => setCityId(e.target.value)}
                        className="w-full bg-[#E8E8E8] text-slate-900 p-2 rounded-lg outline-none focus:ring-2 focus:ring-[#5D9C42]"
                        >
                            <option value="">Selecciona ciudad</option>
                            {cities.map((cit) => (
                                <option key={cit.id} value={cit.id}>{cit.city}</option>
                            ))}
                        </select>
                    </div>

                    {/* Description box */}
                    <div className="flex flex-col gap-1 col-span-2">
                        <label className="text-sm font-semibold text-slate-700">Descripción</label>
                        <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                        className="bg-[#E8E8E8] text-slate-900 p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#5D9C42] resize-none"
                        />
                    </div>

                    {/* Features box */}
                    <div className="flex flex-col gap-2 col-span-2">
                        <label className="text-sm font-semibold text-slate-700">Características</label>

                        {showFeatureForm ? (
                            <FeatureForm
                            title="Nueva característica"
                            onSave={handleCreateFeature}
                            onCancel={() => setShowFeatureForm(false)}
                            />
                        ) : (
                            <button
                            type="button"
                            onClick={() => setShowFeatureForm(true)}
                            className="w-fit rounded-sm bg-[#5D9C42] p-1.5 px-6 text-white cursor-pointer hover:bg-white transition-all duration-300 hover:text-[#5D9C42] border border-[#5D9C42]"
                            >
                                Añadir nueva
                            </button>
                        )}

                        <FeatureSelector features={features} selectedIds={featureIds} onChange={setFeatureIds} />
                    </div>

                    {/* Images box */}
                    <div className="flex flex-col gap-1 col-span-2">
                        <label className="text-sm font-semibold text-slate-700">Imagenes</label>

                        <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        multiple
                        className="p-2 bg-[#E8E8E8] rounded-lg outline-none"
                        />

                        <div className="flex gap-2 mt-2 flex-wrap">
                            {currentImages.map((img) => (
                                <div key={img.id} className="relative">
                                    <img src={img.url} alt={productName} className="w-20 h-20 object-cover rounded-lg border" />
                                    <button
                                    type="button"
                                    onClick={() => handleRemoveCurrentImage(img.id)}
                                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center cursor-pointer"
                                    >
                                        x
                                    </button>
                                </div>
                            ))}

                            {newPreviews.map((src, i) => (
                                <div key={src} className="relative">
                                    <img src={src} alt={`nueva-${i}`} className="w-20 h-20 object-cover rounded-lg border-2 border-[#5D9C42]" />
                                    <button
                                    type="button"
                                    onClick={() => handleRemoveNewImage(i)}
                                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center cursor-pointer"
                                    >
                                        x
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                {/* Actions */}
                <div className="flex justify-end gap-3">
                    <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg p-2 px-6 border border-slate-400 text-slate-600 cursor-pointer hover:bg-slate-100 transition-all duration-300"
                    >
                        Cancelar
                    </button>
                    <button
                    type="submit"
                    disabled={saving}
                    className="bg-green-600 text-white rounded-lg p-2 px-6 cursor-pointer border border-transparent hover:border-green-600 hover:bg-white hover:text-green-600 transition-all duration-300 disabled:opacity-60"
                    >
                        {saving ? 'Guardando...' : 'Guardar'}
                    </button>
                </div>
            </form>
        </div>
    )
}
