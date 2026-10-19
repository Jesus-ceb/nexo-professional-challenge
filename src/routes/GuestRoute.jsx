import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Wraps pages only for guests (/login, /register); a logged-in user is sent to the home page.
export const GuestRoute = ({ children }) => {
    const { isAuthenticated } = useAuth()

    if (isAuthenticated) {
        return <Navigate to="/" replace />
    }

    return children
}
