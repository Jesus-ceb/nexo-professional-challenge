


// Extra props (id, onKeyDown, aria-*...) go straight to the <input>.
export const SearchInput = ({value, onChange, onClick, onFocus, readOnly, className, placeholder, svg, ...inputProps}) => {
    return (
        <>
        <div className={`bg-white flex gap-1 focus-within:ring-2 focus-within:ring-[#a5f512] transition-all ${className} `}>

            <div className="text-gray-400"
            >
                {svg}
            </div>

            <input
            value={value}
            onChange={onChange}
            onClick={onClick}
            onFocus={onFocus}
            readOnly={readOnly}
            className={`bg-transparent border-none outline-none w-full h-full text-gray-700 placeholder:text-gray-400 ${readOnly ? 'cursor-pointer' : ''}`}
            placeholder={placeholder}
            type="text"
            {...inputProps}
            />
        </div>
        </>
    )
}
