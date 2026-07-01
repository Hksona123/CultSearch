import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@lib/utils'
import type { ButtonVariant, ButtonSize } from '@types'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    'bg-gradient-to-r from-violet-600 to-purple-600',
    'hover:from-violet-500 hover:to-purple-500',
    'text-white border border-violet-500',
  ].join(' '),
  secondary: [
    'bg-transparent text-zinc-400',
    'border border-zinc-800',
    'hover:border-violet-500/50 hover:text-white',
  ].join(' '),
  ghost: [
    'bg-transparent text-zinc-500',
    'hover:text-white hover:bg-zinc-800',
    'border border-transparent',
  ].join(' '),
  destructive: [
    'bg-transparent text-zinc-500',
    'hover:text-red-400 hover:bg-red-500/10',
    'border border-transparent',
  ].join(' '),
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-2.5 py-1.5 text-xs rounded-lg gap-1',
  md: 'px-3.5 py-2 text-sm rounded-lg gap-1.5',
  lg: 'px-5 py-2.5 text-base rounded-xl gap-2',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled ?? isLoading}
        className={cn(
          'inline-flex items-center justify-center font-medium',
          'transition-all duration-200 cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-violet-500 focus-visible:ring-offset-2',
          'focus-visible:ring-offset-[#080808]',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
