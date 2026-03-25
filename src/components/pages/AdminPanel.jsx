import { Outlet } from "react-router-dom"
import { Footer } from "../organisms/Footer"
import { SideBar } from "../organisms/SideBar"


export const AdminPanel = () => {
    return (
        <>
        <div className="flex min-h-screen w-full bg-[#081427] text-white">
            {/* side menu */}
            <SideBar/>

            {/* footer */}
            <div className="flex flex-col flex-1">

                <main className="flex-1">
                    <Outlet />

                </main>


                <Footer/>
            </div>
            
            
        </div>
        </>
        
    )
}
