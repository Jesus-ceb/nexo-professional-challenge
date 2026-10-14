// Short message fixed at the bottom of the screen (e.g. a favorite that couldn't be saved).
export const Toast = ({ message, type = 'error' }) => {
    if (!message) return null

    return (
        <p
        role={type === 'error' ? 'alert' : 'status'}
        className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-max max-w-[90vw] px-4 py-2 rounded-md shadow-lg text-sm text-white text-center
            ${type === 'error' ? 'bg-red-600' : 'bg-slate-800'}`}
        >
            {message}
        </p>
    )
}
