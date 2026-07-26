import React from 'react';
import { Calendar, Umbrella, Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudDrizzle, CloudSun } from 'lucide-react';
import { DailyForecastItem } from '../../lib/types/weather';
import { useSettingsStore } from '../../lib/store/useSettingsStore';
import { formatTemp } from '../../lib/utils/temp';

interface DailyForecastProps {
  daily: DailyForecastItem[];
}

export const DailyForecast: React.FC<DailyForecastProps> = ({ daily }) => {
  const { tempUnit } = useSettingsStore();

  // Find min and max across entire 7 days for global visual anchoring
  const globalMin = Math.min(...daily.map((d) => d.tempMin));
  const globalMax = Math.max(...daily.map((d) => d.tempMax));
  const globalRange = globalMax - globalMin || 1;

  const renderIcon = (code: number) => {
    const props = { size: 18, className: 'shrink-0' };
    if (code === 0) return <Sun {...props} className="text-amber-500" />;
    if (code <= 2) return <CloudSun {...props} className="text-amber-400" />;
    if (code === 3) return <Cloud {...props} className="opacity-70" />;
    if (code <= 55) return <CloudDrizzle {...props} className="text-sky-400" />;
    if (code <= 65) return <CloudRain {...props} className="text-blue-500" />;
    if (code <= 77) return <CloudSnow {...props} className="text-cyan-400" />;
    if (code <= 99) return <CloudLightning {...props} className="text-yellow-500" />;
    return <Sun {...props} />;
  };

  return (
    <div className="p-5 app-card h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-current/10">
        <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider opacity-80">
          <Calendar size={16} className="text-sky-500" />
          <span>7-Day Comparative Temperature Outlook</span>
        </div>
        <span className="text-[10px] font-mono opacity-60">
          Range: {formatTemp(globalMin, tempUnit)} – {formatTemp(globalMax, tempUnit)}
        </span>
      </div>

      <div className="space-y-3 flex-1 flex flex-col justify-around">
        {daily.map((item, index) => {
          // Calculate exact left offset and bar width relative to global 7-day range
          const leftPercent = ((item.tempMin - globalMin) / globalRange) * 100;
          const widthPercent = Math.max(((item.tempMax - item.tempMin) / globalRange) * 100, 8);

          return (
            <div
              key={item.date}
              className="grid grid-cols-12 items-center gap-2 p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              {/* Day Name */}
              <div className="col-span-3">
                <p className="text-sm font-bold">
                  {index === 0 ? 'Today' : item.dayName}
                </p>
                <p className="text-[10px] opacity-60 truncate">{item.weatherDescription}</p>
              </div>

              {/* Icon & Rain chance */}
              <div className="col-span-3 flex items-center gap-1.5">
                {renderIcon(item.weatherCode)}
                {item.popMax > 20 && (
                  <span className="text-[11px] font-semibold text-sky-500 flex items-center gap-0.5 font-mono">
                    <Umbrella size={10} />
                    {item.popMax}%
                  </span>
                )}
              </div>

              {/* Globally Anchored Temperature Range Bar */}
              <div className="col-span-6 flex items-center gap-2">
                <span className="text-xs font-mono font-semibold opacity-70 w-8 text-right">
                  {formatTemp(item.tempMin, tempUnit)}
                </span>

                {/* Track Bar */}
                <div className="flex-1 h-2 bg-black/10 dark:bg-white/10 rounded-full relative overflow-hidden">
                  <div
                    className="absolute h-full rounded-full bg-gradient-to-r from-sky-400 via-amber-400 to-orange-500 shadow-sm"
                    style={{
                      left: `${leftPercent}%`,
                      width: `${widthPercent}%`,
                    }}
                  />
                </div>

                <span className="text-xs font-mono font-bold w-8">
                  {formatTemp(item.tempMax, tempUnit)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
