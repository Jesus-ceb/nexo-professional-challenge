import { useNavigate } from "react-router-dom"
import { Button } from "../../../atoms/Button"

export const ProductsPage = () => {
    const navigate = useNavigate()
    return (
        <>
        <div className="m-3.5 text-blue-500">
            <Button 
            onClick={() => navigate('/admin/products/new')}
            text={'Agregar Producto'}
            className='rounded-sm bg-[#5D9C42] p-1.5 px-6 text-white cursor-pointer hover:bg-white transition-all duration-300 hover:text-[#5D9C42]'
            />

            <div className="mt-4 w-fit p-1.5 bg-white text-blue-900 rounded-sm">
                <p>Listado de productos</p>

                <table className="w-full text-left border-collapse">
        
                    {/* Cabecera de la tabla */}
                    <thead className="bg-slate-100 text-blue-900 uppercase text-sm">
                        <tr>
                            <th className="p-4 border-b">Hotel</th>
                            <th className="p-4 border-b">Categoría</th>
                            <th className="p-4 border-b">Precio</th>
                            <th className="p-4 border-b text-center">Acciones</th>
                        </tr>
                    </thead>

                    {/* Cuerpo de la tabla */}
                    <tbody className="text-slate-700">
                        {/* Aquí harás el .map() de tus productos de Nexo más adelante */}
                        <tr className="hover:bg-slate-50 transition-colors">
                            <td className="p-4 border-b">Hotel de camerum</td>
                            <td className="p-4 border-b">Electrónica</td>
                            <td className="p-4 border-b font-bold">$450.000</td>
                            <td className="p-4 border-b text-center">
                                <button className="text-blue-600 hover:underline">Editar</button>
                            </td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                            <td className="p-4 border-b">Hotel Imperial</td>
                            <td className="p-4 border-b">Electrónica</td>
                            <td className="p-4 border-b font-bold">$450.000</td>
                            <td className="p-4 border-b text-center">
                                <button className="text-blue-600 hover:underline">Editar</button>
                            </td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                            <td className="p-4 border-b">Hotel nubes verdes</td>
                            <td className="p-4 border-b">Electrónica</td>
                            <td className="p-4 border-b font-bold">$450.000</td>
                            <td className="p-4 border-b text-center">
                                <button className="text-blue-600 hover:underline">Editar</button>
                            </td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                            <td className="p-4 border-b">Hotel Royal</td>
                            <td className="p-4 border-b">Electrónica</td>
                            <td className="p-4 border-b font-bold">$450.000</td>
                            <td className="p-4 border-b text-center">
                                <button className="text-blue-600 hover:underline">Editar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>


            </div>


        </div>
        
        </>
        
    )
}
