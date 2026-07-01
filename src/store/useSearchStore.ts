import { create } from 'zustand'
import type { PlatformFilter } from '@types'

interface SearchState {
  query: string
  platform: PlatformFilter
  setQuery: (query: string) => void
  setPlatform: (platform: PlatformFilter) => void
  reset: () => void
}

export const useSearchStore = create<SearchState>((set) => ({
  query: '',
  platform: 'all',
  setQuery: (query) => { set({ query }) },
  setPlatform: (platform) => { set({ platform }) },
  reset: () => { set({ query: '', platform: 'all' }) },
}))
