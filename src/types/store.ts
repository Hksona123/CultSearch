// src/types/store.ts
import type { PlatformFilter, SelectedProfile } from './influencer'

export interface SearchStoreState {
  query: string
  platform: PlatformFilter
  setQuery: (query: string) => void
  setPlatform: (platform: PlatformFilter) => void
  reset: () => void
}

export interface ListStoreState {
  selectedProfiles: SelectedProfile[]
  addProfile: (profile: SelectedProfile) => 'added' | 'duplicate'
  removeProfile: (username: string) => void
  clearAll: () => void
  isSelected: (username: string) => boolean
}
