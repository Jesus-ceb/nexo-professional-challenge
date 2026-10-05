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
        throw new Error(await res.text());
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
