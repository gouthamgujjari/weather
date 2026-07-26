import React, { useState, useEffect } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';
import { Header } from './components/layout/Header';
import { BackgroundCanvas } from './components/layout/BackgroundCanvas';
import { Footer } from './components/layout/Footer';
import { CurrentWeatherCard } from './features/forecast/CurrentWeatherCard';
import { RainIndicatorBanner } from './features/forecast/RainIndicatorBanner';
import { HourlyForecast } from './features/forecast/HourlyForecast';
import { DailyForecast } from './features/forecast/DailyForecast';
import { SunArcWidget } from './features/forecast/SunArcWidget';
import { AQICard } from './features/air-quality/AQICard';
import { RadarMap } from './features/radar-map/RadarMap';
import { SearchModal } from './features/locations/SearchModal';
import { SavedLocationsDrawer } from './features/locations/SavedLocationsDrawer';
import { SettingsModal } from './features/settings/SettingsModal';
import { WeatherSkeletonPage } from './components/common/SkeletonLoader';
import { useWeatherQuery } from './hooks/useWeatherQuery';
import { useAQIQuery } from './hooks/useAQIQuery';
import { useLocationStore } from './lib/store/useLocationStore';
import { useSettingsStore } from './lib/store/useSettingsStore';

export function App() {
  const { activeLocation } = useLocationStore();
  const { bgColor } = useSettingsStore();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Keyboard shortcut ⌘K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const {
    data: weather,
    isLoading: isWeatherLoading,
    isError: isWeatherError,
    error: weatherError,
    refetch: refetchWeather,
  } = useWeatherQuery(activeLocation.lat, activeLocation.lon);

  const { data: aqiData } = useAQIQuery(activeLocation.lat, activeLocation.lon);

  // Dynamically set root data-bg attribute for background color
  useEffect(() => {
    document.documentElement.setAttribute('data-bg', bgColor || 'midnight');
  }, [bgColor]);

  // Title update
  useEffect(() => {
    if (weather?.current) {
      document.title = `${activeLocation.name} (${Math.round(weather.current.temperature)}°) | WeatherView Pro`;
    }
  }, [weather, activeLocation.name]);

  return (
    <div className="min-h-screen flex flex-col justify-between text-[var(--text-primary)] relative selection:bg-zinc-800 selection:text-white">
      {/* Background canvas layer */}
      <BackgroundCanvas
        weatherCode={weather?.current?.weatherCode}
        isDay={weather?.current?.isDay}
      />

      {/* Header with Background Color Picker */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSavedLocations={() => setIsSavedOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Content Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 space-y-6">
        {/* Error Fallback */}
        {isWeatherError && (
          <div className="p-6 bg-red-950/60 border border-red-500/30 rounded-3xl backdrop-blur-xl flex flex-col items-center text-center space-y-3">
            <AlertTriangle size={36} className="text-red-400" />
            <h2 className="text-lg font-bold text-white">Unable to fetch weather data</h2>
            <p className="text-sm text-red-200">{weatherError?.message || 'Network error occurred'}</p>
            <button
              onClick={() => refetchWeather()}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-red-600/30 transition-colors"
            >
              <RefreshCw size={14} />
              <span>Retry Request</span>
            </button>
          </div>
        )}

        {/* Skeleton Loader */}
        {isWeatherLoading && <WeatherSkeletonPage />}

        {/* Main Dashboard Layout */}
        {!isWeatherLoading && weather && (
          <>
            {/* Glanceable Rain Banner */}
            <RainIndicatorBanner hourly={weather.hourly} />

            {/* Current Conditions Hero Card */}
            <CurrentWeatherCard weather={weather} />

            {/* Side-by-Side 2-Column Main Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Air Quality + 24h Hourly + Live Rain Radar Map */}
              <div className="lg:col-span-7 flex flex-col space-y-6">
                {aqiData && <AQICard aqiData={aqiData} />}
                <HourlyForecast hourly={weather.hourly} timezone={weather.timezone} />
                <RadarMap
                  lat={activeLocation.lat}
                  lon={activeLocation.lon}
                  locationName={activeLocation.name}
                />
              </div>

              {/* Right Column: 7-Day Forecast + Sun Arc */}
              <div className="lg:col-span-5 flex flex-col space-y-6">
                <DailyForecast daily={weather.daily} />
                <SunArcWidget
                  sunrise={weather.sunrise}
                  sunset={weather.sunset}
                  timezone={weather.timezone}
                />
              </div>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <SavedLocationsDrawer isOpen={isSavedOpen} onClose={() => setIsSavedOpen(false)} />
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}
