import React from 'react';
import { X, Bookmark, Home, Trash2, MapPin } from 'lucide-react';
import { useLocationStore } from '../../lib/store/useLocationStore';
import { SavedLocation } from '../../lib/types/location';

interface SavedLocationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SavedLocationsDrawer: React.FC<SavedLocationsDrawerProps> = ({ isOpen, onClose }) => {
  const { savedLocations, activeLocation, setActiveLocation, removeLocation, setHomeLocation } =
    useLocationStore();

  if (!isOpen) return null;

  const handleSelect = (loc: SavedLocation) => {
    setActiveLocation({
      name: loc.name,
      country: loc.country,
      admin1: loc.admin1,
      lat: loc.lat,
      lon: loc.lon,
      isGeo: false,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xl animate-fadeIn text-[var(--text-primary)]">
      <div className="w-full max-w-md bg-[var(--modal-bg)] border-l border-[var(--border-color)] h-full p-6 flex flex-col justify-between overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)] mb-6">
            <div className="flex items-center gap-2 font-bold text-lg">
              <Bookmark size={20} className="text-[var(--text-primary)]" />
              <span>Saved Locations</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 opacity-70 hover:opacity-100 rounded-full hover:bg-[var(--nav-btn-hover)]"
            >
              <X size={20} />
            </button>
          </div>

          {/* Locations List */}
          <div className="space-y-3">
            {savedLocations.map((loc) => {
              const isActive =
                activeLocation.lat === loc.lat && activeLocation.lon === loc.lon;

              return (
                <div
                  key={loc.id}
                  className={`p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between ${
                    isActive
                      ? 'bg-[var(--text-primary)]/15 border-[var(--border-color)] shadow-lg font-bold'
                      : 'bg-[var(--surface-inner)] border-[var(--border-color)] hover:bg-[var(--surface-inner-hover)]'
                  }`}
                >
                  <button
                    onClick={() => handleSelect(loc)}
                    className="flex-1 text-left flex items-center gap-3"
                  >
                    <MapPin size={18} className={isActive ? 'text-[var(--text-primary)]' : 'opacity-60'} />
                    <div>
                      <div className="flex items-center gap-2 font-bold text-sm">
                        <span>{loc.name}</span>
                        {loc.isHome && (
                          <span className="flex items-center gap-1 text-[10px] font-semibold bg-amber-500/20 border border-amber-400/30 text-amber-500 px-2 py-0.5 rounded-full">
                            <Home size={10} />
                            Home
                          </span>
                        )}
                      </div>
                      <p className="text-xs opacity-60">
                        {[loc.admin1, loc.country].filter(Boolean).join(', ')}
                      </p>
                    </div>
                  </button>

                  <div className="flex items-center gap-1">
                    {!loc.isHome && (
                      <button
                        onClick={() => setHomeLocation(loc.id)}
                        className="p-2 opacity-60 hover:opacity-100 hover:text-amber-500 transition-colors"
                        title="Set as Home"
                      >
                        <Home size={16} />
                      </button>
                    )}
                    {savedLocations.length > 1 && (
                      <button
                        onClick={() => removeLocation(loc.id)}
                        className="p-2 opacity-60 hover:opacity-100 hover:text-red-500 transition-colors"
                        title="Remove location"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-xs text-center opacity-50 pt-6">
          Saved locations are stored locally in your browser session.
        </p>
      </div>
    </div>
  );
};
