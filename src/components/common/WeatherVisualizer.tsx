import React from 'react';
import { motion } from 'framer-motion';

interface WeatherVisualizerProps {
  weatherCode: number;
  isDay: boolean;
  className?: string;
}

export const WeatherVisualizer: React.FC<WeatherVisualizerProps> = ({
  weatherCode,
  isDay,
  className = '',
}) => {
  // Determine weather category
  const isClear = weatherCode === 0 || weatherCode === 1;
  const isCloudy = weatherCode === 2 || weatherCode === 3;
  const isFog = weatherCode === 45 || weatherCode === 48;
  const isRain = (weatherCode >= 51 && weatherCode <= 67) || (weatherCode >= 80 && weatherCode <= 82);
  const isSnow = (weatherCode >= 71 && weatherCode <= 77) || (weatherCode >= 85 && weatherCode <= 86);
  const isThunder = weatherCode >= 95;

  return (
    <div className={`relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center pointer-events-none select-none ${className}`}>
      {/* 1. Clear Sun / Moon Animation */}
      {isClear && isDay && (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Pulsing Solar Aura */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-28 h-28 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full blur-2xl opacity-70"
          />
          {/* Rotating Sun Rays */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute w-36 h-36 border-2 border-dashed border-amber-300/40 rounded-full"
          />
          {/* Glowing Sun Core */}
          <motion.div
            animate={{ scale: [0.98, 1.04, 0.98] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="w-24 h-24 bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-200 rounded-full shadow-[0_0_50px_rgba(251,191,36,0.8)] border border-amber-200/50"
          />
        </div>
      )}

      {isClear && !isDay && (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Moon Glow Aura */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-28 h-28 bg-indigo-500 rounded-full blur-2xl opacity-50"
          />
          {/* Moon Disc */}
          <motion.div
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-24 h-24 bg-gradient-to-tr from-indigo-300 via-slate-100 to-white rounded-full shadow-[0_0_40px_rgba(165,180,252,0.6)] flex items-center justify-center"
          >
            {/* Crater details */}
            <div className="absolute top-4 left-5 w-4 h-4 bg-indigo-200/40 rounded-full" />
            <div className="absolute bottom-5 right-6 w-5 h-5 bg-indigo-200/30 rounded-full" />
          </motion.div>

          {/* Twinkling Stars */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.4 }}
              className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_#fff]"
              style={{
                top: `${15 + (i * 25) % 70}%`,
                left: `${10 + (i * 35) % 80}%`,
              }}
            />
          ))}
        </div>
      )}

      {/* 2. Clouds / Overcast */}
      {(isCloudy || isFog) && (
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            animate={{ x: [-8, 8, -8] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-6 left-2 w-28 h-16 bg-slate-300/40 backdrop-blur-md rounded-full shadow-lg"
          />
          <motion.div
            animate={{ x: [8, -8, 8] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-36 h-20 bg-gradient-to-b from-slate-200 to-slate-400 rounded-full shadow-2xl border border-white/20"
          />
        </div>
      )}

      {/* 3. Rain / Shower Animation */}
      {(isRain || isThunder) && (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          {/* Thunder Lightning Flash */}
          {isThunder && (
            <motion.div
              animate={{ opacity: [0, 1, 0, 0.8, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              className="absolute inset-0 bg-amber-300/20 rounded-full blur-xl"
            />
          )}

          {/* Storm Cloud Base */}
          <motion.div
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="w-36 h-16 bg-gradient-to-b from-slate-700 via-slate-800 to-sky-950 rounded-full shadow-2xl border border-slate-600/40 relative z-10"
          />

          {/* Falling Raindrops */}
          <div className="relative w-32 h-16 overflow-hidden flex justify-around pt-1">
            {[...Array(7)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: [0, 45], opacity: [0, 1, 0] }}
                transition={{
                  duration: 0.7 + (i % 3) * 0.2,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: i * 0.12,
                }}
                className="w-1 h-4 bg-gradient-to-b from-sky-300 to-blue-500 rounded-full shadow-[0_0_6px_#38bdf8]"
              />
            ))}
          </div>
        </div>
      )}

      {/* 4. Snow Animation */}
      {isSnow && (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          <motion.div
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-36 h-16 bg-gradient-to-b from-slate-600 to-slate-800 rounded-full shadow-xl border border-cyan-300/30 relative z-10"
          />

          {/* Swaying Snowflakes */}
          <div className="relative w-32 h-16 overflow-hidden flex justify-around">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, 45],
                  x: [0, (i % 2 === 0 ? 8 : -8), 0],
                  rotate: [0, 360],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.8 + (i % 3) * 0.3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.2,
                }}
                className="w-2.5 h-2.5 bg-cyan-100 rounded-full shadow-[0_0_8px_#a5f3fc]"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
