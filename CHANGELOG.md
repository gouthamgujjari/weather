# Changelog - WeatherView Upgrade

All notable changes to the WeatherView project are documented in this file.

## [2.0.0] - 2.0.0 Production Upgrade

### Architecture & Build Tooling
- **Migrated from CRA to Vite**: Upgraded build pipeline from deprecated `react-scripts` to Vite 6 for instant HMR and faster builds.
- **Migrated JavaScript to TypeScript**: Added strict interfaces for Open-Meteo Weather API, Air Quality API, RainViewer Radar tiles, and Geocoding responses.
- **Tailwind CSS v4 & Design Tokens**: Replaced inline styled-components with Tailwind CSS v4 and a glassmorphic design system.
- **TanStack Query (React Query) Integration**: Implemented server state management with automatic background refetching and error boundary retry logic.
- **Zustand Client State**: Added persistent state management for temperature units (°C/°F), wind speed units (km/h, mph, m/s), AQI scales (US EPA/CAQI), saved locations, and reduced-motion preferences.

### Product Features & UX Enhancements
- **Interactive Rain Radar Map**: Embedded Leaflet map with RainViewer API tile overlays, timeline scrubber slider, play/pause playback controls, and radar/cloud layer toggles.
- **Live Air Quality Index (AQI)**: Added color-coded AQI status gauge, health advisory cards, and individual pollutant breakdown grid (PM2.5, PM10, O₃, NO₂, SO₂, CO).
- **Apple Weather-Style 7-Day Forecast**: Added daily min/max temperature range bar visualizer and weather condition indicators.
- **Glanceable Rain Indicator Banner**: Added minute-level rain probability status builder (*"Rain starting in 25 min"*).
- **Sun Arc & Daylight Visualizer**: Added semi-circle SVG arc tracking sun elevation and remaining daylight percentage.
- **Global City Search Autocomplete**: Added debounced city search powered by Open-Meteo Geocoding API with ⌘K keyboard shortcut support.
- **Dynamic Weather Backgrounds**: Added dynamic atmospheric background canvas shifting with condition and time of day.
- **PWA Capabilities**: Configured `vite-plugin-pwa` with web app manifest and offline service worker.
- **Unit Testing**: Created Vitest test suite for temperature conversion, AQI categorization, wind direction math, and rain indicator logic.
