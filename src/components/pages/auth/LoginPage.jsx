import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '../../atoms/Button'
import { loginUser } from '../../../api/authService'
import { useAuth } from '../../../context/AuthContext'

export const LoginPage = () => {

    const navigate = useNavigate()
    const { login } = useAuth()

    // ?email= comes from the link in the confirmation email, so the field starts filled
    const [searchParams] = useSearchParams()

    // one state for each form field
    const [email, setEmail] = useState(searchParams.get('email') ?? '')
    const [password, setPassword] = useState('')

    // subject to errors, one key per field (+ "general" for backend errors)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    // validates the entire form
    const validate = () => {

        const newErrors = {}

        if (!email.trim()){
            newErrors.email = 'Correo obligatorio';

        }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            newErrors.email = 'Ingresa un correo válido (ej: nombre@correo.com)'
        }

        if (!password.trim()){
            newErrors.password = 'Contraseña obligatoria'
        } else if (password.length < 8){
            newErrors.password = 'La contraseña debe tener al menos 8 caracteres'
        }

        setErrors(newErrors)

        // If the object ended up empty, there are no errors.
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!validate()){
            return // It stops here if something failed; it doesn't call the backend yet.
        }

        try {
            setLoading(true)
            const { token, user } = await loginUser(email, password)
            login(token, user) // saves the session in the context + localStorage
            navigate('/')
        } catch (err) {
            // e.g. "Correo o contraseña incorrectos" from the backend
            setErrors({ general: err.message })
        } finally {
            setLoading(false)
        }
    }



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
                            Iniciar sesión
                        </h1>

                        {/* Backend error, e.g. "Correo o contraseña incorrectos" */}
                        {errors.general && (
                            <div className="bg-red-100 text-red-600 text-sm p-3 rounded-lg mb-4 text-center">
                                {errors.general}
                            </div>
                        )}

                        <form className="grid gap-x-6 gap-y-5">
        
        
                            {/* Email: ocupa las 2 columnas */}
                            <div className="flex flex-col gap-1 ">
                                <label className="text-sm font-semibold text-slate-700">Correo electrónico</label>
                                <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                className="p-2 text-black bg-[#E8E8E8] outline-none focus:ring-2 focus:ring-[#5D9C42] rounded-lg"
                                />
                                {errors.email && <span className='text-red-500 text-xs'>{errors.email}</span>}
                            </div>
        
                            {/* Contraseña */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-semibold text-slate-700">Contraseña</label>
                                <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    className="p-2 text-black bg-[#E8E8E8] outline-none focus:ring-2 focus:ring-[#5D9C42] rounded-lg"
                                />
                                {errors.password && <span className='text-red-500 text-xs' >{errors.password}</span>}
                            </div>
        
                        </form>
        
                        <Button
                        onClick={loading ? undefined : handleSubmit}
                        text={loading ? 'Ingresando...' : 'Enviar'}
                        className={'bg-green-600 text-white rounded-lg mt-8 p-2 px-7 transition-all duration-300 cursor-pointer border border-transparent hover:border-green-600 hover:bg-white hover:text-green-600 hover:shadow-lg'}
                        />
        
                    </div>
                </div>
                </>
    )
}
