import { useEffect, useState } from "react"
import { Button } from "../../../atoms/Button"

import { createProduct, getCategories, getCities, uploadProductImage } from "../../../../api/productService"

// import { getCategories, getCities, createProduct } from '../../../api/productService';

export const CreateProductPage = () => {

     // usestate product name
    const [productName, setProductName] = useState('')
    
    // usestate direction
    const [direction, setDirection] = useState('')
    
    // usestate description
    const [description, setDescription] = useState('')
    
    // usestate add atributes(Images)
    const [imageFiles, setImageFiles] = useState([])
    // to preview before uploading
    const [previews, setPreviews] = useState([])

    // usestate Categorie
    const [categoryId, setCategoryId] = useState('')
    
    // usestate city
    const [cityId, setCityId] = useState('')

    // ------- actual list of categories -----
    const [categories, setCategories] = useState([])
    // ------- actual list of cities -----
    const [cities, setCities] = useState([])
    // ------- show errors to the user ------
    const [error, setError] = useState(null)

    // visual feedback while climbing
    const [uploading, setUploading] = useState(false)


    // function to clear all form fields
    const resetForm = () => {
        setProductName('');
        setDirection('');
        setDescription('');
        setCategoryId('');
        setCityId('');
        setImageFiles([]);
        setPreviews([]);
    } 


    //Call the API to retrieve real categories and cities.
    useEffect(() => {
        getCategories().then(setCategories).catch(()=> setError('No se pudieron cargar las categorias'));
        getCities().then(setCities).catch(() => setError('No se cargaron las ciudades'));

    }, []);


    // handles the selection of image files
    const handleFileChange = (e) =>{

        const newFiles = Array.from(e.target.files)

        setImageFiles((prevFiles) => [...prevFiles, ...newFiles])
        setPreviews((prevPreviews) =>[
            ...prevPreviews,
            ...newFiles.map((file) => URL.createObjectURL(file)),
        ])

        e.target.value = '';
    }


    
    // assemble the object in the format that the API expects.
    //calls createProduct() (actual POST), and handles the error if it fails.
    const handleclick = async (e) => {
        e.preventDefault();


        try{

        const productData = {
            name: productName,
            description: description,
            category: { id: Number(categoryId)},
            city: { id: Number(cityId)},
            address: { direction:direction},
            images: []
        }

        const createdProduct = await createProduct(productData)

        // This is where imageFiles connects with ProductImage
        // Each file is uploaded individually to the newly created product's image endpoint.
        for (const file of imageFiles){
            await uploadProductImage(createdProduct.id, file)
        }

        alert('Producto creado con exito');
        resetForm();


        } catch (err){
            console.error(err);
            setError(err.message);
        } finally{
            setUploading(false)
        }
    };


    // Remove image by id
    const handleRemoveImage = (indexToRemove) => {

        setImageFiles((prev) => prev.filter((_, i) => i !== indexToRemove));
        setPreviews((prev) => prev.filter((_, i) => i !== indexToRemove));
    };
    


    return (
        <div className="flex justify-center w-full ">


            <div className="text-[#5D9C42] bg-white m-3.5 p-2.5 w-full max-w-7xl rounded-sm ">
            
                {/* Title */}
                <h1 className="text-2xl mb-4">Agregar Producto</h1>

                {/* Form  */}
                <form className="grid grid-cols-2 gap-x-8 gap-y-6 ">

                    {/* name box */}
                    <div className="flex flex-col gap-1 ">
                        <label className="text-sm font-semibold text-slate-700">Nombre del producto</label>
                        <input
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="p-2 text-black bg-[#E8E8E8] outline-none focus:ring-2 focus:ring-[#5D9C42]  rounded-lg" 
                        
                        />
                    </div>

                    {/* Categorie box */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-slate-700">Categoría</label>
                        <div className="relative">
                            <select 
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            className="w-full bg-[#E8E8E8] text-slate-900 p-2 rounded-lg appearance-none outline-none focus:ring-2 focus:ring-[#5D9C42]"
                            >
                                {/* They are generated dynamically by traversing the "categories" array that comes from the API */}
                                <option value="">Selecciona categoría</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.category}</option>

                                ))}

                            </select>
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white">▼</span>
                        </div>
                    </div>

                    {/* Direction box */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-slate-700" htmlFor="">Dirección</label>
                        <input 
                        value={direction}
                        onChange={(e) => setDirection(e.target.value)}
                        className="p-2 text-black bg-[#E8E8E8] outline-none focus:ring-2 focus:ring-[#5D9C42] rounded-lg" 
                        />
                    </div>

                    {/* City box */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-slate-700">Ciudad</label>
                        <div className="relative text-slate-900">
                            <select 
                            value={cityId}
                            onChange={(e) => setCityId(e.target.value)}
                            className="w-full bg-[#E8E8E8] text-slate-900 p-2 rounded-lg appearance-none outline-none focus:ring-2 focus:ring-[#5D9C42]"
                            >
                                <option value="">Selecciona ciudad</option>
                                {/* cities dynamically generated from the "cities" array of the API */}
                                {cities.map((cit) => (
                                    <option key={cit.id} value={cit.id}>{cit.city}</option>
                                ))}
                                
                            </select>
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white">▼</span>
                        </div>
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

                        {previews.length > 0 && (
                            <div className="flex gap-2 mt-2 flex-wrap">
                                {previews.map((src, i) => (

                                    <div key={i} className="w-aut relative ">
                                        <img 
                                        src={src}
                                        alt={`preview-${i}`} 
                                        className="w-20 h-20 object-cover rounded-lg border" 
                                        />

                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(i)}
                                            className= "absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center cursor-pointer"
                                        >
                                            x
                                        </button>

                                    </div>
                                    

                                ))}
                            </div>
                        )}
                    </div>

                </form>

                {/* Send button  */}
                <Button
                onClick={handleclick}
                text={'Guardar'}
                disabled={uploading}
                className={'bg-green-600 text-white rounded-lg mt-2.5 p-2 px-6 transition-all duration-300 cursor-pointer border border-transparent hover:border-green-600 hover:bg-white hover:text-green-600 '}
                />
            </div>

        </div>
        
    )
}
