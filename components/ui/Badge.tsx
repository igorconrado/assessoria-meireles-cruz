import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'gold' | 'sage' | 'coral' | 'muted' | 'new'
  className?: string
}

export function Badge({
  children,
  variant = 'muted',
  className,
}: BadgeProps) {
  const variants = {
    gold: 'bg-gold/15 text-gold border border-gold/30',
    sage: 'bg-sage/15 text-sage border border-sage/30',
    coral: 'bg-coral/15 text-coral border border-coral/30',
    muted: 'bg-gray-muted/10 text-gray-muted border border-gray-muted/20',
    new: 'bg-gold/20 text-gold border border-gold/40 animate-pulse',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-body font-medium',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
