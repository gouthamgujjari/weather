import React from 'react';
import { useSettingsStore } from '../../lib/store/useSettingsStore';

export const UnitToggle: React.FC = () => {
  const { tempUnit, setTempUnit } = useSettingsStore();

  return (
    <div className="inline-flex p-1 bg-[var(--nav-btn-bg)] border border-[var(--border-color)] rounded-full text-xs font-semibold">
      <button
        onClick={() => setTempUnit('C')}
        className={`px-3 py-1.5 rounded-full transition-all duration-200 ${
          tempUnit === 'C'
            ? 'bg-[var(--text-primary)] text-[var(--bg-main)] font-bold shadow-md'
            : 'opacity-70 hover:opacity-100'
        }`}
        aria-label="Switch to Celsius"
      >
        °C
      </button>
      <button
        onClick={() => setTempUnit('F')}
        className={`px-3 py-1.5 rounded-full transition-all duration-200 ${
          tempUnit === 'F'
            ? 'bg-[var(--text-primary)] text-[var(--bg-main)] font-bold shadow-md'
            : 'opacity-70 hover:opacity-100'
        }`}
        aria-label="Switch to Fahrenheit"
      >
        °F
      </button>
    </div>
  );
};
