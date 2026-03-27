import { cn } from '@/lib/utils'

export function Spinner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'w-5 h-5 border-2 border-gray-muted/30 border-t-gold rounded-full animate-spin',
        className,
      )}
    />
  )
}
