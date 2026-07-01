import { cn } from '@lib/utils'
import type { Platform } from '@types'

interface PlatformBadgeProps {
  platform: Platform
  size?: 'xs' | 'sm' | 'md'
}

const platformConfig: Record<Platform, { label: string; className: string; dot: string }> = {
  instagram: {
    label: 'Instagram',
    className: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
    dot: 'bg-pink-400',
  },
  youtube: {
    label: 'YouTube',
    className: 'bg-red-500/10 text-red-400 border-red-500/20',
    dot: 'bg-red-400',
  },
  tiktok: {
    label: 'TikTok',
    className: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    dot: 'bg-cyan-400',
  },
}

export function PlatformBadge({ platform, size = 'sm' }: PlatformBadgeProps) {
  // platformConfig is exhaustively typed — no null check needed
  const config = platformConfig[platform]

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border font-medium',
        size === 'xs' && 'px-1.5 py-0.5 text-[10px]',
        size === 'sm' && 'px-2 py-0.5 text-xs',
        size === 'md' && 'px-2.5 py-1 text-sm',
        config.className
      )}
    >
      <span className={cn('rounded-full', config.dot, size === 'xs' ? 'w-1 h-1' : 'w-1.5 h-1.5')} />
      {config.label}
    </span>
  )
}
