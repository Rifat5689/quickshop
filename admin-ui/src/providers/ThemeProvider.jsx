import { useEffect, useMemo, useState } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { DEFAULT_THEME } from '../config/appConfig'

const STORAGE_KEY = 'ui-theme'

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved || DEFAULT_THEME
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme)
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const value = useMemo(() => ({ theme, setTheme }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
