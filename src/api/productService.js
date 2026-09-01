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

export async function createProduct(productData) {
    
    const res = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
    });
    if (!res.ok) throw new Error("Error al crear el producto")

    return res.json();
}

export async function uploadProductImage(productId, file ){

    const formData = new FormData();
    formData.append('file', file)

    const res = await fetch(`${BASE_URL}/products/${productId}/image`, {
        method: 'POST',
        body: formData
    });

    if (!res.ok) throw new Error('Error al subir la imagen');

    return res.json();

}

export async function deleteProduct(id) {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Error al eliminar el producto');
    
}