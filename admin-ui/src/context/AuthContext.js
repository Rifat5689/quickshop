import { createContext } from 'react'

export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  isReady: false,
  login: () => {},
  logout: () => {},
})
