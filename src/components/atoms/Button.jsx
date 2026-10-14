
export const Button = ({text, onClick, className, type}) => {
    return (
        <>
        <button
        type={type}
        onClick={onClick}
        className={className}
        >
            {text}
        </button>
        </>
    )
}
