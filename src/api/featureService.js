const BASE_URL = import.meta.env.VITE_API_URL;

// Public: returns every feature { id, name, icon }.
export async function getFeatures() {

    const res = await fetch(`${BASE_URL}/features`);
    if (!res.ok) throw new Error('Error al cargar las características');

    return res.json();
}

// Admin only. 409: the backend explains that the name already exists.
export async function createFeature(featureData, token) {

    const res = await fetch(`${BASE_URL}/features`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(featureData),
    });

    if (res.status === 409) throw new Error(await res.text());
    if (!res.ok) throw new Error('No se pudo crear la característica');

    return res.json();
}

export async function updateFeature(id, featureData, token) {

    const res = await fetch(`${BASE_URL}/features/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(featureData),
    });

    if (res.status === 409) throw new Error(await res.text());
    if (!res.ok) throw new Error('No se pudo actualizar la característica');

    return res.json();
}

// The backend also removes it from the products that had it.
export async function deleteFeature(id, token) {

    const res = await fetch(`${BASE_URL}/features/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error('No se pudo eliminar la característica');
}
