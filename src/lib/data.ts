import instagramData from '@assets/data/search/instagram.json'
import youtubeData from '@assets/data/search/youtube.json'
import tiktokData from '@assets/data/search/tiktok.json'
import type { Platform, Influencer, InfluencerProfile } from '@types'

interface RawAccount {
  account: {
    user_profile: {
      user_id: string
      username: string
      fullname: string
      picture: string
      followers: number
      engagement_rate?: number
      posts_count?: number
      is_verified?: boolean
      url?: string
    }
  }
}

interface RawSearchData {
  accounts: RawAccount[]
}

const rawInstagram = instagramData as unknown as RawSearchData
const rawYoutube = youtubeData as unknown as RawSearchData
const rawTiktok = tiktokData as unknown as RawSearchData

function mapRawToInfluencer(raw: RawAccount['account']['user_profile'], platform: Platform): Influencer {
  return {
    id: raw.user_id,
    username: raw.username,
    fullName: raw.fullname,
    platform,
    avatar: raw.picture,
    followers: raw.followers,
    engagementRate: raw.engagement_rate ?? 0,
    posts: raw.posts_count ?? 0,
    verified: raw.is_verified ?? false,
    tags: [],
  }
}

let cachedCreators: Influencer[] | null = null

export function getAllCreators(): Influencer[] {
  if (cachedCreators) return cachedCreators

  const ig = rawInstagram.accounts.map(a => mapRawToInfluencer(a.account.user_profile, 'instagram'))
  const yt = rawYoutube.accounts.map(a => mapRawToInfluencer(a.account.user_profile, 'youtube'))
  const tk = rawTiktok.accounts.map(a => mapRawToInfluencer(a.account.user_profile, 'tiktok'))
  
  cachedCreators = [...ig, ...yt, ...tk]
  return cachedCreators
}

interface RawProfileDetail {
  data: {
    user_profile: RawAccount['account']['user_profile'] & {
      description?: string
      location?: string
      avg_likes?: number
      avg_comments?: number
      avg_views?: number
      engagements?: number
    }
  }
}

const profileModules = import.meta.glob<unknown>(
  '../assets/data/profiles/*.json'
)

// Module-level profile cache — persists for the app session lifetime
const profileCache = new Map<string, InfluencerProfile>()

export async function loadProfileByUsername(
  username: string
): Promise<InfluencerProfile | null> {
  // Return from cache if already loaded
  const cached = profileCache.get(username)
  if (cached) {
    return cached
  }

  const path = `../assets/data/profiles/${username}.json`
  const loader = profileModules[path]

  if (!loader) {
    return null
  }

  const result = await loader()
  const raw = ((result as { default?: unknown }).default ?? result) as RawProfileDetail
  const rawUser = raw.data.user_profile

  const creators = getAllCreators()
  const baseCreator = creators.find(c => c.username === username)
  const platform = baseCreator?.platform ?? 'instagram'

  const profile: InfluencerProfile = {
    ...mapRawToInfluencer(rawUser, platform),
    bio: rawUser.description ?? '',
    location: rawUser.location,
    website: rawUser.url,
    metrics: {
      avgLikes: rawUser.avg_likes ?? 0,
      avgComments: rawUser.avg_comments ?? 0,
      avgViews: rawUser.avg_views,
      impressions: rawUser.engagements,
    }
  }

  profileCache.set(username, profile)
  return profile
}

// Fire-and-forget preload on card hover — data is cached before user clicks
export function preloadProfile(username: string): void {
  void loadProfileByUsername(username)
}
