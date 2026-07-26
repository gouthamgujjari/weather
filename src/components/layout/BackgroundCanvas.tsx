import React, { useMemo } from 'react';
import { getWeatherCodeInfo } from '../../lib/utils/weatherTheme';
import { useSettingsStore } from '../../lib/store/useSettingsStore';

interface BackgroundCanvasProps {
  weatherCode?: number;
  isDay?: boolean;
}

export const BackgroundCanvas: React.FC<BackgroundCanvasProps> = ({
  weatherCode = 0,
  isDay = true,
}) => {
  const { reducedMotion, bgColor } = useSettingsStore();

  const themeInfo = useMemo(() => {
    return getWeatherCodeInfo(weatherCode, isDay);
  }, [weatherCode, isDay]);

  const isLightMode = bgColor === 'light';

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      {/* Dynamic Monochrome Atmospheric Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${themeInfo.gradient} opacity-30 transition-colors duration-1000 ease-in-out`}
      />

      {/* Senior Designer Monochrome Radial Ambient Glows (White & Black Only) */}
      <div
        className={`absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl ${
          isLightMode ? 'bg-black/10' : 'bg-white/10'
        }`}
      />
      <div
        className={`absolute top-1/2 -right-40 w-[30rem] h-[30rem] rounded-full blur-3xl ${
          isLightMode ? 'bg-zinc-400/10' : 'bg-zinc-800/20'
        }`}
      />

      {/* Trending Monochrome Dot Matrix Grid (White Dots on Black / Black Dots on White) */}
      <div
        className={`absolute inset-0 ${
          isLightMode
            ? 'opacity-15 bg-[radial-gradient(#000000_1.5px,transparent_1.5px)]'
            : 'opacity-25 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)]'
        } [background-size:24px_24px]`}
      />

      {/* Particle & Rain overlay in Pure White & Black */}
      {!reducedMotion && (
        <>
          {themeInfo.bgType === 'rain' && (
            <div
              className={`absolute inset-0 opacity-20 ${
                isLightMode
                  ? 'bg-[radial-gradient(#000000_1.5px,transparent_1.5px)]'
                  : 'bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)]'
              } [background-size:16px_32px] animate-pulse`}
            />
          )}

          {themeInfo.bgType === 'clear-night' && (
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:20px_20px]" />
          )}

          {themeInfo.bgType === 'snow' && (
            <div
              className={`absolute inset-0 opacity-30 ${
                isLightMode
                  ? 'bg-[radial-gradient(#000000_2px,transparent_2px)]'
                  : 'bg-[radial-gradient(#ffffff_2px,transparent_2px)]'
              } [background-size:28px_28px] animate-pulse`}
            />
          )}
        </>
      )}

      {/* Glass contrast vignette overlay */}
      <div
        className={`absolute inset-0 ${
          isLightMode ? 'bg-white/10' : 'bg-black/40'
        } backdrop-blur-[2px]`}
      />
    </div>
  );
};

