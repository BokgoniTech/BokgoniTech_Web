import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Scrolls to top on every route change (default browser behaviour is to keep position).
export default function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])
  return null
}
