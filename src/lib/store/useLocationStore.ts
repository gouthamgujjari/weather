import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SavedLocation } from '../types/location';

interface ActiveLocation {
  name: string;
  country?: string;
  admin1?: string;
  lat: number;
  lon: number;
  isGeo?: boolean;
}

interface LocationState {
  activeLocation: ActiveLocation;
  savedLocations: SavedLocation[];
  setActiveLocation: (location: ActiveLocation) => void;
  saveLocation: (location: SavedLocation) => void;
  removeLocation: (id: string) => void;
  setHomeLocation: (id: string) => void;
}

// Default fallback city: London
const DEFAULT_LOCATION: ActiveLocation = {
  name: 'London',
  country: 'United Kingdom',
  admin1: 'England',
  lat: 51.5074,
  lon: -0.1278,
};

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      activeLocation: DEFAULT_LOCATION,
      savedLocations: [
        {
          id: 'london-uk',
          name: 'London',
          country: 'United Kingdom',
          admin1: 'England',
          lat: 51.5074,
          lon: -0.1278,
          isHome: true,
        },
        {
          id: 'tokyo-jp',
          name: 'Tokyo',
          country: 'Japan',
          lat: 35.6762,
          lon: 139.6503,
          isHome: false,
        },
        {
          id: 'newyork-us',
          name: 'New York',
          country: 'United States',
          admin1: 'New York',
          lat: 40.7128,
          lon: -74.006,
          isHome: false,
        },
      ],
      setActiveLocation: (activeLocation) => set({ activeLocation }),
      saveLocation: (newLoc) =>
        set((state) => {
          if (state.savedLocations.some((loc) => loc.id === newLoc.id)) return state;
          return { savedLocations: [...state.savedLocations, newLoc] };
        }),
      removeLocation: (id) =>
        set((state) => ({
          savedLocations: state.savedLocations.filter((loc) => loc.id !== id),
        })),
      setHomeLocation: (id) =>
        set((state) => ({
          savedLocations: state.savedLocations.map((loc) => ({
            ...loc,
            isHome: loc.id === id,
          })),
        })),
    }),
    {
      name: 'weatherview-locations',
    }
  )
);
