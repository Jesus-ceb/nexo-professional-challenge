import { useNavigate } from 'react-router-dom'
import { RiCheckboxCircleLine } from 'react-icons/ri'
import { useAuth } from '../../../context/AuthContext'
import { ResendEmailButton } from '../../molecules/ResendEmailButton'

// Shown right after registering: tells the user where the confirmation email went and lets them resend it.
export const RegistrationSuccessPage = () => {

    const navigate = useNavigate()
    const { user } = useAuth()

    return (
        <>
        {/* header */}
        <header className='bg-[#5D9C42] p-5'>
            <div className='text-white flex items-baseline justify-center gap-2 text-center'>
                <span className='text-4xl font-extrabold'>NX</span>
                <span className='text-2xl font-bold'>Siéntete en tu hogar</span>
            </div>
        </header>

        <main className="flex justify-center w-full mt-10 px-4">
            <div className="bg-gray-100 rounded-2xl shadow-lg w-full max-w-md px-6 py-8 flex flex-col items-center gap-5 text-center">

                <RiCheckboxCircleLine className="text-7xl text-[#5D9C42]" />

                <h1 className="text-3xl font-bold text-[#5D9C42]">
                    ¡Registro exitoso!
                </h1>

                <p className="text-slate-700">
                    Hola <strong>{user.name}</strong>, te enviamos un correo de confirmación a{' '}
                    <strong className="break-all">{user.email}</strong>
                </p>

                <p className="text-sm text-slate-500">
                    ¿No te llegó? Revisa tu carpeta de spam o reenvíalo.
                </p>

                {/* the email was just sent, so the button starts waiting */}
                <ResendEmailButton startWithCooldown />

                <button
                type="button"
                onClick={() => navigate('/')}
                className="w-full rounded-lg p-2 bg-[#5D9C42] text-white font-semibold cursor-pointer border border-[#5D9C42] transition-all duration-300 hover:bg-white hover:text-[#5D9C42]"
                >
                    Ir al inicio
                </button>

            </div>
        </main>
        </>
    )
}
