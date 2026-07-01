import { useEffect, useRef, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Reset to invisible+shifted state
    el.style.opacity = '0'
    el.style.transform = 'translateY(8px)'

    // Use rAF to ensure browser has applied the reset before animating
    const raf = requestAnimationFrame(() => {
      el.style.transition = 'opacity 240ms ease, transform 240ms ease'
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
    })

    return () => { cancelAnimationFrame(raf); }
  }, [location.pathname])

  return <div ref={ref}>{children}</div>
}
