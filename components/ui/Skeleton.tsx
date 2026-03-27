import { cn } from '@/lib/utils'
import { Card } from './Card'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-slate border border-gray-muted/10',
        className,
      )}
    />
  )
}

export function SkeletonCard() {
  return (
    <Card className="p-5">
      <Skeleton className="h-3 w-24 mb-4" />
      <Skeleton className="h-8 w-32 mb-2" />
      <Skeleton className="h-3 w-16" />
    </Card>
  )
}
