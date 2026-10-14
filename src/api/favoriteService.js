const BASE_URL = import.meta.env.VITE_API_URL;

// Favorites of the logged-in user; every call needs the session token.

// Returns the ids of the favorite products, e.g. [1, 4, 7].
export async function getFavoriteIds(token) {

    const res = await fetch(`${BASE_URL}/users/me/favorites`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Error al cargar favoritos');

    return res.json();
}

export async function addFavorite(productId, token) {

    const res = await fetch(`${BASE_URL}/users/me/favorites/${productId}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Error al agregar a favoritos');
}

export async function removeFavorite(productId, token) {

    const res = await fetch(`${BASE_URL}/users/me/favorites/${productId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Error al quitar de favoritos');
}
