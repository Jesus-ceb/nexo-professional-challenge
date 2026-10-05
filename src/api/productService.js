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

// Write operations are admin only: they send the session token and the backend answers 403 to a USER.
export async function createProduct(productData, token) {

    const res = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(productData),
    });

    if (!res.ok) {
        const errorMessage = await res.text() //We read the actual message from the backend.
        throw new Error(errorMessage || 'Error al crear el producto')
    }

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