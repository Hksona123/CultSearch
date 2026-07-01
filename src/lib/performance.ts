// Lightweight dev-only performance tracking — zero cost in production

export function measureRender(componentName: string): () => void {
  if (import.meta.env.MODE !== 'development') {
    return () => undefined
  }

  const start = performance.now()

  return () => {
    const duration = performance.now() - start
    if (duration > 16) {
      // Flag renders slower than one frame (16ms @ 60fps)
      console.warn(
        `[Perf] ${componentName} took ${duration.toFixed(2)}ms to render`
      )
    }
  }
}

export function markDataLoad(label: string): void {
  if (import.meta.env.MODE === 'development') {
    performance.mark(label)
  }
}
