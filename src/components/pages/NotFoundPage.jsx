import { useNavigate } from "react-router-dom"
import { Header } from "../organisms/Header"
import { Footer } from "../organisms/Footer"

// Shown for any URL that doesn't match a route.
export const NotFoundPage = () => {

    const navigate = useNavigate()

    return (
        <>
        {/* flex column so the footer always sits at the bottom of the screen */}
        <div className='flex flex-col min-h-screen'>

            <Header/>

            <div className='flex-1 flex flex-col items-center justify-center gap-4 px-4 py-16 bg-[#F0F7ED] text-center'>
                <span className='text-7xl font-bold text-[#5D9C42]'>404</span>
                <h1 className='text-2xl font-bold text-slate-800'>Página no encontrada</h1>
                <p className='text-slate-600'>La página que buscas no existe o fue movida.</p>
                <button
                type="button"
                onClick={() => navigate('/')}
                className="px-6 py-2 rounded-md bg-[#5D9C42] text-white cursor-pointer hover:bg-white hover:text-[#5D9C42] border border-[#5D9C42] transition-all duration-300"
                >
                    Volver al inicio
                </button>
            </div>

            <Footer/>

        </div>
        </>
    )
}
