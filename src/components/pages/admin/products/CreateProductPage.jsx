
export const CreateProductPage = () => {
    return (
        <div className="flex justify-center w-full ">

            <div className="text-[#5D9C42] bg-white m-3.5 p-2.5 w-full max-w-7xl rounded-sm ">
            
                <h1 className="text-2xl mb-4">Agregar Producto</h1>


                <form className="grid grid-cols-2 gap-x-8 gap-y-6 ">

                    <div className="flex flex-col gap-1 ">
                        <label className="text-sm font-semibold text-slate-700">Nombre del producto</label>
                        <input className="p-2 text-black bg-[#E8E8E8] outline-none focus:ring-2 focus:ring-[#5D9C42]  rounded-lg" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-slate-700">Categoría</label>
                        <div className="relative">
                            <select className="w-full bg-[#E8E8E8] p-2 rounded-lg appearance-none outline-none focus:ring-2 focus:ring-[#5D9C42]">
                                <option value=""></option>
                            </select>
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white">▼</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-slate-700" htmlFor="">Dirección</label>
                        <input className="p-2 text-black bg-[#E8E8E8] outline-none focus:ring-2 focus:ring-[#5D9C42] rounded-lg" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-slate-700">Ciudad</label>
                        <div className="relative">
                            <select className="w-full bg-[#E8E8E8] p-2 rounded-lg appearance-none outline-none focus:ring-2 focus:ring-[#5D9C42]">
                                <option value=""></option>
                            </select>
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white">▼</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 col-span-2">
                        <label className="text-sm font-semibold text-slate-700">Descripción</label>
                        <textarea 
                            rows="4"
                            className="bg-[#E8E8E8] p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#5D9C42] resize-none"
                        />
                    </div>

                    <div className="flex flex-col gap-1 col-span-2">
                        <label className="text-sm font-semibold text-slate-700">Agregar atributos</label>
                        <textarea 
                            rows="4"
                            className="bg-[#E8E8E8] p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#5D9C42] resize-none"
                        />
                    </div>

                </form>

                <button className="bg-green-600 p-2 px-6 mt-1.5 text-white rounded-lg">
                        Guardar
                </button>
            </div>

        </div>
        
    )
}
