// The backend answers errors as JSON { message, status, timestamp } (GlobalExceptionHandler).
// Returns that message, or the fallback if the body is empty or not JSON.
export async function readErrorMessage(res, fallback) {
    const text = await res.text().catch(() => '');
    try {
        return JSON.parse(text).message || fallback;
    } catch {
        return text || fallback;
    }
}
