import React, { useState } from 'react';
import { Search, X, MapPin, Navigation, Building2 } from 'lucide-react';
import { useGeocodingQuery } from '../../hooks/useGeocodingQuery';
import { useLocationStore } from '../../lib/store/useLocationStore';
import { LocationResult } from '../../lib/types/location';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const { data: results, isLoading } = useGeocodingQuery(query);
  const { setActiveLocation, saveLocation } = useLocationStore();

  if (!isOpen) return null;

  const handleSelectLocation = (result: LocationResult) => {
    const loc = {
      name: result.name,
      country: result.country,
      admin1: result.admin1,
      lat: result.latitude,
      lon: result.longitude,
      isGeo: false,
    };

    setActiveLocation(loc);
    saveLocation({
      id: `${result.id}`,
      name: result.name,
      country: result.country,
      admin1: result.admin1,
      lat: result.latitude,
      lon: result.longitude,
    });
    setQuery('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/60 backdrop-blur-xl animate-fadeIn">
      <div className="w-full max-w-xl bg-[var(--modal-bg)] border border-[var(--border-color)] rounded-3xl shadow-2xl overflow-hidden text-[var(--text-primary)]">
        {/* Input Bar */}
        <div className="flex items-center gap-3 p-4 border-b border-[var(--border-color)]">
          <Search size={20} className="text-[var(--text-primary)] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search any city (e.g. Tokyo, London, Paris)..."
            autoFocus
            className="w-full bg-transparent text-[var(--text-primary)] text-base placeholder-[var(--text-muted)] focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 opacity-70 hover:opacity-100">
              <X size={18} />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-[var(--nav-btn-bg)] hover:bg-[var(--nav-btn-hover)] text-xs font-semibold rounded-xl"
          >
            Esc
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-3 space-y-1">
          {isLoading && (
            <div className="p-6 text-center opacity-60 text-sm">Searching global cities...</div>
          )}

          {!isLoading && query.length >= 2 && results?.length === 0 && (
            <div className="p-6 text-center opacity-60 text-sm">
              No matching cities found for &quot;{query}&quot;
            </div>
          )}

          {results?.map((res) => (
            <button
              key={res.id}
              onClick={() => handleSelectLocation(res)}
              className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-[var(--surface-inner-hover)] transition-colors text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[var(--nav-btn-bg)] rounded-xl text-[var(--text-primary)] transition-colors">
                  <Building2 size={18} />
                </div>
                <div>
                  <p className="font-semibold text-[var(--text-primary)] text-sm">{res.name}</p>
                  <p className="text-xs opacity-60">
                    {[res.admin1, res.country].filter(Boolean).join(', ')}
                  </p>
                </div>
              </div>

              <span className="text-[11px] font-mono opacity-50">
                {res.latitude.toFixed(2)}°, {res.longitude.toFixed(2)}°
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
