import { memo } from 'react'
import type { Influencer } from '@types'
import { CreatorCard } from './CreatorCard'
import { CreatorCardSkeleton } from '@components/ui/Skeleton'
import { useSearchStore } from '@store/useSearchStore'

interface CreatorGridProps {
  profiles: Influencer[]
  isLoading?: boolean
}

// Static array for skeletons — defined outside, never recreated
const SKELETON_KEYS = [0, 1, 2, 3, 4, 5] as const

export const CreatorGrid = memo(function CreatorGrid({
  profiles,
  isLoading = false,
}: CreatorGridProps) {
  // Narrowed subscription — only re-renders when query changes
  const query = useSearchStore((state) => state.query)

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SKELETON_KEYS.map((i) => (
          <CreatorCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="w-full animate-fade-in">
      {profiles.length === 0 && (
        <div className="text-center py-24 bg-white dark:bg-[#111111] border border-[#e4e4e7] dark:border-[#1f1f1f] rounded-2xl shadow-sm dark:shadow-none">
          <p className="text-lg font-medium text-zinc-600 dark:text-zinc-400">No profiles found</p>
          {query && (
            <p className="text-zinc-500 dark:text-zinc-600 mt-2">Try adjusting your search for &quot;{query}&quot;</p>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <CreatorCard
            key={profile.username}  // stable unique key — not index
            profile={profile}
            platform={profile.platform}
          />
        ))}
      </div>
    </div>
  )
})
