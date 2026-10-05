import { createContext, useContext } from 'react'

// Global session state: { user, token, isAuthenticated, login, logout }.
// The provider lives in AuthProvider.jsx (kept apart so Vite fast refresh works).
export const AuthContext = createContext(null)

// Shortcut so components can write useAuth() instead of useContext(AuthContext).
export const useAuth = () => useContext(AuthContext)
