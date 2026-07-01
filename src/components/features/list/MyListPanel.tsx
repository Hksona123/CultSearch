import { memo, useCallback, useEffect } from 'react'
import { X, Trash2, Users, ArrowRight } from 'lucide-react'
import { useListStore } from '@store/useListStore'
import { ListItem } from './ListItem'
import { cn } from '@lib/utils'
import { useNavigate } from 'react-router-dom'
import { useSortedProfiles } from '@hooks/useFilteredCreators'

interface MyListPanelProps {
  isOpen: boolean
  onClose: () => void
}

export const MyListPanel = memo(function MyListPanel({
  isOpen,
  onClose,
}: MyListPanelProps) {
  // Narrowed subscriptions — separate selectors
  const selectedProfiles = useListStore((s) => s.selectedProfiles)
  const clearAll = useListStore((s) => s.clearAll)
  const navigate = useNavigate()

  // Memoized sort via dedicated hook — doesn't re-sort unless profiles change
  const sortedProfiles = useSortedProfiles(selectedProfiles)

  // Stable callback — won't recreate unless deps change
  const handleClearAll = useCallback(() => {
    if (selectedProfiles.length === 0) return
    if (window.confirm('Clear all profiles from your list?')) {
      clearAll()
    }
  }, [selectedProfiles.length, clearAll])

  const handleBrowseClick = useCallback(() => {
    void navigate('/')
    onClose()
  }, [navigate, onClose])

  // Keyboard escape handler
  useEffect(() => {
    if (!isOpen) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => { document.removeEventListener('keydown', handleKeyDown); }
  }, [isOpen, onClose])

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-40 bg-black/60 backdrop-blur-sm',
          'transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="My List panel"
        className={cn(
          'fixed right-0 top-0 h-full w-full max-w-[400px] z-50',
          'bg-[#0d0d0d] border-l border-[#1f1f1f]',
          'flex flex-col transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1f1f1f]">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-violet-400" />
            <h2 className="text-white font-semibold text-base">My List</h2>
            {selectedProfiles.length > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-violet-500/20 text-violet-400 border border-violet-500/30">
                {selectedProfiles.length}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {selectedProfiles.length > 0 && (
              <button
                onClick={handleClearAll}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
              >
                <Trash2 className="w-3 h-3" />
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Close panel"
              className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {selectedProfiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <Users className="w-7 h-7 text-zinc-600" />
              </div>
              <div>
                <p className="text-white font-medium mb-1">No creators added yet</p>
                <p className="text-zinc-500 text-sm">
                  Browse creators and click &quot;Add to List&quot; to build your collection
                </p>
              </div>
              <button
                onClick={handleBrowseClick}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-all duration-200"
              >
                Browse Creators
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <ul className="p-4 flex flex-col gap-2">
              {sortedProfiles.map((profile, index) => (
                <li
                  key={profile.username}  // stable key
                  style={{ animationDelay: `${(index * 50).toString()}ms` }}
                  className="animate-in slide-in-from-right-4 duration-300"
                >
                  <ListItem profile={profile} />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {selectedProfiles.length > 0 && (
          <div className="px-5 py-4 border-t border-[#1f1f1f]">
            <p className="text-zinc-500 text-xs text-center">
              {selectedProfiles.length} creator{selectedProfiles.length !== 1 ? 's' : ''} selected
              · Saved automatically
            </p>
          </div>
        )}
      </aside>
    </>
  )
})
