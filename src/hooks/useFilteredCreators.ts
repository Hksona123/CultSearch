import { useMemo } from 'react'
import { useSearchStore } from '@store/useSearchStore'
import { useDebounce } from './useDebounce'
import type { Influencer, PlatformFilter } from '@types'
import { SEARCH_DEBOUNCE_MS } from '@lib/constants'

// Pure filter function defined OUTSIDE component — never recreated on render
function filterCreators(
  creators: Influencer[],
  query: string,
  platform: PlatformFilter
): Influencer[] {
  const normalizedQuery = query.toLowerCase().trim()

  return creators.filter((creator) => {
    // Platform check first — cheaper than string ops
    if (platform !== 'all' && creator.platform !== platform) {
      return false
    }
    // Skip string ops if no query
    if (normalizedQuery === '') return true

    return (
      creator.username.toLowerCase().includes(normalizedQuery) ||
      creator.fullName.toLowerCase().includes(normalizedQuery)
    )
  })
}

export function useFilteredCreators(allCreators: Influencer[]): {
  filtered: Influencer[]
  total: number
  hasResults: boolean
} {
  // Subscribe to only what we need — not entire store
  const query = useSearchStore((s) => s.query)
  const platform = useSearchStore((s) => s.platform)

  // Debounce search query — prevents filtering on every keystroke
  const debouncedQuery = useDebounce(query, SEARCH_DEBOUNCE_MS)

  // Memoize filtered result — only recalculates when inputs actually change
  const filtered = useMemo(
    () => filterCreators(allCreators, debouncedQuery, platform),
    [allCreators, debouncedQuery, platform]
  )

  return {
    filtered,
    total: allCreators.length,
    hasResults: filtered.length > 0,
  }
}

// Separate memoized sort hook for list panel
export function useSortedProfiles<T extends { addedAt: number }>(
  profiles: T[]
): T[] {
  return useMemo(
    () => [...profiles].sort((a, b) => b.addedAt - a.addedAt),
    [profiles]
  )
}
