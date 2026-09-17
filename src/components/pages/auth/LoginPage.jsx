import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../atoms/Button'

export const LoginPage = () => {

    const navigate = useNavigate()

    return (
        <>
                {/* header */}
                <header className='bg-[#5D9C42] p-5 '>
        
                    <div className='text-white flex items-baseline justify-center gap-2  text-center'>
        
                        <button 
                        onClick={() => navigate(-1)} 
                        className='absolute left-5 text-white text-3xl font-bold cursor-pointer hover:opacity-50 transition-opacity'
                        aria-label="Volver atrás"
                        >
                            &#8592; {/* Símbolo Unicode de flecha a la izquierda ← */}
                        </button>
        
        
                        <span
                        className='text-4xl font-extrabold'
                        >
                            NX 
                        </span>
                        <span 
                        className='text-2xl font-bold'
                        >
                            Siéntete en tu hogar
                        </span>
                    </div>
        
                </header>
        
                {/* Register */}
        
                <div className="flex justify-center w-full mt-6 ">
        
                    <div className="bg-gray-100 rounded-2xl shadow-lg w-full max-w-sm px-6 py-8 ">
        
                        {/* Título centrado horizontalmente */}
                        <h1 className="text-3xl font-bold text-[#5D9C42] text-center mb-8">
                            iniciar Sesion
                        </h1>
        
                        <form className="grid gap-x-6 gap-y-5">
        
        
                            {/* Email: ocupa las 2 columnas */}
                            <div className="flex flex-col gap-1 ">
                                <label className="text-sm font-semibold text-slate-700">Correo electrónico</label>
                                <input
                                    type="email"
                                    className="p-2 text-black bg-[#E8E8E8] outline-none focus:ring-2 focus:ring-[#5D9C42] rounded-lg"
                                />
                            </div>
        
                            {/* Contraseña */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-semibold text-slate-700">Contraseña</label>
                                <input
                                    type="password"
                                    className="p-2 text-black bg-[#E8E8E8] outline-none focus:ring-2 focus:ring-[#5D9C42] rounded-lg"
                                />
                            </div>
        
                        </form>
        
                        <Button 
                        text={'Enviar'}
                        className={'bg-green-600 text-white rounded-lg mt-8 p-2 px-7 transition-all duration-300 cursor-pointer border border-transparent hover:border-green-600 hover:bg-white hover:text-green-600 hover:shadow-lg'}
                        />
        
                    </div>
                </div>
                </>
    )
}
