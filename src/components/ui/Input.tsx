import React, { InputHTMLAttributes, forwardRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-sm font-medium text-slate-300 ml-1">
            {label}
            {props.required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'glass-input px-4 py-2.5 rounded-xl text-sm w-full',
            error && 'border-red-400/50 focus:border-red-400/50 focus:ring-red-400/20',
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-red-400 ml-1">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
