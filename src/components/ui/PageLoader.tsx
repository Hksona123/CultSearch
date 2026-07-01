import { CreatorCardSkeleton } from './Skeleton'

// Static array defined outside component — stable reference
const SKELETON_TABS = [0, 1, 2, 3] as const
const SKELETON_CARDS = [0, 1, 2, 3, 4, 5] as const

export function PageLoader() {
  return (
    <main className="max-w-7xl mx-auto px-4 pt-24 pb-12">
      {/* Header skeleton */}
      <div className="mb-8 space-y-3">
        <div className="h-10 w-52 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
        <div className="h-4 w-80 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
      </div>

      {/* Filter bar skeleton */}
      <div className="flex gap-2 mb-6">
        {SKELETON_TABS.map((i) => (
          <div
            key={i}
            className="h-9 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-full animate-pulse"
            style={{ animationDelay: `${(i * 80).toString()}ms` }}
          />
        ))}
        {/* Search skeleton */}
        <div className="h-9 flex-1 bg-zinc-200 dark:bg-zinc-800 rounded-xl animate-pulse ml-auto max-w-xs" />
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SKELETON_CARDS.map((i) => (
          <CreatorCardSkeleton key={i} />
        ))}
      </div>
    </main>
  )
}
