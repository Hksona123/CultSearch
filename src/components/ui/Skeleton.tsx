import { cn } from '@lib/utils'
import type { BaseProps } from '@types'

interface SkeletonProps extends BaseProps {
  width?: string
  height?: string
}

export function Skeleton({ 
  className, 
  width, 
  height 
}: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-zinc-800 rounded-lg',
        className
      )}
      style={{ width, height }}
      aria-hidden="true"
    />
  )
}

export function CreatorCardSkeleton() {
  return (
    <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-4 space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <Skeleton className="h-10 rounded-lg" />
        <Skeleton className="h-10 rounded-lg" />
        <Skeleton className="h-10 rounded-lg" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-8 flex-1 rounded-lg" />
        <Skeleton className="h-8 flex-1 rounded-lg" />
      </div>
    </div>
  )
}
