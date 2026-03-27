import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  theme?: 'dark' | 'light'
  onClick?: () => void
}

export function Card({
  children,
  className,
  hover = false,
  theme = 'dark',
  onClick,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-xl border transition-all duration-300 ease-expo-out',
        theme === 'dark'
          ? 'bg-slate border-gray-muted/10 shadow-card-dark'
          : 'bg-white border-navy/10 shadow-card-light',
        hover &&
          'cursor-pointer hover:-translate-y-0.5 hover:shadow-card-hover hover:border-gold/20',
        onClick && 'cursor-pointer',
        className,
      )}
    >
      {children}
    </div>
  )
}

interface CardStatProps {
  label: string
  value: string
  sub?: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
}

export function CardStat({
  label,
  value,
  sub,
  trend,
  trendValue,
}: CardStatProps) {
  return (
    <Card hover className="p-5">
      <p className="text-xs font-body font-medium text-gray-muted uppercase tracking-wider mb-3">
        {label}
      </p>
      <p className="font-mono text-2xl font-medium text-ivory mb-1">
        {value}
      </p>
      <div className="flex items-center gap-2">
        {trendValue && (
          <span
            className={cn(
              'text-xs font-mono',
              trend === 'up' && 'text-sage',
              trend === 'down' && 'text-coral',
              trend === 'neutral' && 'text-gray-muted',
            )}
          >
            {trend === 'up' ? '\u2191' : trend === 'down' ? '\u2193' : '\u2192'}{' '}
            {trendValue}
          </span>
        )}
        {sub && (
          <span className="text-xs font-body text-gray-muted/60">{sub}</span>
        )}
      </div>
    </Card>
  )
}
