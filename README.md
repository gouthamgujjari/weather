# WeatherView Pro ⛅ | Next-Gen Production Weather & Radar App

![WeatherView Banner](public/screenshot.png)

WeatherView Pro is a high-performance, feature-rich weather forecasting progressive web application (PWA) inspired by Apple Weather, Windy, and Carrot Weather. Built with modern frontend web standards: Vite, React 19, TypeScript, Tailwind CSS v4, TanStack Query, Framer Motion, Leaflet, and Open-Meteo API.

---

## 🌟 Key Features

- 🌤️ **Live Weather & Minutely Rain Radar**: Current temperature, feels like, humidity, wind compass, surface pressure, UV index level, dew point, sunrise & sunset times.
- ☔ **Glanceable Precipitation Indicator**: Human-friendly rain status banners (*"Rain starting in 25 min"*, *"Heavy rain expected at 4:00 PM (85% chance)"*).
- 🕒 **Hourly Forecast (24 Hours)**: Touch/mouse horizontal scrollable timeline with temperature curves, weather condition icons, and precipitation probability.
- 📅 **7-Day Daily Forecast**: Apple Weather-style high/low temperature range visualizer bars and daily condition summaries.
- 🍃 **Air Quality Index (AQI) & Pollutants**: US EPA & European CAQI standards with live pollutant breakdown grid (**PM2.5, PM10, O₃, NO₂, SO₂, CO**) and health advisories.
- 🗺️ **Interactive Precipitation Radar Map**: Embedded Leaflet map with **RainViewer API** dynamic tile overlays, timeline scrubber, play/pause controls, and radar/cloud layer toggles.
- ☀️ **Sun Arc & Daylight Progress**: Visual semi-circle arc tracking sun elevation and remaining daylight hours.
- 🔍 **Global City Search & Geolocation**: Instant debounced city autocomplete search powered by Open-Meteo Geocoding API, plus one-click browser location detection.
- 🔖 **Saved Locations Drawer**: Manage multi-city bookmarks and mark your primary "Home" location.
- 🎨 **Dynamic Atmospheric Themes**: Gradient canvas that automatically shifts based on time of day (dawn, day, dusk, night) and current weather conditions (sunny, rainy, foggy, snowy, stormy).
- ⚡ **PWA Support**: Installable Web App with Service Worker shell caching for fast loading and offline capabilities.
- ♿ **Accessibility & Dark Mode**: Full WCAG AA color contrast compliance, keyboard shortcuts (`⌘K` for search), and `prefers-reduced-motion` support.

---

## 🛠️ Tech Stack & Architecture

- **Build System**: [Vite](https://vitejs.dev/) + TypeScript
- **Framework**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Custom Glassmorphism Tokens
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Data Caching & Server State**: [TanStack Query v5](https://tanstack.com/query)
- **Map & Radar**: [Leaflet](https://leafletjs.com/) + [RainViewer API](https://www.rainviewer.com/api.html)
- **Weather & AQI Data**: [Open-Meteo API](https://open-meteo.com/) (Free, open-source, no API key required)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Unit Testing**: [Vitest](https://vitest.dev/) + React Testing Library

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher

### Installation & Local Setup

```bash
# Clone repository
git clone https://github.com/gouthamgujjari/weather.git
cd weather

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🧪 Testing & Building for Production

```bash
# Run unit test suite
npm run test

# Type-check and build Vite production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Deployment (Vercel)

This project is configured out-of-the-box for instant Vercel deployment.

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

---

## 📜 License

MIT License © 2026 Goutham Gujjari
