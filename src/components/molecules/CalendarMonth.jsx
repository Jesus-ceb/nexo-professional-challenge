import { WEEKDAYS, formatMonthYear, getMonthMatrix, isBefore, isSameDay, startOfDay } from "../../utils/dateUtils"

// One month of the range calendar: past days disabled, today highlighted, selected range shaded.
export const CalendarMonth = ({ monthDate, checkIn, checkOut, hoverDate, onSelect, onHover }) => {

    const today = startOfDay(new Date())
    const weeks = getMonthMatrix(monthDate.getFullYear(), monthDate.getMonth())

    // While only check-in is chosen, the hovered day previews the end of the range.
    const rangeEnd = checkOut ?? (checkIn && hoverDate && isBefore(checkIn, hoverDate) ? hoverDate : null)

    const isInRange = (day) => checkIn && rangeEnd && isBefore(checkIn, day) && isBefore(day, rangeEnd)

    const dayClass = (day) => {
        if (isBefore(day, today)) return 'text-gray-300 cursor-not-allowed'
        if (isSameDay(day, checkIn) || isSameDay(day, checkOut)) return 'bg-[#5D9C42] text-white font-bold rounded-full'
        if (isInRange(day)) return 'bg-[#F0F7ED] text-gray-800 rounded-full'
        if (isSameDay(day, today)) return 'text-blue-600 font-bold hover:bg-gray-100 rounded-full'
        return 'text-gray-800 hover:bg-gray-100 rounded-full'
    }

    return (
        <div className="w-full md:w-72">

            <h3 className="text-center font-bold text-gray-800 mb-4">
                {formatMonthYear(monthDate)}
            </h3>

            <div className="grid grid-cols-7 text-center text-sm text-gray-500 mb-2">
                {WEEKDAYS.map((weekday) => <span key={weekday}>{weekday}</span>)}
            </div>

            <div className="grid grid-cols-7 gap-y-1 text-center text-sm">
                {weeks.flat().map((day, index) => day ? (
                    <button
                    key={index}
                    type="button"
                    disabled={isBefore(day, today)}
                    onClick={() => onSelect(day)}
                    onMouseEnter={() => onHover(day)}
                    className={`h-9 w-9 mx-auto flex items-center justify-center transition-colors cursor-pointer ${dayClass(day)}`}
                    >
                        {day.getDate()}
                    </button>
                ) : (
                    <span key={index}/>
                ))}
            </div>

        </div>
    )
}
