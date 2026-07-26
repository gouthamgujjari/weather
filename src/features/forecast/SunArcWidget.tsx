import React, { useMemo } from 'react';
import { Sunrise, Sunset, Sun } from 'lucide-react';
import { GlassCard } from '../../components/common/GlassCard';
import { getSunProgress, formatHourTime } from '../../lib/utils/date';

interface SunArcWidgetProps {
  sunrise: string;
  sunset: string;
  timezone: string;
}

export const SunArcWidget: React.FC<SunArcWidgetProps> = ({ sunrise, sunset, timezone }) => {
  const { progress, isDay } = useMemo(() => getSunProgress(sunrise, sunset), [sunrise, sunset]);

  // SVG arc calculation (semi-circle path)
  const radius = 70;
  const strokeWidth = 6;
  const pathLength = Math.PI * radius;
  const strokeDashoffset = pathLength - (progress / 100) * pathLength;

  return (
    <GlassCard className="flex flex-col justify-between">
      <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider opacity-80 mb-2">
        <Sun size={16} className="text-amber-500" />
        <span>Sun & Daylight Arc</span>
      </div>

      <div className="relative flex flex-col items-center justify-center my-4">
        {/* SVG Semi-Circle */}
        <svg className="w-56 h-32 overflow-visible" viewBox="0 0 160 90">
          {/* Background Arc */}
          <path
            d="M 10,85 A 70,70 0 0,1 150,85"
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.15}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray="4 4"
          />

          {/* Active Sun Progress Arc */}
          <path
            d="M 10,85 A 70,70 0 0,1 150,85"
            fill="none"
            stroke="url(#sun-gradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={pathLength}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />

          <defs>
            <linearGradient id="sun-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Label */}
        <div className="absolute bottom-2 text-center">
          <p className="text-xs opacity-60 font-medium">{isDay ? 'Daylight Status' : 'Night Time'}</p>
          <p className="text-lg font-bold text-amber-500">
            {isDay ? `${Math.round(progress)}% of daylight` : 'Sun below horizon'}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-current/10 text-xs">
        <div className="flex items-center gap-2">
          <Sunrise size={16} className="text-amber-500" />
          <div>
            <p className="opacity-60">Sunrise</p>
            <p className="font-semibold">
              {formatHourTime(new Date(sunrise).getTime(), timezone)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-right">
          <div>
            <p className="opacity-60">Sunset</p>
            <p className="font-semibold">
              {formatHourTime(new Date(sunset).getTime(), timezone)}
            </p>
          </div>
          <Sunset size={16} className="text-orange-500" />
        </div>
      </div>
    </GlassCard>
  );
};
