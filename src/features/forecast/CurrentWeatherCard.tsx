import React from 'react';
import {
  Wind,
  Droplets,
  Gauge,
  Sunrise,
  Sunset,
  Sun,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { GlassCard } from '../../components/common/GlassCard';
import { WeatherVisualizer } from '../../components/common/WeatherVisualizer';
import { WeatherData } from '../../lib/types/weather';
import { useSettingsStore } from '../../lib/store/useSettingsStore';
import { formatTemp, formatSpeed, getWindDirectionLabel, getUVLevel } from '../../lib/utils/temp';
import { formatHourTime } from '../../lib/utils/date';

interface CurrentWeatherCardProps {
  weather: WeatherData;
}

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({ weather }) => {
  const { tempUnit, speedUnit } = useSettingsStore();
  const { current, timezone, sunrise, sunset } = weather;

  const uvInfo = getUVLevel(current.uvIndex);

  return (
    <GlassCard className="relative overflow-hidden shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Hero Column: Big Temperature & Condition */}
        <div className="lg:col-span-6 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 p-2">
          <div className="text-center sm:text-left space-y-1">
            <div className="flex items-baseline justify-center sm:justify-start gap-1">
              <motion.span
                key={current.temperature}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-7xl sm:text-8xl font-extrabold tracking-tight"
              >
                {formatTemp(current.temperature, tempUnit)}
              </motion.span>
            </div>
            
            <p className="text-xl sm:text-2xl font-bold capitalize tracking-wide opacity-90">
              {current.weatherDescription}
            </p>
            <p className="text-sm font-medium pt-1 opacity-70">
              Feels like <span className="font-bold text-base opacity-100">{formatTemp(current.feelsLike, tempUnit)}</span>
            </p>
          </div>

          {/* Weather Animated Scene Visualizer */}
          <div className="flex justify-center items-center">
            <WeatherVisualizer
              weatherCode={current.weatherCode}
              isDay={current.isDay}
            />
          </div>
        </div>

        {/* Right Column: Key Weather Metrics Grid */}
        <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t lg:border-t-0 lg:border-l border-current/10 pt-4 lg:pt-0 lg:pl-6">
          {/* Wind */}
          <div className="p-3.5 glass-panel-inner rounded-2xl">
            <div className="flex items-center gap-2 text-xs mb-1 font-semibold opacity-70">
              <Wind size={15} className="text-sky-500" />
              <span>Wind</span>
            </div>
            <p className="text-base font-extrabold">
              {formatSpeed(current.windSpeed, speedUnit)}
            </p>
            <p className="text-xs opacity-60">
              {getWindDirectionLabel(current.windDirection)} ({current.windDirection}°)
            </p>
          </div>

          {/* Humidity */}
          <div className="p-3.5 glass-panel-inner rounded-2xl">
            <div className="flex items-center gap-2 text-xs mb-1 font-semibold opacity-70">
              <Droplets size={15} className="text-blue-500" />
              <span>Humidity</span>
            </div>
            <p className="text-base font-extrabold">{current.humidity}%</p>
            <p className="text-xs opacity-60">Dew pt: {Math.round(current.dewPoint)}°</p>
          </div>

          {/* UV Index */}
          <div className="p-3.5 glass-panel-inner rounded-2xl">
            <div className="flex items-center gap-2 text-xs mb-1 font-semibold opacity-70">
              <Sun size={15} className="text-amber-500" />
              <span>UV Index</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold">{Math.round(current.uvIndex)}</span>
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded text-white shadow-sm"
                style={{ backgroundColor: uvInfo.color }}
              >
                {uvInfo.label}
              </span>
            </div>
            <p className="text-[11px] opacity-60 truncate mt-0.5">{uvInfo.advice}</p>
          </div>

          {/* Pressure */}
          <div className="p-3.5 glass-panel-inner rounded-2xl">
            <div className="flex items-center gap-2 text-xs mb-1 font-semibold opacity-70">
              <Gauge size={15} className="text-emerald-500" />
              <span>Pressure</span>
            </div>
            <p className="text-base font-extrabold">{Math.round(current.pressure)} hPa</p>
            <p className="text-xs opacity-60">Stable</p>
          </div>

          {/* Sunrise */}
          <div className="p-3.5 glass-panel-inner rounded-2xl">
            <div className="flex items-center gap-2 text-xs mb-1 font-semibold opacity-70">
              <Sunrise size={15} className="text-amber-500" />
              <span>Sunrise</span>
            </div>
            <p className="text-base font-extrabold">
              {formatHourTime(new Date(sunrise).getTime(), timezone)}
            </p>
          </div>

          {/* Sunset */}
          <div className="p-3.5 glass-panel-inner rounded-2xl">
            <div className="flex items-center gap-2 text-xs mb-1 font-semibold opacity-70">
              <Sunset size={15} className="text-orange-500" />
              <span>Sunset</span>
            </div>
            <p className="text-base font-extrabold">
              {formatHourTime(new Date(sunset).getTime(), timezone)}
            </p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
