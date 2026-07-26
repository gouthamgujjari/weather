import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TempUnit, SpeedUnit } from '../utils/temp';
import { AQIScale } from '../types/airQuality';

export type AppTheme = 'monochrome' | 'obsidian' | 'slate';
export type BgColorPreset = 'midnight' | 'charcoal' | 'zinc' | 'obsidian' | 'amoled' | 'light' | 'slate';

interface SettingsState {
  tempUnit: TempUnit;
  speedUnit: SpeedUnit;
  aqiScale: AQIScale;
  reducedMotion: boolean;
  theme: AppTheme;
  bgColor: BgColorPreset;
  setTempUnit: (unit: TempUnit) => void;
  setSpeedUnit: (unit: SpeedUnit) => void;
  setAqiScale: (scale: AQIScale) => void;
  setReducedMotion: (reduced: boolean) => void;
  setTheme: (theme: AppTheme) => void;
  setBgColor: (bg: BgColorPreset) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      tempUnit: 'C',
      speedUnit: 'kmh',
      aqiScale: 'US_EPA',
      reducedMotion: false,
      theme: 'monochrome',
      bgColor: 'amoled',
      setTempUnit: (tempUnit) => set({ tempUnit }),
      setSpeedUnit: (speedUnit) => set({ speedUnit }),
      setAqiScale: (aqiScale) => set({ aqiScale }),
      setReducedMotion: (reducedMotion) => set({ reducedMotion }),
      setTheme: (theme) => set({ theme }),
      setBgColor: (bgColor) => set({ bgColor }),
    }),
    {
      name: 'weatherview-settings-v5',
    }
  )
);

