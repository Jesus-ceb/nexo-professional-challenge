import { useEffect, useState } from 'react'
import { resendConfirmationEmail } from '../../api/authService'
import { useAuth } from '../../context/AuthContext'

// Same wait the backend enforces between two confirmation emails.
const COOLDOWN_SECONDS = 60

// Resends the registration confirmation email to the logged-in user, with a countdown between attempts.
export const ResendEmailButton = ({ startWithCooldown = false }) => {

    const { token } = useAuth()

    const [sending, setSending] = useState(false)
    const [cooldown, setCooldown] = useState(startWithCooldown ? COOLDOWN_SECONDS : 0)
    const [message, setMessage] = useState(null) // { type: 'success' | 'error', text }

    // countdown: one second less each tick until it reaches 0
    useEffect(() => {
        if (cooldown <= 0) return
        const timer = setTimeout(() => setCooldown((seconds) => seconds - 1), 1000)
        return () => clearTimeout(timer)
    }, [cooldown])

    const handleResend = async () => {
        setSending(true)
        setMessage(null)
        try {
            const data = await resendConfirmationEmail(token)
            setMessage({ type: 'success', text: data.message })
            setCooldown(COOLDOWN_SECONDS)
        } catch (err) {
            setMessage({ type: 'error', text: err.message })
        } finally {
            setSending(false)
        }
    }

    const disabled = sending || cooldown > 0

    return (
        <div className="flex flex-col items-center gap-2 w-full">
            <button
            type="button"
            onClick={handleResend}
            disabled={disabled}
            className="w-full rounded-lg p-2 border border-[#5D9C42] text-[#5D9C42] font-semibold cursor-pointer transition-all duration-300 hover:bg-[#5D9C42] hover:text-white disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#5D9C42]"
            >
                {sending ? 'Enviando...' : cooldown > 0 ? `Reenviar correo en ${cooldown} s` : 'Reenviar correo'}
            </button>

            {message && (
                <p className={`text-sm text-center ${message.type === 'success' ? 'text-[#5D9C42]' : 'text-red-500'}`}>
                    {message.text}
                </p>
            )}
        </div>
    )
}
