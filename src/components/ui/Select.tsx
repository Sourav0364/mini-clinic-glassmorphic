import React, { SelectHTMLAttributes, forwardRef } from 'react';
import { cn } from './Input';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { label: string; value: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-sm font-medium text-slate-300 ml-1">
            {label}
            {props.required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          className={cn(
            'glass-input px-4 py-2.5 rounded-xl text-sm w-full appearance-none',
            error && 'border-red-400/50 focus:border-red-400/50 focus:ring-red-400/20',
            className
          )}
          {...props}
        >
          <option value="" disabled className="bg-slate-800 text-slate-400">
            Select an option
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-slate-800 text-slate-200">
              {opt.label}
            </option>
          ))}
        </select>
        {error && <span className="text-xs text-red-400 ml-1">{error}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';
