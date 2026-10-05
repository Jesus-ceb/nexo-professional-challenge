import { useNavigate } from "react-router-dom"
import { Button } from "../atoms/Button"
import { useAuth } from "../../context/AuthContext"
import { getInitials } from "../../utils/getInitials"

export const Header = () => {

    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <>
        {/* header component, logo + buttons */}
        <header className="sticky top-0 z-50 bg-white/96 backdrop-blur-md flex items-center justify-between p-4 h-16 md:p-6 md:h-18 xl:p-8 xl:h-20 shadow-sm w-full">
            
            {/* Left section: logo */}
            <div
            onClick={() => {navigate("/"); window.scrollTo(0, 0);} } 
            className="flex ml-2.5 items-center gap-2 md:gap-4 cursor-pointer"
            >
                <img
                className="w-10 h-10 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 cursor-pointer object-contain   " 
                src="/images/logo2-nx.png" 
                alt="Logo Nexo" />

                <span 
                className="text-[#5D9C42] hidden sm:block text-sm md:text-lg lg:text-xl font-bold "
                >Siéntete en tu hogar</span>

            </div>

            {/* right section: user (logged in) or buttons (guest) */}
            <div className="flex px-1 text-xs sm:px-1 sm:py-0.5 md:px-3 md:py-1 md:text-sm  lg:px-5 lg:py-2 items-center gap-3 w-fit justify-end">
                {isAuthenticated ? (
                    <>
                    {/* Avatar with initials + name, both open the profile */}
                    <button
                    onClick={() => navigate('/mi-perfil')}
                    className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                    aria-label="Ver mi perfil"
                    >
                        <span className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#5D9C42] text-white flex items-center justify-center font-bold">
                            {getInitials(user.name, user.lastName)}
                        </span>
                        <span className="hidden sm:block font-semibold text-[#5D9C42]">
                            {user.name} {user.lastName}
                        </span>
                    </button>

                    {/* Only administrators see the shortcut to the admin panel */}
                    {user.role === 'ADMIN' && (
                        <button
                            onClick={() => navigate('/admin/dashboard')}
                            className="text-[#5D9C42] font-semibold cursor-pointer hover:underline transition-all"
                        >
                            Panel admin
                        </button>
                    )}

                    <button
                        onClick={handleLogout}
                        className="text-[#5D9C42] font-semibold cursor-pointer hover:underline transition-all"
                    >
                        Cerrar sesión
                    </button>

                    {/* <Button
                    onClick={handleLogout}
                    text={'Cerrar sesión'}
                    className={'flex items-center justify-center border rounded-md text-[#5D9C42] transition-all duration-300 hover:text-white hover:bg-[#5D9C42] cursor-pointer p-4 sm:h-6 sm:w-30 xl:h-8 xl:w-40 '}
                    /> */}
                    </>
                ) : (
                    <>
                    <Button
                    onClick={() => navigate('/register')}
                    text={'Crear cuenta'}
                    className={'flex items-center justify-center border rounded-md text-[#5D9C42] transition-all duration-300 hover:text-white hover:bg-[#5D9C42] cursor-pointer p-4 sm:h-6 sm:w-30 xl:h-8 xl:w-48 '}
                    />
                    <Button
                    onClick={() => navigate('/login')}
                    text={'Iniciar sesión'}
                    className={'flex items-center justify-center border rounded-md  text-[#5D9C42] transition-all duration-300 hover:text-white hover:bg-[#5D9C42] cursor-pointer p-4 sm:h-6 sm:w-30 xl:h-8 xl:w-48 '}
                    />
                    </>
                )}
            </div>

        </header>
        </>
        
    )
}
