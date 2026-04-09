import React, { HTMLAttributes, forwardRef } from 'react';
import { cn } from './Input';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'info';
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-white/10 text-slate-200 border-white/10',
      success: 'bg-emerald-500/20 text-emerald-200 border-emerald-500/30',
      warning: 'bg-amber-500/20 text-amber-200 border-amber-500/30',
      info: 'bg-indigo-500/20 text-indigo-200 border-indigo-500/30',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border',
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
