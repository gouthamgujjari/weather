import React from 'react';
import { Wind, ShieldAlert, Activity } from 'lucide-react';
import { GlassCard } from '../../components/common/GlassCard';
import { AQIData } from '../../lib/types/airQuality';
import { useSettingsStore } from '../../lib/store/useSettingsStore';

interface AQICardProps {
  aqiData: AQIData;
}

export const AQICard: React.FC<AQICardProps> = ({ aqiData }) => {
  const { aqiScale } = useSettingsStore();

  const displayVal = aqiScale === 'EUROPEAN' ? aqiData.aqiEuropean : aqiData.aqiUs;
  const maxVal = aqiScale === 'EUROPEAN' ? 100 : 300;
  const percentage = Math.min(Math.round((displayVal / maxVal) * 100), 100);

  const pollutants = Object.values(aqiData.pollutants);

  return (
    <GlassCard>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider opacity-80">
          <Activity size={16} className="text-emerald-500" />
          <span>Air Quality Index ({aqiScale === 'EUROPEAN' ? 'CAQI' : 'US EPA'})</span>
        </div>
        <span
          className="px-2.5 py-1 rounded-full text-xs font-bold text-slate-950 shadow"
          style={{ backgroundColor: aqiData.color }}
        >
          {aqiData.category}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Main AQI Dial / Gauge */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-4 glass-panel-inner rounded-3xl">
          <div className="relative flex flex-col items-center">
            <span className="text-5xl font-extrabold">{displayVal}</span>
            <span className="text-xs opacity-60 font-medium mt-1">AQI Level</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2.5 bg-black/10 dark:bg-white/10 rounded-full mt-4 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${percentage}%`,
                backgroundColor: aqiData.color,
              }}
            />
          </div>

          <div className="flex justify-between w-full text-[10px] opacity-60 mt-1">
            <span>0 Good</span>
            <span>{maxVal}+ Hazard</span>
          </div>
        </div>

        {/* Health Advisory & Guidance */}
        <div className="md:col-span-8 space-y-4">
          <div className="p-3.5 glass-panel-inner rounded-2xl flex items-start gap-3">
            <ShieldAlert size={20} className="text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm leading-relaxed opacity-90">
              {aqiData.healthGuidance}
            </p>
          </div>

          {/* Pollutant Breakdown Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {pollutants.map((p) => (
              <div key={p.code} className="p-2.5 glass-panel-inner rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold opacity-80">{p.code}</span>
                  <span className="text-[10px] opacity-60">{p.unit}</span>
                </div>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-sm font-bold">{p.value}</span>
                  <span className="text-[10px] font-medium opacity-60 truncate max-w-[50%]">
                    {p.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
