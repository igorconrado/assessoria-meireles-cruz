import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={id}
            className="text-xs font-body font-medium text-gray-muted uppercase tracking-wider"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5',
            'font-body text-sm text-ivory placeholder:text-gray-muted/40',
            'transition-all duration-300 ease-expo-out',
            'focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20',
            'hover:border-white/20',
            error && 'border-coral/60 focus:border-coral focus:ring-coral/30',
            className,
          )}
          {...props}
        />
        {error && <p className="text-xs font-body text-coral">{error}</p>}
        {hint && !error && (
          <p className="text-xs font-body text-gray-muted/60">{hint}</p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
export { Input }
