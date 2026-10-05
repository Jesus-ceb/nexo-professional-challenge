import { Header } from '../organisms/Header'
import { Footer } from '../organisms/Footer'
import { useAuth } from '../../context/AuthContext'
import { getInitials } from '../../utils/getInitials'

// Personal information of the logged-in user (only reachable through ProtectedRoute).
export const ProfilePage = () => {

    const { user } = useAuth()

    return (
        // min-h-screen + flex-col + flex-1 on <main>: keeps the Footer at the bottom of the page
        <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 flex justify-center items-start w-full py-10 px-4">
            <div className="bg-gray-100 rounded-2xl shadow-lg w-full max-w-md px-6 py-8 flex flex-col items-center gap-6">

                <div className="w-20 h-20 rounded-full bg-[#5D9C42] text-white flex items-center justify-center text-3xl font-bold">
                    {getInitials(user.name, user.lastName)}
                </div>

                <h1 className="text-3xl font-bold text-[#5D9C42] text-center">
                    Mi perfil
                </h1>

                <dl className="w-full grid gap-4">
                    <div className="flex flex-col gap-1">
                        <dt className="text-sm font-semibold text-slate-700">Nombre</dt>
                        <dd className="p-2 text-black bg-[#E8E8E8] rounded-lg">{user.name}</dd>
                    </div>
                    <div className="flex flex-col gap-1">
                        <dt className="text-sm font-semibold text-slate-700">Apellido</dt>
                        <dd className="p-2 text-black bg-[#E8E8E8] rounded-lg">{user.lastName}</dd>
                    </div>
                    <div className="flex flex-col gap-1">
                        <dt className="text-sm font-semibold text-slate-700">Correo electrónico</dt>
                        <dd className="p-2 text-black bg-[#E8E8E8] rounded-lg break-all">{user.email}</dd>
                    </div>
                </dl>

            </div>
        </main>

        <Footer />
        </div>
    )
}
