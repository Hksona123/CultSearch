// src/lib/constants.ts
import type { Platform, PlatformFilter } from '@/types'

export const PLATFORMS: PlatformFilter[] = [
  'all',
  'instagram', 
  'youtube', 
  'tiktok',
]

export const PLATFORM_CONFIG: Record<Platform, {
  label: string
  color: string
  bgClass: string
  textClass: string
  borderClass: string
  dotClass: string
}> = {
  instagram: {
    label: 'Instagram',
    color: '#ec4899',
    bgClass: 'bg-pink-500/10',
    textClass: 'text-pink-400',
    borderClass: 'border-pink-500/20',
    dotClass: 'bg-pink-400',
  },
  youtube: {
    label: 'YouTube',
    color: '#ef4444',
    bgClass: 'bg-red-500/10',
    textClass: 'text-red-400',
    borderClass: 'border-red-500/20',
    dotClass: 'bg-red-400',
  },
  tiktok: {
    label: 'TikTok',
    color: '#06b6d4',
    bgClass: 'bg-cyan-500/10',
    textClass: 'text-cyan-400',
    borderClass: 'border-cyan-500/20',
    dotClass: 'bg-cyan-400',
  },
}

export const ROUTES = {
  DASHBOARD: '/',
  PROFILE: (username: string) => `/profile/${username}`,
} as const

export const LIST_STORAGE_KEY = 'wobb-selected-profiles' as const

export const SEARCH_DEBOUNCE_MS = 300 as const

export const MAX_LIST_SIZE = 50 as const
