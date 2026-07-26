import React, { useMemo } from 'react';
import { CloudRain, Umbrella, CheckCircle2 } from 'lucide-react';
import { HourlyForecastItem } from '../../lib/types/weather';
import { calculatePrecipitationStatus } from '../../lib/utils/rainLogic';

interface RainSparklineProps {
  hourly: HourlyForecastItem[];
  minutelyPrecipitation?: { time: string; precipitation: number }[];
}

export const RainSparkline: React.FC<RainSparklineProps> = ({ hourly, minutelyPrecipitation }) => {
  const status = useMemo(() => calculatePrecipitationStatus(hourly), [hourly]);

  // Construct 12 bars representing next 60 minutes (every 5 mins) or 12 hours
  const barsData = useMemo(() => {
    if (minutelyPrecipitation && minutelyPrecipitation.length >= 12) {
      return minutelyPrecipitation.slice(0, 12).map((item) => ({
        label: new Date(item.time).toLocaleTimeString([], { minute: '2-digit' }),
        val: item.precipitation,
      }));
    }

    return hourly.slice(0, 12).map((item) => ({
      label: new Date(item.timestamp).toLocaleTimeString([], { hour: 'numeric' }),
      val: item.precipitation,
    }));
  }, [hourly, minutelyPrecipitation]);

  const maxVal = Math.max(...barsData.map((b) => b.val), 0.5);

  return (
    <div className="p-4 app-card">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-sky-500/20 rounded-xl text-sky-400">
            <CloudRain size={18} />
          </div>
          <div>
            <h4 className="font-bold text-sm leading-tight">{status.summary}</h4>
            <p className="text-xs opacity-60">60-Minute Precipitation Sparkline (mm/h)</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold px-2.5 py-1 bg-black/5 dark:bg-white/10 rounded-full">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
          <span>Live Radar Forecast</span>
        </div>
      </div>

      {/* 60-Minute Sparkline Bar Chart */}
      <div className="pt-2">
        <div className="h-16 flex items-end justify-between gap-1.5 px-1 border-b border-current/10 pb-1">
          {barsData.map((bar, i) => {
            const heightPct = Math.min((bar.val / maxVal) * 100, 100);
            const isZero = bar.val <= 0.05;

            return (
              <div key={i} className="flex-1 flex flex-col items-center group relative">
                {/* Tooltip on Hover */}
                <div className="absolute -top-7 opacity-0 group-hover:opacity-100 bg-black text-white dark:bg-white dark:text-black text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shadow pointer-events-none transition-opacity">
                  {bar.val.toFixed(1)}mm
                </div>

                <div className="w-full bg-black/5 dark:bg-white/5 rounded-t-sm h-full flex items-end">
                  <div
                    className={`w-full rounded-t-sm transition-all duration-500 ${
                      isZero
                        ? 'bg-sky-400/20 h-1'
                        : 'bg-gradient-to-t from-sky-600 to-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.5)]'
                    }`}
                    style={{ height: isZero ? '4px' : `${Math.max(heightPct, 15)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between text-[10px] opacity-60 pt-1 font-mono">
          <span>Now</span>
          <span>+30 min</span>
          <span>+60 min</span>
        </div>
      </div>
    </div>
  );
};
