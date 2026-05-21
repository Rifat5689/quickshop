import { useCallback, useEffect, useMemo, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import authService from '../features/auth/services/authService'

const STORAGE_USER = 'auth-user'

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem(STORAGE_USER)
    return savedUser ? JSON.parse(savedUser) : null
  })
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const hydrate = async () => {
      try {
        const me = await authService.me()
        if (me) {
          setUser(me)
          localStorage.setItem(STORAGE_USER, JSON.stringify(me))
        }
      } catch {
        // ignore for unauthenticated sessions
      } finally {
        setIsReady(true)
      }
    }

    hydrate()
  }, [])

  const login = useCallback((nextUser) => {
    setUser(nextUser)
    localStorage.setItem(STORAGE_USER, JSON.stringify(nextUser))
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem(STORAGE_USER)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isReady,
      login,
      logout,
    }),
    [user, isReady, login, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
