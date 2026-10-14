import { useState } from "react"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { CalendarMonth } from "../molecules/CalendarMonth"
import { addMonths, isBefore, isSameDay } from "../../utils/dateUtils"

// Check-in / check-out panel with two months side by side (one on mobile).
export const DateRangeCalendar = ({ checkIn, checkOut, onChange, onClose }) => {

    const currentMonth = addMonths(new Date(), 0)
    const [visibleMonth, setVisibleMonth] = useState(() => checkIn ? addMonths(checkIn, 0) : currentMonth)
    const [hoverDate, setHoverDate] = useState(null)

    const canGoBack = isBefore(currentMonth, visibleMonth)

    // First click sets check-in, second sets check-out; a day on or before check-in restarts the range.
    const handleSelect = (day) => {
        if (!checkIn || checkOut || isBefore(day, checkIn) || isSameDay(day, checkIn)) {
            onChange({ checkIn: day, checkOut: null })
            return
        }
        onChange({ checkIn, checkOut: day })
        onClose()
    }

    const monthProps = { checkIn, checkOut, hoverDate, onSelect: handleSelect, onHover: setHoverDate }

    return (
        <div
        className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 w-[min(92vw,22rem)] md:w-auto bg-white rounded-lg shadow-xl p-4 md:p-6"
        onMouseLeave={() => setHoverDate(null)}
        >

            <div className="relative flex gap-10">

                <button
                type="button"
                aria-label="Mes anterior"
                disabled={!canGoBack}
                onClick={() => setVisibleMonth((month) => addMonths(month, -1))}
                className="absolute left-0 top-0 p-1 text-gray-700 rounded-full hover:bg-gray-100 cursor-pointer disabled:opacity-0 disabled:cursor-default"
                >
                    <FiChevronLeft className="size-5"/>
                </button>

                <CalendarMonth monthDate={visibleMonth} {...monthProps}/>

                <div className="hidden md:block">
                    <CalendarMonth monthDate={addMonths(visibleMonth, 1)} {...monthProps}/>
                </div>

                <button
                type="button"
                aria-label="Mes siguiente"
                onClick={() => setVisibleMonth((month) => addMonths(month, 1))}
                className="absolute right-0 top-0 p-1 text-gray-700 rounded-full hover:bg-gray-100 cursor-pointer"
                >
                    <FiChevronRight className="size-5"/>
                </button>

            </div>

            <div className="flex justify-end gap-3 mt-4 pt-3 border-t border-gray-200">
                <button
                type="button"
                onClick={() => onChange({ checkIn: null, checkOut: null })}
                className="px-3 py-1.5 text-sm text-slate-600 underline cursor-pointer hover:text-[#5D9C42]"
                >
                    Limpiar
                </button>
                <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 text-sm rounded-md bg-[#5D9C42] text-white cursor-pointer hover:bg-[#4c8236]"
                >
                    Listo
                </button>
            </div>

        </div>
    )
}
