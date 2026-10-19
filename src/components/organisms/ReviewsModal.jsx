import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { StarRating } from "../atoms/StarRating"
import { Loader } from "../atoms/Loader"
import { useAuth } from "../../context/AuthContext"
import { createReview } from "../../api/reviewService"
import { formatRating, formatReviewDate, ratingLabel } from "../../utils/ratingUtils"

const MAX_COMMENT = 1000

// Reviews window of the product detail: rating summary, then the form (stars + comment + "Comentar")
// and the list of comments. onCreated receives { review, averageRating, reviewCount } after publishing.
export const ReviewsModal = ({ productId, rating, reviewCount, reviews, loading, error, onRetry, onCreated, onClose }) => {

    const { token, isAuthenticated } = useAuth()

    const [newRating, setNewRating] = useState(0)
    const [comment, setComment] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState(null)

    // Escape closes the window.
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [onClose])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!newRating || submitting) return

        setSubmitting(true)
        setSubmitError(null)
        createReview(productId, { rating: newRating, comment }, token)
        .then((result) => {
            onCreated(result)
            setNewRating(0)
            setComment('')
        })
        .catch((err) => setSubmitError(err.message))
        .finally(() => setSubmitting(false))
    }

    return (
        <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start sm:items-center justify-center p-4 overflow-y-auto"
        onClick={onClose}
        >
            <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="reviews-title"
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg p-5 sm:p-6"
            >

                {/* Header */}
                <div className="flex items-center justify-between">
                    <h2 id="reviews-title" className="text-xl font-bold text-slate-800">Comentarios de reservas</h2>
                    <button
                    type="button"
                    onClick={onClose}
                    aria-label="Cerrar"
                    className="text-slate-600 hover:text-slate-900 text-2xl cursor-pointer"
                    >
                        ×
                    </button>
                </div>

                {/* Rating summary */}
                <div className="mt-4 flex items-center gap-4">
                    <span className="bg-[#5D9C42] text-white text-3xl font-bold rounded-lg w-20 h-16 flex items-center justify-center">
                        {formatRating(rating)}
                    </span>
                    <div>
                        <p className="text-lg font-semibold text-slate-800">{ratingLabel(rating)}</p>
                        <StarRating value={rating} className="text-xl"/>
                        <p className="text-sm text-slate-500">
                            {reviewCount} {reviewCount === 1 ? 'valoración' : 'valoraciones'}
                        </p>
                    </div>
                </div>

                {/* Form */}
                <div className="mt-6 border-t border-gray-200 pt-5">
                    {isAuthenticated ? (
                        <form onSubmit={handleSubmit}>
                            <p className="text-sm font-medium text-slate-700">Tu calificación</p>
                            <StarRating value={newRating} onChange={setNewRating} className="mt-1"/>

                            <label htmlFor="review-comment" className="sr-only">Tu comentario</label>
                            <textarea
                            id="review-comment"
                            rows={3}
                            maxLength={MAX_COMMENT}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Escribe tu comentario…"
                            className="mt-3 w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-slate-700 resize-none focus:outline-none focus:ring-2 focus:ring-[#5D9C42]"
                            />

                            <div className="mt-2 flex items-center justify-between gap-3">
                                <span className="text-xs text-slate-400">{comment.length}/{MAX_COMMENT}</span>
                                <button
                                type="submit"
                                disabled={!newRating || submitting}
                                className="px-6 py-2 rounded-md bg-[#5D9C42] text-white font-semibold cursor-pointer hover:bg-[#4c8236] disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    {submitting ? 'Publicando…' : 'Comentar'}
                                </button>
                            </div>

                            {!newRating && <p className="mt-1 text-xs text-slate-500">Elige de 1 a 5 estrellas para poder comentar.</p>}
                            {submitError && <p role="alert" className="mt-2 text-sm text-red-600">{submitError}</p>}
                        </form>
                    ) : (
                        <p className="text-sm text-slate-600">
                            <Link to="/login" className="font-semibold text-[#5D9C42] underline">Inicia sesión</Link> para calificar y comentar este alojamiento.
                        </p>
                    )}
                </div>

                {/* Comments */}
                <div className="mt-6 border-t border-gray-200 pt-5">
                    {loading ? (
                        <Loader text="Cargando comentarios..."/>
                    ) : error ? (
                        <div className="flex flex-col items-center gap-3 text-center">
                            <p className="text-red-600">{error}</p>
                            <button
                            type="button"
                            onClick={onRetry}
                            className="px-5 py-2 rounded-md bg-[#5D9C42] text-white cursor-pointer hover:bg-[#4c8236]"
                            >
                                Reintentar
                            </button>
                        </div>
                    ) : reviews.length === 0 ? (
                        <p className="text-center text-slate-500">Aún no hay comentarios. ¡Sé el primero!</p>
                    ) : (
                        <ul className="flex flex-col gap-5">
                            {reviews.map((review) => (
                                <li key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                        <StarRating value={review.rating}/>
                                        <span className="font-semibold text-slate-800">{review.userName}</span>
                                        <span className="text-xs text-slate-500">{formatReviewDate(review.createdAt)}</span>
                                    </div>
                                    {review.comment && (
                                        <p className="mt-2 text-sm text-slate-700 leading-relaxed whitespace-pre-line">{review.comment}</p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

            </div>
        </div>
    )
}
