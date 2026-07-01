import { memo, useCallback, useState, useEffect } from 'react'
import { useSearchStore } from '@store/useSearchStore'
import { useDebounce } from '@hooks/useDebounce'
import { SEARCH_DEBOUNCE_MS } from '@lib/constants'

interface SearchBarProps {
  placeholder?: string
  className?: string
}

export const SearchBar = memo(function SearchBar({
  placeholder = 'Search creators...',
  className = '',
}: SearchBarProps) {
  // Local state for immediate input feedback (no lag)
  const [localValue, setLocalValue] = useState('')
  // Only subscribe to setter — prevents re-render on query changes from other sources
  const setQuery = useSearchStore((s) => s.setQuery)

  // Debounced value — delays store update by 300ms
  const debouncedValue = useDebounce(localValue, SEARCH_DEBOUNCE_MS)

  // Sync debounced value to Zustand — this triggers filter recompute
  useEffect(() => {
    setQuery(debouncedValue)
  }, [debouncedValue, setQuery])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value)
  }, [])

  const handleClear = useCallback(() => {
    setLocalValue('')
    setQuery('')
  }, [setQuery])

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400 dark:text-zinc-500">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
      <input
        type="search"
        aria-label="Search creators by name or username"
        className="w-full bg-white dark:bg-[#18181b] border border-[#e4e4e7] dark:border-[#27272a] text-[#09090b] dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-500 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/50 focus:border-[#7c3aed] transition-all pl-10 pr-9 py-2.5 shadow-sm dark:shadow-none"
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {localValue && (
        <button
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  )
})
