import React, { useMemo } from 'react';
import { CloudRain, Umbrella, CheckCircle2 } from 'lucide-react';
import { HourlyForecastItem } from '../../lib/types/weather';
import { calculatePrecipitationStatus } from '../../lib/utils/rainLogic';

interface RainIndicatorBannerProps {
  hourly: HourlyForecastItem[];
}

export const RainIndicatorBanner: React.FC<RainIndicatorBannerProps> = ({ hourly }) => {
  const status = useMemo(() => calculatePrecipitationStatus(hourly), [hourly]);

  if (!status.hasPrecipitation) {
    return (
      <div className="flex items-center gap-3 px-4 py-3 bg-emerald-950/40 border border-emerald-500/20 rounded-2xl text-emerald-200 text-sm backdrop-blur-md">
        <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
        <span className="font-medium">{status.summary}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 bg-gradient-to-r from-blue-950/80 via-sky-950/60 to-slate-900/80 border border-sky-500/30 rounded-2xl text-sky-100 text-sm backdrop-blur-md shadow-lg shadow-sky-900/20">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-sky-500/20 rounded-xl text-sky-400">
          <CloudRain size={20} className="animate-bounce" />
        </div>
        <div>
          <p className="font-semibold text-white">{status.summary}</p>
          <p className="text-xs text-sky-300">Live minutely precipitation radar active</p>
        </div>
      </div>
      <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-sky-500/10 border border-sky-400/20 rounded-full text-xs text-sky-300">
        <Umbrella size={14} />
        <span>Rain Alert</span>
      </div>
    </div>
  );
};
