import { useNavigate } from "react-router-dom"
import { Button } from "../../../atoms/Button"
import { Loader } from "../../../atoms/Loader"
import { useEffect, useState } from "react"

import { deleteProduct, getProducts } from "../../../../api/productService"
import { useAuth } from "../../../../context/AuthContext"
import { EditProductModal } from "../../../organisms/EditProductModal"



export const ProductsPage = () => {

    const navigate = useNavigate()
    const { token } = useAuth()

    const [products, setProducts] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    // product being edited in the floating form (null = closed)
    const [editingProduct, setEditingProduct] = useState(null)

    // replaces the edited product in the list and closes the form
    const handleSaved = (updated) => {
        setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        setEditingProduct(null);
    }

    // When assembling the component, it requests the actual products from the backend.
    useEffect(() => {
        getProducts()
        .then(setProducts)
        .catch(() => setError('Error al cargar los productos'))
        .finally(() => setLoading(false));
    }, []);


    // function to remove product from productsPage
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('¿Estas seguro de eliminar este producto?')
        if(!confirmDelete) return;

        try{
            await deleteProduct(id, token);
            setProducts((prev) => prev.filter((p) => p.id !== id));
        }catch (err){
            setError(err.message)

        }
    }


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

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <table className="w-full text-left border-collapse">
        
                    {/* Cabecera de la tabla */}
                    <thead className="bg-slate-100 text-blue-900 uppercase text-sm">
                        <tr>
                            <th className="p-4 border-b">Nombre</th>
                            <th className="p-4 border-b">Categoría</th>
                            <th className="p-4 border-b">Direccion</th>
                            <th className="p-4 border-b text-center">Ciudad</th>
                            <th className="p-4 border-b text-center">Descripcion</th>
                            
                        </tr>
                    </thead>

                    {/* Cuerpo de la tabla */}
                    <tbody className="text-slate-700">
                        {loading && (
                            <tr>
                                <td colSpan={7}><Loader text="Cargando productos..."/></td>
                            </tr>
                        )}
                        {!loading && !error && products.length === 0 && (
                            <tr>
                                <td colSpan={7} className="p-4 border-b text-center">No hay productos registrados</td>
                            </tr>
                        )}
                        {products.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                <td className="p-4 border-b">{item.name}</td>
                                <td className="p-4 border-b">{item.category?.category}</td>
                                <td className="p-4 border-b ">{item.address?.direction}</td>
                                <td className="p-4 border-b ">{item.city?.city}</td>
                                <td className="p-4 border-b ">{item.description}</td>
                                <td className="p-4 border-b text-center">
                                    <button
                                    onClick={() => setEditingProduct(item)}
                                    className="text-blue-600 hover:underline cursor-pointer"
                                    >
                                        Editar
                                    </button>
                                </td>
                                <td className="p-4 border-b text-center">
                                    <button
                                    onClick={() => handleDelete(item.id)}
                                    className="text-blue-600 hover:underline cursor-pointer"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        
                        
                    </tbody>
                </table>


            </div>


            {editingProduct && (
                <EditProductModal
                product={editingProduct}
                onClose={() => setEditingProduct(null)}
                onSaved={handleSaved}
                />
            )}

        </div>

        </>
        
    )
}
