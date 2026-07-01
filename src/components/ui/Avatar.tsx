import { useState, useCallback, memo } from 'react'
import { useInView } from 'react-intersection-observer'
import { getAvatarFallback, cn } from '@lib/utils'

interface AvatarProps {
  src: string
  alt: string
  name: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  ringColor?: string
}

// Defined outside component — stable reference, never recreated
const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-24 h-24 md:w-32 md:h-32',
} as const

export const Avatar = memo(function Avatar({
  src,
  alt,
  name,
  size = 'md',
  className,
  ringColor = 'ring-violet-500/20',
}: AvatarProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [loaded, setLoaded] = useState(false)

  // Load image when it scrolls into view (100px before visible)
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '100px',
  })

  const handleError = useCallback(() => {
    setImgSrc(getAvatarFallback(name))
  }, [name])

  const handleLoad = useCallback(() => {
    setLoaded(true)
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        'relative flex-shrink-0 rounded-full overflow-hidden',
        `ring-2 ${ringColor}`,
        sizeClasses[size],
        className
      )}
    >
      {/* Placeholder shown while loading */}
      {!loaded && (
        <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-full" />
      )}

      {/* Only render img when in viewport */}
      {inView && (
        <img
          src={imgSrc}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={handleError}
          onLoad={handleLoad}
          className={cn(
            'w-full h-full object-cover rounded-full',
            'transition-opacity duration-300',
            loaded ? 'opacity-100' : 'opacity-0'
          )}
        />
      )}
    </div>
  )
})
