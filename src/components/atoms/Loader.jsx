// Spinner + text shown while the backend responds.
export const Loader = ({ text = 'Cargando...' }) => {
    return (
        <div role="status" className="flex flex-col items-center justify-center gap-3 py-10 text-[#5D9C42]">
            <span className="w-10 h-10 border-4 border-[#5D9C42]/30 border-t-[#5D9C42] rounded-full animate-spin"></span>
            <span className="text-sm font-medium">{text}</span>
        </div>
    )
}
