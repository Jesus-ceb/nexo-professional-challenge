
import { BsArchive, BsCardChecklist, BsFillHouseFill, BsGearFill, BsGrid3X3GapFill, BsPeopleFill, BsReverseLayoutTextWindowReverse } from "react-icons/bs"

const menuItems = [
    { name: 'Dashboard', icon: <BsReverseLayoutTextWindowReverse/>, path: '/admin'},
    { name: 'Productos', icon: <BsArchive/>, path: ''},
    { name: 'Categorias', icon: <BsGrid3X3GapFill/>, path: ''},
    { name: 'clientes', icon: <BsPeopleFill/>, path: ''},
    { name: 'Inventario', icon: <BsCardChecklist/>, path: ''},
    { name: 'Configuracion', icon: <BsGearFill />, path: ''}
]

export const SideBar = () => {
    return (
        <aside className="w-72 min-h-screen bg-[#0c1e39]">

            <div className=" flex mt-3.5 justify-center">
                <div className="flex items-center p-2.5 justify-center text-white cursor-pointer text-2xl w-fit">
                    <BsFillHouseFill className="mr-2.5 text-2xl"/> 
                    <span>NEXO</span>
                </div>
            </div>
            
            {/* menu of services */}
            <ul className="">
                {menuItems.map((item, index)=> (
                    <li key={index}><a className="flex gap-3 p-3 items-center hover:bg-[#162f55] transition-all text-xl" href="">{item.icon}<span>{item.name}</span></a></li>
                ))}
                
            </ul>

        </aside>
    )
}
