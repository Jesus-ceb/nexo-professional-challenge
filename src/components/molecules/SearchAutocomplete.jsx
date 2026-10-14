import { useEffect, useRef, useState } from "react"
import { SearchInput } from "../atoms/SearchInput"
import { getSearchSuggestions } from "../../api/productService"

const MIN_LENGTH = 2
const DEBOUNCE_MS = 300

// Bold part of the suggestion that matches what the user typed.
const highlight = (text, query) => {
    const index = text.toLowerCase().indexOf(query.toLowerCase())
    if (index === -1) return text
    return (
        <>
            {text.slice(0, index)}
            <strong className="text-[#5D9C42]">{text.slice(index, index + query.length)}</strong>
            {text.slice(index + query.length)}
        </>
    )
}

// Destination field with suggestions from the backend (cities, categories, product names).
export const SearchAutocomplete = ({ id, value, onChange, svg, className, placeholder }) => {

    const [suggestions, setSuggestions] = useState([])
    const [open, setOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState(-1)
    const containerRef = useRef(null)

    const term = value.trim()

    // Waits until the user stops typing, then asks the backend; the previous request is cancelled.
    useEffect(() => {
        if (term.length < MIN_LENGTH) return

        const controller = new AbortController()
        const timer = setTimeout(() => {
            getSearchSuggestions(term, controller.signal)
                .then((data) => {
                    setSuggestions(data)
                    setActiveIndex(-1)
                })
                .catch((err) => {
                    if (err.name !== 'AbortError') setSuggestions([])
                })
        }, DEBOUNCE_MS)

        return () => {
            clearTimeout(timer)
            controller.abort()
        }
    }, [term])

    // Close the list on a click outside the field.
    useEffect(() => {
        if (!open) return

        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false)
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [open])

    const visible = open && term.length >= MIN_LENGTH && suggestions.length > 0
    const listId = `${id}-sugerencias`

    const select = (suggestion) => {
        onChange(suggestion)
        setOpen(false)
    }

    // Up/Down move through the list, Enter picks the highlighted one, Escape closes.
    const handleKeyDown = (e) => {
        if (!visible) return

        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setActiveIndex((index) => (index + 1) % suggestions.length)
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setActiveIndex((index) => (index <= 0 ? suggestions.length - 1 : index - 1))
        } else if (e.key === 'Enter' && activeIndex >= 0) {
            // Picks the suggestion instead of submitting the form.
            e.preventDefault()
            select(suggestions[activeIndex])
        } else if (e.key === 'Escape') {
            setOpen(false)
        }
    }

    return (
        <div ref={containerRef} className="relative w-full">

            <SearchInput
            id={id}
            value={value}
            onChange={(e) => {
                onChange(e.target.value)
                setOpen(true)
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={handleKeyDown}
            svg={svg}
            className={className}
            placeholder={placeholder}
            autoComplete="off"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={visible}
            aria-controls={listId}
            aria-activedescendant={visible && activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
            />

            {visible && (
                <ul
                id={listId}
                role="listbox"
                className="absolute top-full mt-2 left-0 right-0 z-50 bg-white rounded-md shadow-xl py-1 text-left"
                >
                    {suggestions.map((suggestion, index) => (
                        <li
                        key={suggestion}
                        id={`${listId}-${index}`}
                        role="option"
                        aria-selected={index === activeIndex}
                        // mousedown instead of click so the input doesn't lose focus first
                        onMouseDown={(e) => {
                            e.preventDefault()
                            select(suggestion)
                        }}
                        onMouseEnter={() => setActiveIndex(index)}
                        className={`px-4 py-2 text-sm text-gray-700 cursor-pointer ${index === activeIndex ? 'bg-[#F0F7ED]' : ''}`}
                        >
                            {highlight(suggestion, term)}
                        </li>
                    ))}
                </ul>
            )}

        </div>
    )
}
