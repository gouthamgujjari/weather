import React from 'react';
import { Cloud, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-white/10 py-8 px-4 text-center text-xs text-slate-400 backdrop-blur-md bg-slate-950/60">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-600/20 text-sky-400 rounded-lg">
            <Cloud size={16} />
          </div>
          <span className="font-bold text-white text-sm">WeatherView Pro</span>
          <span className="text-[10px] bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full font-mono">
            v2.0 PWA
          </span>
        </div>

        <p className="flex items-center gap-1.5">
          Powered by <span className="text-white font-semibold">Open-Meteo API</span> &{' '}
          <span className="text-white font-semibold">RainViewer Radar</span>
        </p>

        <p className="text-slate-300 font-medium">
          Created with <Heart size={13} className="inline text-rose-500 fill-current mx-0.5 animate-pulse" /> by{' '}
          <span className="text-white font-bold bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">
            Goutham Gujjari
          </span>
        </p>
      </div>
    </footer>
  );
};
