import { Button } from "../atoms/Button"

export const Header = () => {
    return (
        <>
        {/* header component, logo + buttons */}
        <header className="sticky top-0 z-50 bg-white/96 backdrop-blur-md flex items-center justify-between p-4 h-16 md:p-6 md:h-18 xl:p-8 xl:h-20 shadow-sm w-full">
            
            {/* Left section: logo */}
            <div className="flex ml-2.5 items-center gap-2 md:gap-4">
                <img
                className="w-10 h-10 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 cursor-pointer object-contain   " 
                src="./images/logo2-nx.png" 
                alt="Logo Nexo" />

                <span 
                className="text-[#5D9C42] hidden sm:block text-sm md:text-lg lg:text-xl font-bold "
                >Siéntete en tu hogar</span>

            </div>

            {/* right section: buttons */}
            <div className="flex px-1 text-xs sm:px-1 sm:py-0.5 md:px-3 md:py-1 md:text-sm  lg:px-5 lg:py-2 lg:text-base items-center gap-3 w-fit justify-end">
                <Button
                text={'Crear cuenta'}
                className={'flex items-center justify-center border rounded-md text-[#5D9C42] transition-all duration-300 hover:text-white hover:bg-[#5D9C42] cursor-pointer p-4 sm:h-6 sm:w-30 xl:h-8 xl:w-48 '}
                />
                <Button
                text={'Iniciar sesión'}
                className={'flex items-center justify-center border rounded-md  text-[#5D9C42] transition-all duration-300 hover:text-white hover:bg-[#5D9C42] cursor-pointer p-4 sm:h-6 sm:w-30 xl:h-8 xl:w-48 '}
                />
            </div>

        </header>
        </>
        
    )
}
