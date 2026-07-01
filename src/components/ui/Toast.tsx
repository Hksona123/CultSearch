import { useEffect, useState } from 'react'
import { cn } from '@lib/utils'

interface ToastProps {
  message: string
  type: 'success' | 'warning' | 'error'
  onClose: () => void
  duration?: number
}

export function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const rafId = requestAnimationFrame(() => { setVisible(true) })
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(() => { onClose() }, 300)
    }, duration)
    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(timer)
    }
  }, [duration, onClose])

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        'fixed bottom-6 right-6 z-[100] flex items-center gap-3',
        'px-4 py-3 rounded-xl border text-sm font-medium',
        'shadow-2xl transition-all duration-300',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        type === 'success' && 'bg-emerald-950 border-emerald-500/30 text-emerald-400',
        type === 'warning' && 'bg-yellow-950 border-yellow-500/30 text-yellow-400',
        type === 'error'   && 'bg-red-950 border-red-500/30 text-red-400',
      )}
    >
      {type === 'success' && <span>✓</span>}
      {type === 'warning' && <span>⚠</span>}
      {type === 'error'   && <span>✕</span>}
      {message}
    </div>
  )
}
