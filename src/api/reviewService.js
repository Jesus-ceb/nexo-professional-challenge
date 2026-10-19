import { readErrorMessage } from './apiError';

const BASE_URL = import.meta.env.VITE_API_URL;

// Reviews of a product, newest first: [{ id, rating, comment, createdAt, userName }].
export async function getReviews(productId) {

    const res = await fetch(`${BASE_URL}/products/${productId}/reviews`);
    if (!res.ok) throw new Error('Error al cargar los comentarios');

    return res.json();
}

// Publishes a review (logged-in user). Returns { review, averageRating, reviewCount }.
export async function createReview(productId, { rating, comment }, token) {

    const res = await fetch(`${BASE_URL}/products/${productId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ rating, comment }),
    });

    if (!res.ok) throw new Error(await readErrorMessage(res, 'No se pudo publicar tu comentario'));

    return res.json();
}
