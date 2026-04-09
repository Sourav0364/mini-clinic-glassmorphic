import React from 'react';
import { cn } from './Input';

export interface MultiSelectProps {
  label?: string;
  options: { label: string; value: string }[];
  selected: string[];
  onChange: (selected: string[]) => void;
  error?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  selected,
  onChange,
  error,
}) => {
  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-sm font-medium text-slate-300 ml-1">{label}</label>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isSelected = selected.includes(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggleOption(opt.value)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border',
                isSelected
                  ? 'bg-indigo-500/20 border-indigo-400/50 text-indigo-200 shadow-[0_0_10px_rgba(99,102,241,0.2)]'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-200'
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      {error && <span className="text-xs text-red-400 ml-1">{error}</span>}
    </div>
  );
};
