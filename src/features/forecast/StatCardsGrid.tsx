import React from 'react';
import { Wind, Droplets, Gauge, Sunrise, Sunset, Sun, Compass } from 'lucide-react';
import { CurrentWeather } from '../../lib/types/weather';
import { useSettingsStore } from '../../lib/store/useSettingsStore';
import { formatSpeed, getWindDirectionLabel, getUVLevel } from '../../lib/utils/temp';
import { formatHourTime } from '../../lib/utils/date';

interface StatCardsGridProps {
  current: CurrentWeather;
  sunrise: string;
  sunset: string;
  timezone: string;
}

export const StatCardsGrid: React.FC<StatCardsGridProps> = ({
  current,
  sunrise,
  sunset,
  timezone,
}) => {
  const { speedUnit } = useSettingsStore();
  const uvInfo = getUVLevel(current.uvIndex);

  // SVG Arc calculation for UV Index Dial Gauge (0 to 12+)
  const uvPct = Math.min((current.uvIndex / 12) * 100, 100);
  const strokeDashoffset = 220 - (uvPct / 100) * 220;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      {/* Featured 2x Slot: UV Index Arc Gauge Dial */}
      <div className="md:col-span-6 p-5 app-card flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-70">
            <Sun size={16} className="text-amber-500" />
            <span>UV Radiation Index</span>
          </div>
          <span
            className="text-xs font-bold px-2.5 py-0.5 rounded-full text-white shadow-sm"
            style={{ backgroundColor: uvInfo.color }}
          >
            {uvInfo.label}
          </span>
        </div>

        <div className="flex items-center justify-around my-2">
          {/* Dial Gauge SVG */}
          <div className="relative w-36 h-24 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 100 60">
              <path
                d="M 10,50 A 40,40 0 0,1 90,50"
                fill="none"
                stroke="currentColor"
                strokeOpacity={0.15}
                strokeWidth={8}
                strokeLinecap="round"
              />
              <path
                d="M 10,50 A 40,40 0 0,1 90,50"
                fill="none"
                stroke={uvInfo.color}
                strokeWidth={8}
                strokeLinecap="round"
                strokeDasharray={220}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute bottom-1 text-center">
              <span className="text-3xl font-black">{Math.round(current.uvIndex)}</span>
              <span className="text-[10px] block opacity-60 font-mono">/ 12 Peak</span>
            </div>
          </div>

          <div className="max-w-[50%] space-y-1">
            <p className="text-xs font-semibold">{uvInfo.advice}</p>
            <p className="text-[10px] opacity-60">Peak exposure between 11 AM – 4 PM</p>
          </div>
        </div>
      </div>

      {/* Featured 2x Slot: Wind Compass Rose */}
      <div className="md:col-span-6 p-5 app-card flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-70">
            <Wind size={16} className="text-sky-500" />
            <span>Wind Velocity & Heading</span>
          </div>
          <span className="text-xs font-mono font-bold">
            {getWindDirectionLabel(current.windDirection)} ({current.windDirection}°)
          </span>
        </div>

        <div className="flex items-center justify-around my-2">
          {/* Compass Dial SVG */}
          <div className="relative w-24 h-24 flex items-center justify-center border-2 border-dashed border-current/20 rounded-full">
            <span className="absolute top-1 text-[10px] font-bold opacity-60">N</span>
            <span className="absolute bottom-1 text-[10px] font-bold opacity-60">S</span>
            <span className="absolute left-1 text-[10px] font-bold opacity-60">W</span>
            <span className="absolute right-1 text-[10px] font-bold opacity-60">E</span>

            {/* Rotating Arrow Needle */}
            <div
              className="w-1.5 h-16 bg-gradient-to-t from-sky-500 to-amber-500 rounded-full transition-transform duration-700 shadow-md"
              style={{ transform: `rotate(${current.windDirection}deg)` }}
            />
          </div>

          <div className="space-y-1 text-left">
            <p className="text-3xl font-black">{formatSpeed(current.windSpeed, speedUnit)}</p>
            <p className="text-xs opacity-70 font-medium">Surface Air Movement</p>
          </div>
        </div>
      </div>

      {/* Secondary Stats Grid */}
      <div className="md:col-span-3 p-4 app-card flex items-center justify-between">
        <div>
          <span className="text-xs font-bold opacity-70 flex items-center gap-1.5 mb-1">
            <Droplets size={14} className="text-blue-500" />
            Humidity
          </span>
          <p className="text-2xl font-extrabold">{current.humidity}%</p>
          <p className="text-[10px] opacity-60">Dew point: {Math.round(current.dewPoint)}°</p>
        </div>
      </div>

      <div className="md:col-span-3 p-4 app-card flex items-center justify-between">
        <div>
          <span className="text-xs font-bold opacity-70 flex items-center gap-1.5 mb-1">
            <Gauge size={14} className="text-emerald-500" />
            Barometer
          </span>
          <p className="text-2xl font-extrabold">{Math.round(current.pressure)}</p>
          <p className="text-[10px] opacity-60">hPa Surface Pressure</p>
        </div>
      </div>

      <div className="md:col-span-3 p-4 app-card flex items-center justify-between">
        <div>
          <span className="text-xs font-bold opacity-70 flex items-center gap-1.5 mb-1">
            <Sunrise size={14} className="text-amber-500" />
            Sunrise
          </span>
          <p className="text-xl font-bold">
            {formatHourTime(new Date(sunrise).getTime(), timezone)}
          </p>
        </div>
      </div>

      <div className="md:col-span-3 p-4 app-card flex items-center justify-between">
        <div>
          <span className="text-xs font-bold opacity-70 flex items-center gap-1.5 mb-1">
            <Sunset size={14} className="text-orange-500" />
            Sunset
          </span>
          <p className="text-xl font-bold">
            {formatHourTime(new Date(sunset).getTime(), timezone)}
          </p>
        </div>
      </div>
    </div>
  );
};
