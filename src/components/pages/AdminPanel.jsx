import { Outlet } from "react-router-dom"
import { Footer } from "../organisms/Footer"
import { SideBar } from "../organisms/SideBar"
import { useEffect, useState } from "react"


export const AdminPanel = () => {

    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkscreen = () => {
            setIsMobile(window.innerWidth  < 768)
        }
        
        checkscreen()

        window.addEventListener("resize", checkscreen)

        return () => {
            window.removeEventListener("resize", checkscreen)
        }

    }, [])
    

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


            {/* Managed, not available for mobile */}

            {isMobile && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    
                    <div className="bg-[#081427] rounded-lg p-8 mx-6 text-center shadow-xl">
                        <p className="text-xl font-semibold">
                            Admin no disponible para movil
                        </p>
                    </div>

                </div>
            )}

            
            
        </div>
        </>
        
    )
}
