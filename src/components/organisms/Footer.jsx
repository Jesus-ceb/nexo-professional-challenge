
export const Footer = () => {
    return (
        <>
        <footer>
            <div className='bg-[#5D9C42] p-2 flex'>
                
                <div className="flex h-12 items-center w-full m-1.5 ">
                    {/* text */}
                    <p
                    className="text-white text-xs w-fit"
                    >© 2026 Nexo - todos los derechos reservados</p>

                    {/* Social Networks */}
                    <div className="flex w-auto ml-auto gap-4 mr-12 text-4xl text-white">
                        <a href="https://www.facebook.com/?locale=es_LA" target="_blank"><i className="ri-facebook-circle-fill inline-block hover:-translate-x-1 transition-all duration-200 hover:text-[#4f72ff]"></i></a>
                        {/* <a href="" className=""><AiOutlineX /></a> */}
                        <a href="https://www.linkedin.com/" target="_blank"><i className="ri-linkedin-fill inline-block  transition-all duration-200 hover:-translate-x-1 hover:scale-110  hover:text-[#1443ff]"></i></a>
                        <a href="https://x.com/?lang=es" target="_blank"><i className="ri-twitter-x-fill inline-block  transition-all duration-200 hover:-translate-x-1 hover:scale-110 hover:text-[#484848]"></i></a>
                        <a href="https://www.instagram.com/" target="_blank"><i className="ri-instagram-line inline-block transition-all duration-200 hover:-translate-x-1 hover:scale-110 hover:bg-linear-to-r hover:from-pink-500 hover:via-purple-500 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent"></i></a>
                    </div>
                </div>
                
            </div>
        </footer>
        
        </>
    )
}
