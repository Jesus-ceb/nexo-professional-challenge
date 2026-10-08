import { useEffect, useState } from "react"

import { getUsers, updateUserRole } from "../../../../api/userService"
import { Loader } from "../../../atoms/Loader"
import { useAuth } from "../../../../context/AuthContext"


export const CustomersPage = () => {

    const { token, user: currentUser } = useAuth()

    const [users, setUsers] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    // When assembling the component, it requests the registered users from the backend.
    useEffect(() => {
        getUsers(token)
        .then(setUsers)
        .catch(() => setError('Error al cargar los usuarios'))
        .finally(() => setLoading(false));
    }, [token]);


    // Grants or removes the admin role and refreshes that row with the backend response.
    const handleToggleRole = async (user) => {
        const newRole = user.role === 'ADMIN' ? 'USER' : 'ADMIN'
        const question = newRole === 'ADMIN'
            ? `¿Dar permisos de administrador a ${user.name} ${user.lastName}?`
            : `¿Quitar permisos de administrador a ${user.name} ${user.lastName}?`
        if (!window.confirm(question)) return;

        setError(null)
        try {
            const updated = await updateUserRole(user.id, newRole, token)
            setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)))
        } catch (err) {
            setError(err.message)
        }
    }


    return (
        <>
        <div className="m-3.5 text-blue-500">

            <div className="mt-4 w-fit p-1.5 bg-white text-blue-900 rounded-sm">
                <p>Listado de usuarios</p>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <table className="w-full text-left border-collapse">

                    {/* Cabecera de la tabla */}
                    <thead className="bg-slate-100 text-blue-900 uppercase text-sm">
                        <tr>
                            <th className="p-4 border-b">ID</th>
                            <th className="p-4 border-b">Nombre</th>
                            <th className="p-4 border-b">Correo</th>
                            <th className="p-4 border-b text-center">Rol</th>
                            <th className="p-4 border-b text-center">Acciones</th>
                        </tr>
                    </thead>

                    {/* Cuerpo de la tabla */}
                    <tbody className="text-slate-700">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                <td className="p-4 border-b">{user.id}</td>
                                <td className="p-4 border-b">{user.name} {user.lastName}</td>
                                <td className="p-4 border-b">{user.email}</td>
                                <td className="p-4 border-b text-center">{user.role}</td>
                                <td className="p-4 border-b text-center">
                                    {/* An admin can't remove their own role (the backend also blocks it) */}
                                    <button
                                    onClick={() => handleToggleRole(user)}
                                    disabled={user.id === currentUser.id}
                                    className="text-blue-600 hover:underline cursor-pointer disabled:text-slate-400 disabled:no-underline disabled:cursor-not-allowed"
                                    >
                                        {user.role === 'ADMIN' ? 'Quitar admin' : 'Hacer admin'}
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {loading && (
                            <tr>
                                <td colSpan={5}><Loader text="Cargando usuarios..."/></td>
                            </tr>
                        )}

                        {!loading && !error && users.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-4 border-b text-center">No hay usuarios registrados</td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>

        </div>
        </>
    )
}
