import { memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Platform, Influencer } from '@types'
import { Badge } from '@components/ui/Badge'
import { Avatar } from '@components/ui/Avatar'
import { formatEngagement, formatFollowers } from '@lib/utils'
import { AddToListButton } from '@components/features/list/AddToListButton'
import { preloadProfile } from '@lib/data'

interface CreatorCardProps {
  profile: Influencer
  platform: Platform
  onProfileClick?: (username: string) => void
}

// Static map defined outside — never recreated on render
const platformColors: Record<string, string> = {
  instagram: 'from-pink-500 to-rose-500',
  youtube: 'from-red-500 to-red-600',
  tiktok: 'from-cyan-400 to-blue-500',
  unknown: 'from-gray-500 to-gray-600',
}

export const CreatorCard = memo(function CreatorCard({
  profile,
  platform,
  onProfileClick,
}: CreatorCardProps) {
  const navigate = useNavigate()

  // Stable callbacks — won't cause child re-renders
  const handleClick = useCallback(() => {
    if (onProfileClick) onProfileClick(profile.username)
    void navigate(`/profile/${profile.username}?platform=${platform}`)
  }, [profile.username, platform, navigate, onProfileClick])

  // Preload profile JSON on hover — data cached before user clicks
  const handleMouseEnter = useCallback(() => {
    preloadProfile(profile.username)
  }, [profile.username])

  const handleViewProfile = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    handleClick()
  }, [handleClick])

  return (
    <article
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      className="glass-card p-5 cursor-pointer group flex flex-col h-full relative overflow-hidden min-h-[200px]"
    >
      {/* Decorative gradient blob on hover */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#7c3aed] opacity-0 group-hover:opacity-10 blur-3xl rounded-full transition-opacity duration-500 pointer-events-none" />

      {/* Top Row: Avatar + Info */}
      <div className="flex justify-between items-start mb-5">
        <div className="flex gap-4 items-center">
          <Avatar
            src={profile.avatar}
            alt={profile.username}
            name={profile.fullName}
            size="lg"
            ringColor="ring-transparent group-hover:ring-[#7c3aed]/40"
          />
          <div>
            <div className="font-semibold text-[#09090b] dark:text-zinc-100 flex items-center gap-1.5">
              {profile.fullName}
              <Badge verified={profile.verified} />
            </div>
            <div className="text-sm text-zinc-500">@{profile.username}</div>
          </div>
        </div>

        {/* Platform Badge */}
        <span className={`text-[10px] font-bold uppercase tracking-wider text-white px-2 py-1 rounded-full bg-gradient-to-r ${platformColors[platform] || platformColors.unknown || ''}`}>
          {platform}
        </span>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-2 mb-6 bg-[#f4f4f5] dark:bg-[#0a0a0a] rounded-lg p-3 border border-[#e4e4e7] dark:border-[#1f1f1f]">
        <div className="flex flex-col">
          <span className="text-xs text-zinc-500 dark:text-zinc-600 font-medium uppercase tracking-wider mb-0.5">Followers</span>
          <span className="text-sm font-semibold text-[#09090b] dark:text-zinc-200">{formatFollowers(profile.followers)}</span>
        </div>
        <div className="flex flex-col border-l border-[#e4e4e7] dark:border-[#1f1f1f] pl-3">
          <span className="text-xs text-zinc-500 dark:text-zinc-600 font-medium uppercase tracking-wider mb-0.5">Eng. Rate</span>
          <span className="text-sm font-semibold text-[#09090b] dark:text-zinc-200">
            {profile.engagementRate ? formatEngagement(profile.engagementRate) : 'N/A'}
          </span>
        </div>
        <div className="flex flex-col border-l border-[#e4e4e7] dark:border-[#1f1f1f] pl-3">
          <span className="text-xs text-zinc-500 dark:text-zinc-600 font-medium uppercase tracking-wider mb-0.5">Posts</span>
          <span className="text-sm font-semibold text-[#09090b] dark:text-zinc-200">
            {profile.posts ? formatFollowers(profile.posts) : 'N/A'}
          </span>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Actions */}
      <div className="flex gap-3 mt-auto">
        <button
          className="flex-1 btn-secondary text-sm py-2"
          onClick={handleViewProfile}
        >
          View Profile
        </button>
        <AddToListButton
          profile={{
            ...profile,
            platform,
            addedAt: 0,
          }}
          className="flex-1"
        />
      </div>
    </article>
  )
})
