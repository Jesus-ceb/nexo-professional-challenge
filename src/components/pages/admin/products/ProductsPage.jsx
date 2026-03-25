import { Button } from "../../../atoms/Button"

export const ProductsPage = () => {
    return (
        <>
        <div className=" m-3.5 text-blue-500">
            <Button 
            text={'Agregar Producto'}
            className='rounded-sm bg-[#5D9C42] p-1.5 px-6 text-white cursor-pointer hover:bg-white transition-all duration-300 hover:text-[#5D9C42]'
            />
        </div>
        
        </>
        
    )
}
