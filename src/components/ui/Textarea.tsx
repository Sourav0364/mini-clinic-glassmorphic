import React, { TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from './Input';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-sm font-medium text-slate-300 ml-1">
            {label}
            {props.required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            'glass-input px-4 py-3 rounded-xl text-sm w-full min-h-[100px] resize-y',
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

Textarea.displayName = 'Textarea';
