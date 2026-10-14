import { readErrorMessage } from './apiError';

const BASE_URL = import.meta.env.VITE_API_URL;

export async function getCategories() {

    const res = await fetch(`${BASE_URL}/categories`);
    if (!res.ok) throw new Error('Error al cargar categorias');

    return res.json();
}

export async function getCities() {
    
    const res = await fetch(`${BASE_URL}/cities`);
    if (!res.ok) throw new Error('Error al cargar ciudades');

    return res.json();
}

export async function getProducts() {
    
    const res = await fetch(`${BASE_URL}/products`);
    if (!res.ok) throw new Error('Error al cargar productos');

    return res.json();

}

// Keyword + optional date range (YYYY-MM-DD); empty values are not sent.
export async function searchProducts({ q, checkIn, checkOut }) {

    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);

    const res = await fetch(`${BASE_URL}/products/search?${params}`);

    // 400 invalid dates: we show the actual message from the backend.
    if (!res.ok) throw new Error(await readErrorMessage(res, 'Error al realizar la búsqueda'));

    return res.json();
}

// City, category and product names containing the text, for the search autocomplete.
export async function getSearchSuggestions(q, signal) {

    const res = await fetch(`${BASE_URL}/products/suggestions?${new URLSearchParams({ q })}`, { signal });
    if (!res.ok) throw new Error('Error al cargar sugerencias');

    return res.json();
}

// Write operations are admin only: they send the session token and the backend answers 403 to a USER.
export async function createProduct(productData, token) {

    const res = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(productData),
    });

    // 409 duplicated name, 400 invalid fields: we show the actual message from the backend.
    if (!res.ok) throw new Error(await readErrorMessage(res, 'Error al crear el producto'));

    return res.json();
}

export async function uploadProductImage(productId, file, token){

    const formData = new FormData();
    formData.append('file', file)

    const res = await fetch(`${BASE_URL}/products/${productId}/images/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
    });

    if (!res.ok) throw new Error('Error al subir la imagen');

    return res.json();

}

// Body: { name, description, categoryId, cityId, address, featureIds } (ProductRequest); images are handled separately.
export async function updateProduct(id, productData, token) {

    const res = await fetch(`${BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(productData),
    });

    if (!res.ok) throw new Error(await readErrorMessage(res, 'Error al actualizar el producto'));

    return res.json();
}

export async function deleteProductImage(productId, imageId, token) {

    const res = await fetch(`${BASE_URL}/products/${productId}/images/${imageId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error('Error al eliminar la imagen');

    return res.json();
}

export async function deleteProduct(id, token) {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Error al eliminar el producto');

}

//Find product by id

export async function getProductById(id) {

    const res = await fetch(`${BASE_URL}/products/${id}`);

    if (!res.ok) {
        throw new Error("Error al cargar el producto");
    }

    return res.json();
}