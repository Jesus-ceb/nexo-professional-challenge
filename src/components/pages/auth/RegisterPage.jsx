import React, { useState } from 'react'
import { Button } from '../../atoms/Button'
import { useNavigate } from 'react-router-dom'
import { registerUser, loginUser } from '../../../api/authService'
import { useAuth } from '../../../context/AuthContext'

export const RegisterPage = () => {

    const navigate = useNavigate()
    const { login } = useAuth()

    // one state for each form field
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    // subject to errors, one key per field
    const [errors, setErrors] = useState({})

    // validates the entire form 

    const validate = () =>{
        const newErrors = {}

        if (!name.trim()){
            newErrors.name = 'Nombre obligatorio';
        }

        if (!lastName.trim()){
            newErrors.lastName = 'Apellido obligatorio';
        }

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

        if (!confirmPassword){
            newErrors.confirmPassword = 'Debes confirmar la contraseña'
        }else if (password && confirmPassword && password !== confirmPassword){
            newErrors.confirmPassword = 'Las contraseñas no coinciden'
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
            await registerUser({name, lastName, email, password})
        }catch (err){
            setErrors({general: err.message })
            return
        }

        // Automatic login after registering, so the user doesn't have to type the credentials again.
        try {
            const { token, user } = await loginUser(email, password)
            login(token, user)
            navigate('/')
        } catch {
            navigate('/login') // the account was created; the user can log in manually
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

        
            <div className="bg-gray-100 rounded-2xl shadow-lg w-full max-w-2xl px-6 py-8 ">

                {/* Título centrado horizontalmente */}
                <h1 className="text-3xl font-bold text-[#5D9C42] text-center mb-8">
                    Regístrate
                </h1>

                <form className="grid grid-cols-2 gap-x-6 gap-y-5">

                    {/* Nombre */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-slate-700">Nombre</label>
                        <input
                            value={name}
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            className="p-2 text-black bg-[#E8E8E8] outline-none focus:ring-2 focus:ring-[#5D9C42] rounded-lg"
                        />
                        {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
                    </div>
                    

                    {/* Apellido */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-slate-700">Apellido</label>
                        <input
                        value={lastName}
                        type="text"
                        onChange={ (e) => setLastName(e.target.value)}
                        className="p-2 text-black bg-[#E8E8E8] outline-none focus:ring-2 focus:ring-[#5D9C42] rounded-lg"
                        />
                        {errors.lastName && <span className='text-red-500 text-xs' >{errors.lastName}</span> }
                    </div>

                    {/* Email: ocupa las 2 columnas */}
                    <div className="flex flex-col gap-1 col-span-2">
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

                    {/* Confirmar contraseña */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-slate-700">Confirmar contraseña</label>
                        <input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password"
                            className="p-2 text-black bg-[#E8E8E8] outline-none focus:ring-2 focus:ring-[#5D9C42] rounded-lg"
                        />
                        {errors.confirmPassword && <span className='text-red-500 text-xs' >{errors.confirmPassword}</span>}
                    </div>

                </form>

                {errors.general && <span className="text-red-500 text-sm block mt-4">{errors.general}</span>}

                <Button
                onClick={handleSubmit} 
                text={'Enviar'}
                className={'bg-green-600 text-white rounded-lg mt-8 p-2 px-7 transition-all duration-300 cursor-pointer border border-transparent hover:border-green-600 hover:bg-white hover:text-green-600 hover:shadow-lg'}
                />

            </div>
        </div>
        </>
    )
}
