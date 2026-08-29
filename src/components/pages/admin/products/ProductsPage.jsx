import { useNavigate } from "react-router-dom"
import { Button } from "../../../atoms/Button"
import { useEffect, useState } from "react"

import { getProducts } from '../../../api/productService';

export const ProductsPage = () => {
    
    const navigate = useNavigate()

    const [products, setProducts] = useState([])
    const [error, setError] = useState(null)

    // When assembling the component, it requests the actual products from the backend.
    useEffect(() => {
        getProducts().then(setProducts).catch(() => setError('Error al cargar los productos'));
    }, []);


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
                            <th className="p-4 border-b">Nombre</th>
                            <th className="p-4 border-b">Categoría</th>
                            <th className="p-4 border-b">Direccion</th>
                            <th className="p-4 border-b text-center">Ciudad</th>
                            <th className="p-4 border-b text-center">Descripcion</th>
                            <th className="p-4 border-b text-center">Atributos</th>
                        </tr>
                    </thead>

                    {/* Cuerpo de la tabla */}
                    <tbody className="text-slate-700">
                        {/* Aquí se hace .map() de tus productos de Nexo más adelante */}
                        {products.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                <td className="p-4 border-b">{item.name}</td>
                                <td className="p-4 border-b">{item.category?.category}</td>
                                <td className="p-4 border-b ">{item.address?.direction}</td>
                                <td className="p-4 border-b ">{item.city?.city}</td>
                                <td className="p-4 border-b ">{item.description}</td>
                                <td className="p-4 border-b ">{item.add_attributes}</td>
                                <td className="p-4 border-b text-center">
                                    <button className="text-blue-600 hover:underline">Editar</button>
                                </td>
                                <td className="p-4 border-b text-center">
                                    <button className="text-blue-600 hover:underline">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                        
                        
                    </tbody>
                </table>


            </div>


        </div>
        
        </>
        
    )
}
