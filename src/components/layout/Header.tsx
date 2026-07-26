import React, { useState } from 'react';
import { Search, MapPin, Navigation, SlidersHorizontal, Bookmark, Palette, Check } from 'lucide-react';
import { UnitToggle } from '../common/UnitToggle';
import { useLocationStore } from '../../lib/store/useLocationStore';
import { useSettingsStore, BgColorPreset } from '../../lib/store/useSettingsStore';
import { useGeolocation } from '../../hooks/useGeolocation';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenSavedLocations: () => void;
  onOpenSettings: () => void;
}

const BG_OPTIONS: { id: BgColorPreset; label: string; color: string }[] = [
  { id: 'amoled', label: 'AMOLED Pure Black', color: '#000000' },
  { id: 'obsidian', label: 'Obsidian Black', color: '#050505' },
  { id: 'charcoal', label: 'Charcoal Minimal', color: '#0a0a0a' },
  { id: 'zinc', label: 'Studio Zinc', color: '#121212' },
  { id: 'slate', label: 'Monochrome Dark', color: '#09090b' },
  { id: 'light', label: 'Studio Pure White', color: '#ffffff' },
];

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenSavedLocations,
  onOpenSettings,
}) => {
  const { activeLocation } = useLocationStore();
  const { bgColor, setBgColor } = useSettingsStore();
  const { loading: geoLoading, getCurrentLocation } = useGeolocation();
  const [isBgMenuOpen, setIsBgMenuOpen] = useState(false);

  const handleLocateMe = () => {
    getCurrentLocation();
  };

  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-xl bg-[var(--header-bg)] border-b border-[var(--border-color)] px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand & Location */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[var(--text-primary)] text-[var(--bg-main)] font-bold rounded-2xl shadow-lg">
            <Navigation size={20} className="fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-extrabold text-base sm:text-lg text-[var(--text-primary)] leading-tight">
              <span>{activeLocation.name}</span>
              {activeLocation.country && (
                <span className="text-xs font-normal text-[var(--text-muted)]">
                  , {activeLocation.country}
                </span>
              )}
            </div>
            <p className="text-xs text-[var(--text-secondary)] flex items-center gap-1">
              <MapPin size={12} />
              {activeLocation.isGeo ? 'Current Geolocation' : 'Selected Location'}
            </p>
          </div>
        </div>

        {/* Search Input Trigger */}
        <button
          onClick={onOpenSearch}
          className="hidden md:flex items-center gap-3 px-4 py-2 bg-[var(--nav-btn-bg)] hover:bg-[var(--nav-btn-hover)] border border-[var(--border-color)] rounded-full text-[var(--text-secondary)] text-sm transition-all duration-200 w-64 lg:w-72"
        >
          <Search size={16} className="text-[var(--text-secondary)]" />
          <span className="flex-1 text-left">Search city or zip...</span>
          <kbd className="px-1.5 py-0.5 text-[10px] bg-black/10 dark:bg-white/10 border border-[var(--border-color)] rounded text-[var(--text-muted)] font-mono">
            ⌘K
          </kbd>
        </button>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Background Color Picker Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsBgMenuOpen(!isBgMenuOpen)}
              className="flex items-center gap-2 px-3 py-2 bg-[var(--nav-btn-bg)] hover:bg-[var(--nav-btn-hover)] border border-[var(--border-color)] rounded-full text-xs font-semibold text-[var(--text-primary)] transition-all"
              aria-label="Background Color Picker"
            >
              <Palette size={16} className="text-[var(--text-primary)]" />
              <span className="hidden sm:inline">Background</span>
            </button>

            {isBgMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 p-2 bg-[var(--modal-bg)] backdrop-blur-xl border border-[var(--border-color)] rounded-2xl shadow-2xl z-50 space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] px-2 py-1">
                  Change Background Color
                </p>
                {BG_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setBgColor(opt.id);
                      setIsBgMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-semibold transition-all ${
                      bgColor === opt.id
                        ? 'bg-[var(--text-primary)]/15 text-[var(--text-primary)] font-bold border border-[var(--border-color)]'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--text-primary)]/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-4 h-4 rounded-full border border-current/40 shadow-sm"
                        style={{ backgroundColor: opt.color }}
                      />
                      <span>{opt.label}</span>
                    </div>
                    {bgColor === opt.id && <Check size={14} className="text-[var(--text-primary)]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Search */}
          <button
            onClick={onOpenSearch}
            className="md:hidden p-2.5 bg-[var(--nav-btn-bg)] hover:bg-[var(--nav-btn-hover)] border border-[var(--border-color)] rounded-full text-[var(--text-primary)] transition-colors"
            aria-label="Search City"
          >
            <Search size={18} />
          </button>

          {/* Locate Me */}
          <button
            onClick={handleLocateMe}
            disabled={geoLoading}
            className={`p-2.5 bg-[var(--nav-btn-bg)] hover:bg-[var(--nav-btn-hover)] border border-[var(--border-color)] rounded-full text-[var(--text-primary)] transition-colors ${
              geoLoading ? 'animate-spin text-sky-400' : ''
            }`}
            title="Use current geolocation"
            aria-label="Use Current Location"
          >
            <Navigation size={18} />
          </button>

          {/* Temperature Unit Toggle */}
          <UnitToggle />

          {/* Saved Locations */}
          <button
            onClick={onOpenSavedLocations}
            className="p-2.5 bg-[var(--nav-btn-bg)] hover:bg-[var(--nav-btn-hover)] border border-[var(--border-color)] rounded-full text-[var(--text-primary)] transition-colors relative"
            title="Saved Locations"
            aria-label="Saved Locations"
          >
            <Bookmark size={18} />
          </button>

          {/* Settings */}
          <button
            onClick={onOpenSettings}
            className="p-2.5 bg-[var(--nav-btn-bg)] hover:bg-[var(--nav-btn-hover)] border border-[var(--border-color)] rounded-full text-[var(--text-primary)] transition-colors"
            title="App Settings"
            aria-label="Settings"
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};
