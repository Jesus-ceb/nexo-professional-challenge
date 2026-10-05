import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Wraps the admin panel: guests go to /login and logged-in users without the ADMIN role go home.
// This only hides the UI; the backend is what actually blocks administrative actions (403).
export const AdminRoute = ({ children }) => {
    const { isAuthenticated, user } = useAuth()

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    if (user.role !== 'ADMIN') {
        return <Navigate to="/" replace />
    }

    return children
}
