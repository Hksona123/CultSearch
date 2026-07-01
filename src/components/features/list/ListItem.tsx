import { memo, useCallback } from 'react'
import { X } from 'lucide-react'
import { useListStore } from '@store/useListStore'
import type { SelectedProfile } from '@types'
import { PlatformBadge } from '@components/ui/PlatformBadge'
import { Avatar } from '@components/ui/Avatar'

interface ListItemProps {
  profile: SelectedProfile
}

export const ListItem = memo(function ListItem({ profile }: ListItemProps) {
  // Narrowed subscription — only the action, not any state value
  const removeProfile = useListStore((s) => s.removeProfile)

  // Stable callback — username never changes for this item instance
  const handleRemove = useCallback(() => {
    removeProfile(profile.username)
  }, [profile.username, removeProfile])

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-[#111111] border border-[#1f1f1f] hover:border-[#2a2a2a] group transition-all duration-200">
      <Avatar
        src={profile.avatar}
        alt={profile.fullName}
        name={profile.fullName}
        size="md"
        ringColor="ring-violet-500/20"
      />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-medium truncate">
          {profile.fullName}
        </p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-zinc-500 text-xs truncate">
            @{profile.username}
          </span>
          <PlatformBadge platform={profile.platform} size="xs" />
        </div>
      </div>

      {/* Remove button */}
      <button
        onClick={handleRemove}
        aria-label={`Remove ${profile.fullName} from list`}
        className="flex-shrink-0 p-1.5 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all duration-200 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  )
})
