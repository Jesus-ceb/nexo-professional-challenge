export async function registerUser(userData) {
    const res = await fetch(`${BASE_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });

    if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(errorMessage);
    }

    return res.json();
    
}