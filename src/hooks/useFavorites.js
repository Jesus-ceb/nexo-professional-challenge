import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { addFavorite, getFavoriteIds, removeFavorite } from "../api/favoriteService"

const NO_FAVORITES = new Set()
const ERROR_MS = 3000

// Favorites of the logged-in user, shared by the Home cards and the product detail.
// The heart changes at once and goes back if the backend fails; a guest is sent to /login.
export const useFavorites = () => {

    const { token, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    const [favoriteIds, setFavoriteIds] = useState(NO_FAVORITES)
    const [error, setError] = useState(null)
    const errorTimer = useRef(null)

    useEffect(() => {
        if (!isAuthenticated) return

        let ignore = false
        getFavoriteIds(token)
        .then((ids) => {
            if (!ignore) setFavoriteIds(new Set(ids))
        })
        .catch((err) => console.error("ERROR:", err))

        return () => { ignore = true }
    }, [isAuthenticated, token])

    useEffect(() => () => clearTimeout(errorTimer.current), [])

    // After logout the old ids are kept in state but no longer shown.
    const visibleIds = isAuthenticated ? favoriteIds : NO_FAVORITES

    const setFavorite = (productId, favorite) => {
        setFavoriteIds((prev) => {
            const next = new Set(prev)
            if (favorite) next.add(productId)
            else next.delete(productId)
            return next
        })
    }

    const toggleFavorite = (productId) => {
        if (!isAuthenticated) {
            navigate('/login')
            return
        }

        const wasFavorite = favoriteIds.has(productId)
        setFavorite(productId, !wasFavorite)

        const request = wasFavorite ? removeFavorite : addFavorite
        request(productId, token).catch(() => {
            setFavorite(productId, wasFavorite)
            setError('No se pudo actualizar tus favoritos. Inténtalo de nuevo.')
            clearTimeout(errorTimer.current)
            errorTimer.current = setTimeout(() => setError(null), ERROR_MS)
        })
    }

    return { isFavorite: (productId) => visibleIds.has(productId), toggleFavorite, error }
}
