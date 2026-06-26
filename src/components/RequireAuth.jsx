import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Gates the private portal. Redirects to login if signed out.
export default function RequireAuth({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-brand-950">
        <div className="flex flex-col items-center gap-3 text-brand-300">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-brand-600 border-t-accent" />
          <p className="text-sm">Checking access…</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/portal/login" state={{ from: location }} replace />
  }

  return children
}
