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
            'w-full bg-slate/80 border border-gray-muted/30 rounded-lg px-4 py-2.5',
            'font-body text-sm text-ivory placeholder:text-gray-muted/50',
            'transition-all duration-300 ease-expo-out',
            'focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30',
            'hover:border-gray-muted/40',
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
