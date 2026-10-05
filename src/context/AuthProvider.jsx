import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { AuthContext } from './AuthContext'
import { getMe } from '../api/authService'

const TOKEN_KEY = 'token'
const USER_KEY = 'user'

// Reads the saved user; returns null if it is missing or corrupted.
const readStoredUser = () => {
    try {
        return JSON.parse(localStorage.getItem(USER_KEY))
    } catch {
        return null
    }
}

export const AuthProvider = ({ children }) => {

    // Initial state comes straight from localStorage, so after F5 the session exists from the first render
    // (otherwise ProtectedRoute would redirect to /login before the session is restored).
    const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))
    const [user, setUser] = useState(readStoredUser)

    const login = useCallback((newToken, newUser) => {
        localStorage.setItem(TOKEN_KEY, newToken)
        localStorage.setItem(USER_KEY, JSON.stringify(newUser))
        setToken(newToken)
        setUser(newUser)
    }, [])

    const logout = useCallback(() => {
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(USER_KEY)
        setToken(null)
        setUser(null)
    }, [])

    // Checks the saved token against the backend: refreshes the user data, or logs out if it expired.
    useEffect(() => {
        if (!token) return

        let ignore = false

        getMe(token)
            .then((freshUser) => {
                if (ignore) return
                localStorage.setItem(USER_KEY, JSON.stringify(freshUser))
                setUser(freshUser)
            })
            .catch((error) => {
                // Only a 401 ends the session; if the server is down we keep the user logged in.
                if (!ignore && error.status === 401) logout()
            })

        return () => { ignore = true }
    }, [token, logout])

    const value = useMemo(
        () => ({ user, token, isAuthenticated: Boolean(token && user), login, logout }),
        [user, token, login, logout]
    )

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
