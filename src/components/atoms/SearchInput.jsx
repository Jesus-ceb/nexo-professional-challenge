

export const SearchInput = ({value, onChange, className, placeholder, svg}) => {
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
            className={'bg-transparent border-none outline-none w-full h-full text-gray-700 placeholder:text-gray-400'}
            placeholder={placeholder}
            type="text" 
            />
        </div>
        </>
    )
}
