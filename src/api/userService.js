const BASE_URL = import.meta.env.VITE_API_URL;

// Returns every registered user: { id, name, lastName, email, role }. Admin only.
export async function getUsers(token) {

    const res = await fetch(`${BASE_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Error al cargar usuarios');

    return res.json();
}

// Grants ('ADMIN') or removes ('USER') the admin role. Returns the updated user.
export async function updateUserRole(id, role, token) {

    const res = await fetch(`${BASE_URL}/users/${id}/role`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ role }),
    });

    // 409: the backend explains why (parent account or own admin role can't be removed)
    if (res.status === 409) {
        throw new Error(await res.text());
    }

    if (!res.ok) throw new Error('No se pudo actualizar el rol');

    return res.json();
}
