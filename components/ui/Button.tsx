import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const base =
      'inline-flex items-center justify-center font-body font-semibold rounded-lg transition-all duration-300 ease-expo-out focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-navy disabled:opacity-40 disabled:cursor-not-allowed'

    const variants = {
      primary: 'bg-gold text-navy hover:bg-gold/90 active:scale-[0.98]',
      ghost:
        'bg-transparent text-gray-muted border border-gray-muted/30 hover:border-gold/50 hover:text-ivory active:scale-[0.98]',
      danger:
        'bg-transparent text-coral border border-coral/30 hover:bg-coral/10 active:scale-[0.98]',
    }

    const sizes = {
      sm: 'text-xs px-3 py-1.5 gap-1.5',
      md: 'text-sm px-4 py-2 gap-2',
      lg: 'text-base px-6 py-3 gap-2',
    }

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          children
        )}
      </button>
    )
  },
)

Button.displayName = 'Button'
export { Button }
