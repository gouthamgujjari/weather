import React from 'react';
import { Clock, Umbrella, Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudDrizzle, CloudSun, CloudMoon, Moon } from 'lucide-react';
import { HourlyForecastItem } from '../../lib/types/weather';
import { useSettingsStore } from '../../lib/store/useSettingsStore';
import { formatTemp } from '../../lib/utils/temp';

interface HourlyForecastProps {
  hourly: HourlyForecastItem[];
  timezone: string;
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourly }) => {
  const { tempUnit } = useSettingsStore();

  const renderIcon = (code: number, isDay: boolean) => {
    const props = { size: 20, className: 'shrink-0' };
    if (code === 0) return isDay ? <Sun {...props} className="text-amber-500" /> : <Moon {...props} className="text-indigo-400" />;
    if (code <= 2) return isDay ? <CloudSun {...props} className="text-amber-400" /> : <CloudMoon {...props} className="text-indigo-300" />;
    if (code === 3) return <Cloud {...props} className="opacity-70" />;
    if (code <= 55) return <CloudDrizzle {...props} className="text-sky-400" />;
    if (code <= 65) return <CloudRain {...props} className="text-blue-500 animate-pulse" />;
    if (code <= 77) return <CloudSnow {...props} className="text-cyan-400" />;
    if (code <= 99) return <CloudLightning {...props} className="text-amber-500 animate-bounce" />;
    return <Sun {...props} />;
  };

  const displayHours = hourly.slice(0, 24);

  return (
    <div className="p-5 app-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider opacity-80">
          <Clock size={16} className="text-sky-500" />
          <span>24-Hour Timeline</span>
        </div>
        <span className="text-[10px] font-mono opacity-60">Scroll horizontally →</span>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar scroll-smooth">
        {displayHours.map((item, index) => {
          const isNow = index === 0;
          const isSevere = item.weatherCode >= 95 || item.pop >= 60;
          const formattedTime = isNow
            ? 'Now'
            : new Date(item.timestamp).toLocaleTimeString([], { hour: 'numeric' });

          return (
            <div
              key={item.time}
              className={`flex flex-col items-center justify-between min-w-[4.4rem] p-3 rounded-2xl border transition-all ${
                isNow
                  ? 'bg-sky-500 text-white border-sky-400 shadow-md font-bold'
                  : isSevere
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-500 font-semibold'
                  : 'bg-black/5 dark:bg-white/5 border-transparent hover:border-current/20'
              }`}
            >
              {/* Time */}
              <span className={`text-xs ${isNow ? 'font-black' : 'opacity-70 font-mono'}`}>
                {formattedTime}
              </span>

              {/* Icon */}
              <div className="my-2.5">{renderIcon(item.weatherCode, item.isDay)}</div>

              {/* Temp */}
              <span className="text-base font-extrabold mb-1">
                {formatTemp(item.temp, tempUnit)}
              </span>

              {/* Rain Chance */}
              <div
                className={`flex items-center gap-0.5 text-[10px] font-mono font-bold ${
                  item.pop > 30 ? 'text-sky-400' : 'opacity-50'
                }`}
              >
                <Umbrella size={10} />
                <span>{item.pop}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
