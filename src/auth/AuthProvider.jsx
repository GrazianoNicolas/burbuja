import { useCallback, useMemo, useState } from 'react'
import { AuthContext } from './useAuth.js'
import * as authService from './authService.js'

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getCurrentUser())

  const signIn = useCallback(async (email, password) => {
    const u = await authService.signIn(email, password)
    setUser(u)
    return u
  }, [])

  const signUp = useCallback(async (data) => {
    const u = await authService.signUp(data)
    setUser(u)
    return u
  }, [])

  const signOut = useCallback(async () => {
    await authService.signOut()
    setUser(null)
  }, [])

  const value = useMemo(() => ({ user, signIn, signUp, signOut }), [user, signIn, signUp, signOut])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
