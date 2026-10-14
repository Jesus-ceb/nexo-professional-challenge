// Weekday headers, Sunday first (same order as Date.getDay()).
export const WEEKDAYS = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb']

const monthYearFormat = new Intl.DateTimeFormat('es', { month: 'long', year: 'numeric' })
const shortFormat = new Intl.DateTimeFormat('es', { weekday: 'short', day: 'numeric', month: 'short' })

// Copy of the date at 00:00, so comparisons ignore the time.
export const startOfDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate())

// First day of the month shifted n months.
export const addMonths = (date, n) => new Date(date.getFullYear(), date.getMonth() + n, 1)

export const isSameDay = (a, b) => !!a && !!b && startOfDay(a).getTime() === startOfDay(b).getTime()

export const isBefore = (a, b) => startOfDay(a).getTime() < startOfDay(b).getTime()

// Weeks of the month as rows of 7 cells; null fills the days before the 1st and after the last day.
export const getMonthMatrix = (year, month) => {
    const offset = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const cells = [
        ...Array(offset).fill(null),
        ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
    ]
    while (cells.length % 7 !== 0) cells.push(null)

    const weeks = []
    for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))
    return weeks
}

// "octubre de 2026"
export const formatMonthYear = (date) => monthYearFormat.format(date)

// "mar, 20 oct"
export const formatShort = (date) => shortFormat.format(date).replace('.', '')

// "2026-10-20", local date (toISOString would shift it to UTC).
export const toISODate = (date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${date.getFullYear()}-${month}-${day}`
}

// "2026-10-20" -> local Date, or null if missing/invalid (new Date("2026-10-20") would be UTC).
export const fromISODate = (text) => {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(text ?? '')
    if (!match) return null
    const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
    return isNaN(date) ? null : date
}
