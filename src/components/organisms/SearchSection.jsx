import { useEffect, useRef, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Button } from "../atoms/Button"
import { SearchInput } from "../atoms/SearchInput"
import { SearchAutocomplete } from "../molecules/SearchAutocomplete"
import { DateRangeCalendar } from "./DateRangeCalendar"
import { formatShort, fromISODate, toISODate } from "../../utils/dateUtils"

// Search block: the search lives in the Home URL (/?q=cali&checkIn=2026-10-20&checkOut=2026-10-25),
// so the fields start from it and the results survive a reload or the back button.
export const SearchSection = () => {

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const [query, setQuery] = useState(() => searchParams.get('q') ?? '')
    const [dates, setDates] = useState(() => ({
        checkIn: fromISODate(searchParams.get('checkIn')),
        checkOut: fromISODate(searchParams.get('checkOut')),
    }))
    const [formError, setFormError] = useState(null)
    const [showCalendar, setShowCalendar] = useState(false)
    const dateRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        const q = query.trim()

        if (!q && !dates.checkIn) {
            setFormError('Escribe un destino o elige tus fechas para buscar.')
            return
        }
        if (dates.checkIn && !dates.checkOut) {
            setFormError('Elige también la fecha de salida.')
            setShowCalendar(true)
            return
        }

        setFormError(null)
        setShowCalendar(false)

        const params = new URLSearchParams()
        if (q) params.set('q', q)
        if (dates.checkIn) {
            params.set('checkIn', toISODate(dates.checkIn))
            params.set('checkOut', toISODate(dates.checkOut))
        }
        navigate(`/?${params}`)
    }

    // Close the calendar on a click outside the date field or on Escape.
    useEffect(() => {
        if (!showCalendar) return

        const handleClickOutside = (e) => {
            if (dateRef.current && !dateRef.current.contains(e.target)) setShowCalendar(false)
        }
        const handleEscape = (e) => {
            if (e.key === 'Escape') setShowCalendar(false)
        }

        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleEscape)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleEscape)
        }
    }, [showCalendar])

    const datesLabel = dates.checkIn
        ? `${formatShort(dates.checkIn)} — ${dates.checkOut ? formatShort(dates.checkOut) : 'Salida'}`
        : ''

    return (
        <>
        <div className='bg-[#5D9C42] p-1 md:p-2 lg:p-6'>
        
            <h1 
            className='flex text-white w-full text-2xl md:text-3xl lg:text-5xl justify-center md:p-0.5 lg:p-1.5'
            >
                Busca ofertas en hoteles, casas y mucho más
            </h1>

            <p className='text-center text-white/90 text-sm md:text-base mt-2 px-4'>
                Escribe una ciudad, un tipo de alojamiento o su nombre y elige tus fechas de llegada y salida.
            </p>

            {/* Search form: destination + dates + button */}
            <form
            onSubmit={handleSubmit}
            role='search'
            className='flex flex-col md:flex-row lg:flex-row justify-center items-center gap-3 mt-4 mb-2 mx-auto max-w-6xl px-3 md:px-0'
            >

                {/* Destination field with autocomplete */}
                <div className='w-full md:w-90 lg:w-130'>
                <label htmlFor='search-destino' className='sr-only'>Destino o alojamiento</label>
                <SearchAutocomplete
                id='search-destino'
                value={query}
                onChange={(value) => {
                    setQuery(value)
                    setFormError(null)
                }}
                svg={
                    <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className="size-6 text-gray-300">
                    <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                    </svg>

                }
                className='bg-white items-center p-1.5 w-full rounded-md text-gray-400'
                placeholder={'¿A dónde vamos? Ciudad, tipo o nombre'}
                />
                </div>


                {/* Date field: opens the two-month range calendar */}
                <div ref={dateRef} className='relative w-full md:w-90 lg:w-130'>
                <label htmlFor='search-fechas' className='sr-only'>Fechas de llegada y salida</label>
                <SearchInput
                id='search-fechas'
                svg={
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                    <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
                    </svg>

                } 
                className='bg-white md:flex-row items-center p-1.5 w-full rounded-md justify-start text-gray-400 '
                placeholder={'Llegada - Salida'}
                value={datesLabel}
                readOnly
                onClick={() => setShowCalendar(true)}
                />

                {showCalendar && (
                    <DateRangeCalendar
                    {...dates}
                    onChange={(value) => {
                        setDates(value)
                        setFormError(null)
                    }}
                    onClose={() => setShowCalendar(false)}
                    />
                )}
                </div>

                <Button
                type='submit'
                text={'Realizar búsqueda'}
                className={'border p-1 md:p-1.5 border-white text-white font-medium rounded-md w-full md:w-48 shrink-0 transition-all duration-300 hover:text-[#5D9C42] hover:bg-white cursor-pointer'}
                />
            </form>

            {formError && (
                <p role='alert' className='text-center text-sm text-yellow-100 font-medium pb-2'>
                    {formError}
                </p>
            )}

        </div>
        </>
    )
}
