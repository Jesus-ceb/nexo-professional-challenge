import { Button } from "../../../atoms/Button"

export const CreateProductPage = () => {
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
                        <input className="p-2 text-black bg-[#E8E8E8] outline-none focus:ring-2 focus:ring-[#5D9C42]  rounded-lg" />
                    </div>

                    {/* Categorie box */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-slate-700">Categoría</label>
                        <div className="relative">
                            <select className="w-full bg-[#E8E8E8] text-slate-900 p-2 rounded-lg appearance-none outline-none focus:ring-2 focus:ring-[#5D9C42]">
                                <option value="">Categorie</option>
                                <option value="">Hotel</option>
                                <option value="">Aparta Estudio</option>
                                <option value="">Hostal</option>
                            </select>
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white">▼</span>
                        </div>
                    </div>

                    {/* Direction box */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-slate-700" htmlFor="">Dirección</label>
                        <input className="p-2 text-black bg-[#E8E8E8] outline-none focus:ring-2 focus:ring-[#5D9C42] rounded-lg" />
                    </div>

                    {/* City box */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-slate-700">Ciudad</label>
                        <div className="relative text-slate-900">
                            <select className="w-full bg-[#E8E8E8] text-slate-900 p-2 rounded-lg appearance-none outline-none focus:ring-2 focus:ring-[#5D9C42]">
                                <option value="">City</option>
                                <option value="">Cali</option>
                                <option value="">Bogota</option>
                                <option value="">Barranquilla</option>
                            </select>
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white">▼</span>
                        </div>
                    </div>

                    {/* Description box */}
                    <div className="flex flex-col gap-1 col-span-2">
                        <label className="text-sm font-semibold text-slate-700">Descripción</label>
                        <textarea 
                            rows="4"
                            className="bg-[#E8E8E8] text-slate-900 p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#5D9C42] resize-none"
                        />
                    </div>

                    {/* Atribute box */}
                    <div className="flex flex-col gap-1 col-span-2">
                        <label className="text-sm font-semibold text-slate-700">Agregar atributos</label>
                        <textarea 
                            rows="4"
                            className="bg-[#E8E8E8] text-slate-900 p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#5D9C42] resize-none"
                        />
                    </div>

                </form>

                {/* Send button  */}
                <Button
                text={'Guardar'}
                className={'bg-green-600 text-white rounded-lg mt-2.5 p-2 px-6 transition-all duration-300 cursor-pointer border border-transparent hover:border-green-600 hover:bg-white hover:text-green-600 '}
                />
                {/* <button className="bg-green-600 p-2 px-6 mt-1.5 text-white rounded-lg">
                        Guardar
                </button> */}
            </div>

        </div>
        
    )
}
