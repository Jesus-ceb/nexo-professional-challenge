// A product without reviews starts with no stars (score 0.0, "Sin valoraciones").
export const DEFAULT_RATING = 0

export const displayRating = (averageRating) => averageRating ?? DEFAULT_RATING

// Word for a 1-5 rating, e.g. 4.3 -> "Muy bueno".
// On the 0-10 score it means: 9+ Excelente, 8+ Muy bueno, 6+ Bueno, 4+ Regular, less Malo.
// 0 only happens when there are no reviews (the lowest real rating is 1 star).
export const ratingLabel = (value) => {
    if (!value) return 'Sin valoraciones'
    if (value >= 4.5) return 'Excelente'
    if (value >= 4) return 'Muy bueno'
    if (value >= 3) return 'Bueno'
    if (value >= 2) return 'Regular'
    return 'Malo'
}

// Labels for each star of the rating input.
export const STAR_LABELS = ['Malo', 'Regular', 'Bueno', 'Muy bueno', 'Excelente']

// Users rate with 1-5 stars, but the score is shown out of 10 like Booking or Despegar:
// 4.65 stars -> "9.3", 2 stars -> "4.0", 5 stars -> "10".
export const formatRating = (value) => {
    const score = Math.round(value * 20) / 10
    return score === 10 ? '10' : score.toFixed(1)
}

const reviewDateFormat = new Intl.DateTimeFormat('es', { day: 'numeric', month: 'long', year: 'numeric' })

// "2026-10-14T22:10:00" -> "14 de octubre de 2026"
export const formatReviewDate = (iso) => reviewDateFormat.format(new Date(iso))
