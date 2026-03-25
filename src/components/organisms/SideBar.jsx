
import { BsArchive, BsCardChecklist, BsFillHouseFill, BsGearFill, BsGrid3X3GapFill, BsPeopleFill, BsReverseLayoutTextWindowReverse } from "react-icons/bs"
import { Link } from "react-router-dom"

const menuItems = [
    { name: 'Dashboard', icon: <BsReverseLayoutTextWindowReverse/>, path: '/admin/dashboard'},
    { name: 'Productos', icon: <BsArchive/>, path: '/admin/products'},
    { name: 'Categorias', icon: <BsGrid3X3GapFill/>, path: '/admin/categories'},
    { name: 'clientes', icon: <BsPeopleFill/>, path: '/admin/customers'},
    { name: 'Inventario', icon: <BsCardChecklist/>, path: '/admin/inventory'},
    { name: 'Configuracion', icon: <BsGearFill />, path: '/admin/setup'}
]

export const SideBar = () => {
    return (
        <aside className="w-72 min-h-screen bg-[#0c1e39]">

            <div className=" flex mt-3.5 justify-center">
                <div className="flex items-center p-2.5 justify-center text-white cursor-pointer text-2xl w-fit">
                    <Link className="flex items-center gap-2.5 mr-2.5 text-2xl" to={'/'}>
                    <BsFillHouseFill />
                    <span>NEXO</span> 
                    </Link>
                    
                </div>
            </div>
            
            {/* menu of services */}
            <ul className="">
                {menuItems.map((item, index)=> (
                    <li key={index}>
                        <Link to={item.path} className="flex gap-3 p-3 items-center transition-all duration-300 hover:bg-[#162f55] text-xl">{item.icon}
                        <span>{item.name}</span>
                        </Link>
                    </li>
                ))}
                
            </ul>

        </aside>
    )
}
