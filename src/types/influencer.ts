// src/types/influencer.ts

export type Platform = 'instagram' | 'youtube' | 'tiktok'

export type PlatformFilter = Platform | 'all'

// Matches shape in src/assets/data/search/ JSON files
export interface Influencer {
  id: string
  username: string
  fullName: string
  platform: Platform
  avatar: string
  followers: number
  engagementRate: number
  posts: number
  verified?: boolean
  tags?: string[]
}

// Matches shape in src/assets/data/profiles/ JSON files
export interface InfluencerProfile extends Influencer {
  bio: string
  location?: string
  website?: string
  email?: string
  recentPosts?: Post[]
  metrics?: ProfileMetrics
}

export interface Post {
  id: string
  imageUrl: string
  caption?: string
  likes: number
  comments: number
  createdAt: string
}

export interface ProfileMetrics {
  avgLikes: number
  avgComments: number
  avgViews?: number
  reachRate?: number
  impressions?: number
}

// For the selected list
export interface SelectedProfile {
  id: string
  username: string
  fullName: string
  platform: Platform
  avatar: string
  addedAt: number
}

// API/data loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export interface AsyncState<T> {
  data: T | null
  status: LoadingState
  error: string | null
}
