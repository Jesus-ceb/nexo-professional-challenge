import { useState } from "react"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { CalendarMonth } from "../molecules/CalendarMonth"
import { addMonths, isBefore } from "../../utils/dateUtils"

// TODO: replace with the product's real bookings from the backend once reservations exist.
// Hardcoded example: days 10 to 13 of every month are occupied.
const MOCK_BOOKED_DAYS = { from: 10, to: 13 }

const isBooked = (day) => day.getDate() >= MOCK_BOOKED_DAYS.from && day.getDate() <= MOCK_BOOKED_DAYS.to

// Read-only availability calendar for the product detail: two months side by side (one on mobile).
export const AvailabilityCalendar = () => {

    const currentMonth = addMonths(new Date(), 0)
    const [visibleMonth, setVisibleMonth] = useState(currentMonth)

    const canGoBack = isBefore(currentMonth, visibleMonth)

    return (
        <div className="mt-10 bg-white border border-gray-200 rounded-lg p-4 md:p-6 w-fit max-w-full">

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

                <CalendarMonth monthDate={visibleMonth} isBooked={isBooked}/>

                <div className="hidden md:block">
                    <CalendarMonth monthDate={addMonths(visibleMonth, 1)} isBooked={isBooked}/>
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

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 pt-3 border-t border-gray-200 text-sm text-slate-600">
                <span className="flex items-center gap-2">
                    <span className="size-3 rounded-full border border-gray-400 bg-white"/>
                    Disponible
                </span>
                <span className="flex items-center gap-2">
                    <span className="size-3 rounded-full bg-red-200"/>
                    Ocupado
                </span>
                <span className="flex items-center gap-2">
                    <span className="size-3 rounded-full bg-blue-600"/>
                    Hoy
                </span>
            </div>

        </div>
    )
}
