import { Check, Plus, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useListStore } from '@store/useListStore'
import type { SelectedProfile } from '@types'
import { cn } from '@lib/utils'
import { useToast } from '@hooks/useToast'
import { Toast } from '@components/ui/Toast'

interface AddToListButtonProps {
  profile: SelectedProfile
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

// Size classes defined outside component — stable reference
const sizeClasses = {
  sm: 'px-2 py-1 text-xs gap-1',
  md: 'px-3 py-1.5 text-sm gap-1.5',
  lg: 'px-4 py-2 text-base gap-2',
} as const

export function AddToListButton({
  profile,
  size = 'md',
  className,
}: AddToListButtonProps) {
  const addProfile = useListStore((s) => s.addProfile)
  const removeProfile = useListStore((s) => s.removeProfile)
  const isSelected = useListStore((s) => s.isSelected)
  const [loading, setLoading] = useState(false)
  const { toast, showToast, hideToast } = useToast()

  const selected = isSelected(profile.username)

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setLoading(true)
    // Small delay for micro-interaction feel
    void new Promise<void>((resolve) => { setTimeout(resolve, 300) }).then(() => {
      if (selected) {
        removeProfile(profile.username)
        showToast(`${profile.fullName} removed from your list`, 'warning')
      } else {
        const result = addProfile(profile)
        if (result === 'duplicate') {
          showToast(`${profile.fullName} is already in your list`, 'warning')
        } else {
          showToast(`${profile.fullName} added to your list`, 'success')
        }
      }
      setLoading(false)
    })
  }

  return (
    <>
      <button
        onClick={handleClick}
        disabled={loading}
        aria-label={selected ? 'Remove from list' : 'Add to list'}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium',
          'transition-all duration-200 focus-visible:outline-none',
          'focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2',
          'focus-visible:ring-offset-[#080808] disabled:opacity-60 disabled:cursor-not-allowed',
          sizeClasses[size],
          selected
            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400'
            : 'bg-violet-600 hover:bg-violet-500 text-white border border-violet-500',
          className
        )}
      >
        {loading ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : selected ? (
          <>
            <Check className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Added</span>
          </>
        ) : (
          <>
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add to List</span>
          </>
        )}
      </button>
      {toast && (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </>
  )
}
