import { useEffect, useMemo, useState } from 'react'
import { FontContext } from '../context/FontContext'
import { DEFAULT_FONT } from '../config/appConfig'

const STORAGE_KEY = 'ui-font'

const FontProvider = ({ children }) => {
  const [font, setFont] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved || DEFAULT_FONT
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, font)
    const root = document.documentElement
    root.classList.remove('font-geist', 'font-inter', 'font-poppins', 'font-roboto')
    if (font === 'Inter') root.classList.add('font-inter')
    else if (font === 'Poppins') root.classList.add('font-poppins')
    else if (font === 'Roboto') root.classList.add('font-roboto')
    else root.classList.add('font-geist')
  }, [font])

  const value = useMemo(() => ({ font, setFont }), [font])

  return <FontContext.Provider value={value}>{children}</FontContext.Provider>
}

export default FontProvider
