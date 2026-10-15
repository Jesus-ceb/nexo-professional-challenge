import { createContext, useContext } from 'react'

// Global favorites state: { favoriteIds, isFavorite, toggleFavorite }.
// The provider lives in FavoritesProvider.jsx (kept apart so Vite fast refresh works).
// Being global, a heart marked in one place (Home, detail, "Mis viajes") updates everywhere at once.
export const FavoritesContext = createContext(null)

export const useFavorites = () => useContext(FavoritesContext)
