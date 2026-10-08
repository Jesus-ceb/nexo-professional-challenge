import { readErrorMessage } from './apiError';

const BASE_URL = import.meta.env.VITE_API_URL;

export async function registerUser(userData) {
    let res;
    try {
        res = await fetch(`${BASE_URL}/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
    } catch {
        throw new Error('No se pudo conectar con el servidor. Inténtalo más tarde.');
    }

    // 409: the backend sends a user-friendly message (e.g. email already registered)
    if (res.status === 409) {
        throw new Error(await readErrorMessage(res, 'Este correo ya tiene una cuenta existente'));
    }

    if (!res.ok) {
        throw new Error('No se pudo completar el registro. Inténtalo de nuevo.');
    }

    return res.json();

}

// Returns { token, user } when the credentials are valid.
export async function loginUser(email, password) {
    let res;
    try {
        res = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
    } catch {
        throw new Error('No se pudo conectar con el servidor. Inténtalo más tarde.');
    }

    // 401: wrong email or password, the backend sends { message: "Correo o contraseña incorrectos" }
    if (res.status === 401) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Correo o contraseña incorrectos');
    }

    if (!res.ok) {
        throw new Error('No se pudo iniciar sesión. Inténtalo de nuevo.');
    }

    return res.json();
}

// Sends the registration confirmation email again. 429: asked too soon, the backend says how long to wait.
export async function resendConfirmationEmail(token) {
    let res;
    try {
        res = await fetch(`${BASE_URL}/users/me/resend-confirmation`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch {
        throw new Error('No se pudo conectar con el servidor. Inténtalo más tarde.');
    }

    if (res.status === 429) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Espera un momento antes de reenviar el correo');
    }

    if (!res.ok) {
        throw new Error('No se pudo reenviar el correo. Inténtalo de nuevo.');
    }

    return res.json();
}

// Returns the personal data of the logged-in user. 401 means the token expired or is invalid.
export async function getMe(token) {
    const res = await fetch(`${BASE_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 401) {
        const error = new Error('Tu sesión expiró. Inicia sesión de nuevo.');
        error.status = 401;
        throw error;
    }

    if (!res.ok) {
        throw new Error('No se pudo cargar tu información.');
    }

    return res.json();
}
