import { PageWrapper as Layout } from '@components/layout/PageWrapper'
import { PlatformFilter } from '@components/features/dashboard/PlatformFilter'
import { CreatorGrid } from '@components/features/dashboard/CreatorGrid'
import { getAllCreators } from '@lib/data'
import { useSearchStore } from '@store/useSearchStore'
import { useFilteredCreators } from '@hooks/useFilteredCreators'

// Stable reference — never recreated across renders
const ALL_CREATORS = getAllCreators()

export function Dashboard() {
  // Narrowed Zustand subscriptions — separate selectors
  const platform = useSearchStore((state) => state.platform)
  const query = useSearchStore((state) => state.query)

  // useFilteredCreators is fully memoized — only recalculates on actual changes
  const { filtered, total } = useFilteredCreators(ALL_CREATORS)

  return (
    <Layout>
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#09090b] dark:text-zinc-100 mb-3">
          Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#06b6d4]">Creators</span>
        </h1>
        <p className="text-zinc-500 text-lg max-w-2xl">
          Find and curate top talent across multiple platforms to supercharge your next marketing campaign.
        </p>
      </div>

      {/* PlatformFilter reads/writes Zustand directly — no props needed */}
      <PlatformFilter />

      <div className="mb-4 text-xs font-medium uppercase tracking-wider text-zinc-500 flex items-center justify-between">
        <span>
          {query
            ? `${filtered.length.toString()} results for "${query}"`
            : `Showing ${filtered.length.toString()} of ${total.toString()} creators`}
        </span>
        <span className="bg-[#e4e4e7] dark:bg-[#1f1f1f] px-2 py-1 rounded text-zinc-600 dark:text-zinc-400 capitalize">
          Platform: {platform}
        </span>
      </div>

      <CreatorGrid profiles={filtered} />
    </Layout>
  )
}
