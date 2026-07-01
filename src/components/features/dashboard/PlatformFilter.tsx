import { memo, useCallback } from 'react'
import { PLATFORMS, PLATFORM_CONFIG } from '@lib/constants'
import type { PlatformFilter as PlatformFilterType } from '@types'
import { SearchBar } from './SearchBar'
import { useSearchStore } from '@store/useSearchStore'

// Static label map — defined outside component, never recreated
const PLATFORM_LABELS: Record<string, string> = {
  all: 'All',
  instagram: PLATFORM_CONFIG.instagram.label,
  youtube: PLATFORM_CONFIG.youtube.label,
  tiktok: PLATFORM_CONFIG.tiktok.label,
}

export const PlatformFilter = memo(function PlatformFilter() {
  // Narrowed subscriptions — separate selectors prevent unnecessary re-renders
  const selected = useSearchStore((state) => state.platform)
  const setPlatform = useSearchStore((state) => state.setPlatform)
  const setQuery = useSearchStore((state) => state.setQuery)

  const handlePlatformClick = useCallback((p: PlatformFilterType) => {
    setPlatform(p)
    setQuery('')
  }, [setPlatform, setQuery])

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
      <div className="flex gap-2 p-1 bg-white dark:bg-[#18181b] border border-[#e4e4e7] dark:border-[#27272a] rounded-xl shadow-sm dark:shadow-none">
        {PLATFORMS.map((p: PlatformFilterType) => (
          <button
            key={p}
            type="button"
            onClick={() => { handlePlatformClick(p); }}
            className={`px-5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              selected === p
                ? 'bg-gradient-to-r from-[#7c3aed] to-[#a855f7] text-white shadow-md shadow-[#7c3aed]/20'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-[#27272a]'
            }`}
          >
            {PLATFORM_LABELS[p]}
          </button>
        ))}
      </div>

      <div className="w-full md:w-[320px]">
        <SearchBar className="w-full" />
      </div>
    </div>
  )
})
