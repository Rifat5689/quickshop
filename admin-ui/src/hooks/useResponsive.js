import { useEffect, useMemo, useState } from 'react'

const getSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
})

const useResponsive = () => {
  const [size, setSize] = useState(getSize)

  useEffect(() => {
    const handleResize = () => setSize(getSize())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return useMemo(
    () => ({
      isMobile: size.width < 768,
      isTablet: size.width >= 768 && size.width < 1024,
      isDesktop: size.width >= 1024,
    }),
    [size]
  )
}

export default useResponsive
