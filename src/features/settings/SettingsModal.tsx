import React from 'react';
import { X, SlidersHorizontal, Eye, ShieldCheck, Cpu } from 'lucide-react';
import { useSettingsStore } from '../../lib/store/useSettingsStore';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const {
    tempUnit,
    setTempUnit,
    speedUnit,
    setSpeedUnit,
    aqiScale,
    setAqiScale,
    reducedMotion,
    setReducedMotion,
  } = useSettingsStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl animate-fadeIn text-[var(--text-primary)]">
      <div className="w-full max-w-lg bg-[var(--modal-bg)] border border-[var(--border-color)] rounded-3xl p-6 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
          <div className="flex items-center gap-2 font-bold text-lg">
            <SlidersHorizontal size={20} className="text-[var(--text-primary)]" />
            <span>App Preferences</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 opacity-70 hover:opacity-100 rounded-full hover:bg-[var(--nav-btn-hover)]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Temperature Unit */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-sm">Temperature Format</p>
            <p className="text-xs opacity-60">Choose display unit for values</p>
          </div>
          <div className="flex p-1 bg-[var(--nav-btn-bg)] border border-[var(--border-color)] rounded-xl text-xs font-semibold">
            <button
              onClick={() => setTempUnit('C')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                tempUnit === 'C'
                  ? 'bg-[var(--text-primary)] text-[var(--bg-main)] font-bold'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              °Celsius
            </button>
            <button
              onClick={() => setTempUnit('F')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                tempUnit === 'F'
                  ? 'bg-[var(--text-primary)] text-[var(--bg-main)] font-bold'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              °Fahrenheit
            </button>
          </div>
        </div>

        {/* Wind Speed Unit */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-sm">Wind Speed Unit</p>
            <p className="text-xs opacity-60">Units for wind velocity</p>
          </div>
          <div className="flex p-1 bg-[var(--nav-btn-bg)] border border-[var(--border-color)] rounded-xl text-xs font-semibold">
            <button
              onClick={() => setSpeedUnit('kmh')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                speedUnit === 'kmh'
                  ? 'bg-[var(--text-primary)] text-[var(--bg-main)] font-bold'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              km/h
            </button>
            <button
              onClick={() => setSpeedUnit('mph')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                speedUnit === 'mph'
                  ? 'bg-[var(--text-primary)] text-[var(--bg-main)] font-bold'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              mph
            </button>
            <button
              onClick={() => setSpeedUnit('ms')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                speedUnit === 'ms'
                  ? 'bg-[var(--text-primary)] text-[var(--bg-main)] font-bold'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              m/s
            </button>
          </div>
        </div>

        {/* AQI Standard Scale */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-sm">Air Quality Scale</p>
            <p className="text-xs opacity-60">AQI standard calculation method</p>
          </div>
          <div className="flex p-1 bg-[var(--nav-btn-bg)] border border-[var(--border-color)] rounded-xl text-xs font-semibold">
            <button
              onClick={() => setAqiScale('US_EPA')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                aqiScale === 'US_EPA'
                  ? 'bg-[var(--text-primary)] text-[var(--bg-main)] font-bold'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              US EPA
            </button>
            <button
              onClick={() => setAqiScale('EUROPEAN')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                aqiScale === 'EUROPEAN'
                  ? 'bg-[var(--text-primary)] text-[var(--bg-main)] font-bold'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              European CAQI
            </button>
          </div>
        </div>

        {/* Reduced Motion Accessibility */}
        <div className="flex items-center justify-between border-t border-[var(--border-color)] pt-4">
          <div>
            <p className="font-semibold text-sm">Reduce Motion</p>
            <p className="text-xs opacity-60">Disable background particles & animations</p>
          </div>
          <input
            type="checkbox"
            checked={reducedMotion}
            onChange={(e) => setReducedMotion(e.target.checked)}
            className="w-5 h-5 accent-zinc-800 dark:accent-zinc-200 rounded cursor-pointer"
          />
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-[var(--text-primary)] text-[var(--bg-main)] font-bold text-sm rounded-2xl hover:opacity-90 transition-opacity"
        >
          Save & Close
        </button>
      </div>
    </div>
  );
};
