import { useState } from "react"
import { Button } from "../../../atoms/Button"

export const CreateProductPage = () => {

     // usestate product name
    const [productName, setProductName] = useState('')
    
    // usestate direction
    const [direction, setDirection] = useState('')
    
    // usestate description
    const [description, setDescription] = useState('')
    
    // usestate add atributes
    const [attributes, setAttributes] = useState('')
    
    // usestate Categorie
    const [categorie, setCategorie] = useState('')
    
    // usestate city
    const [city, setCity] = useState('')


    
    // funcion para imprimir name en consola
    const handleclick = () => {
        const formData = {
            product_name: productName,
            categorie: categorie,
            direction: direction,
            city: city,
            description: description,
            add_attributes: attributes
        }
        
        console.log("Datos del formulario: ", formData)
    }
        


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
                            value={categorie}
                            onChange={(e) => setCategorie(e.target.value)}
                            className="w-full bg-[#E8E8E8] text-slate-900 p-2 rounded-lg appearance-none outline-none focus:ring-2 focus:ring-[#5D9C42]"
                            >
                                <option value="">Categorie</option>
                                <option value="hotel">Hotel</option>
                                <option value="aparta_estudio">Aparta Estudio</option>
                                <option value="hostal">Hostal</option>
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
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full bg-[#E8E8E8] text-slate-900 p-2 rounded-lg appearance-none outline-none focus:ring-2 focus:ring-[#5D9C42]"
                            >
                                <option value="">City</option>
                                <option value="cali">Cali</option>
                                <option value="bogota">Bogota</option>
                                <option value="barranquilla">Barranquilla</option>
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

                    {/* Atribute box */}
                    <div className="flex flex-col gap-1 col-span-2">
                        <label className="text-sm font-semibold text-slate-700">Agregar atributos</label>
                        <textarea
                        value={attributes}
                        onChange={(e) => setAttributes(e.target.value)}
                            rows="4"
                            className="bg-[#E8E8E8] text-slate-900 p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#5D9C42] resize-none"
                        />
                    </div>

                </form>

                {/* Send button  */}
                <Button
                onClick={handleclick}
                text={'Guardar'}
                className={'bg-green-600 text-white rounded-lg mt-2.5 p-2 px-6 transition-all duration-300 cursor-pointer border border-transparent hover:border-green-600 hover:bg-white hover:text-green-600 '}
                />
            </div>

        </div>
        
    )
}
