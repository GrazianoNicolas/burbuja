import { Navigate, useLocation } from 'react-router'
import { useAuth } from './useAuth.js'

// Envuelve las páginas privadas: si no hay sesión, manda al login.
export default function RequireAuth({ children }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  return children
}
