import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Play, Pause, Radio, Cloud, CloudRain } from 'lucide-react';
import { GlassCard } from '../../components/common/GlassCard';
import { useRainViewerQuery } from '../../hooks/useRainViewerQuery';
import { useSettingsStore } from '../../lib/store/useSettingsStore';
import { RainViewerFrame } from '../../lib/types/radar';

interface RadarMapProps {
  lat: number;
  lon: number;
  locationName: string;
}

export const RadarMap: React.FC<RadarMapProps> = ({ lat, lon, locationName }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<any>(null);
  const baseTileLayerRef = useRef<any>(null);
  const radarTileLayerRef = useRef<any>(null);

  const { bgColor } = useSettingsStore();
  const { data: rainData, isLoading } = useRainViewerQuery();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [selectedLayer, setSelectedLayer] = useState<'radar' | 'satellite'>('radar');

  const isLightMode = bgColor === 'light';
  const baseMapUrl = isLightMode
    ? 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

  // Combine past frames + nowcast frames for timeline
  const frames: RainViewerFrame[] = useMemo(() => {
    if (!rainData) return [];
    if (selectedLayer === 'satellite') {
      return rainData.satellite?.infrared || [];
    }
    const past = rainData.radar?.past || [];
    const nowcast = rainData.radar?.nowcast || [];
    return [...past, ...nowcast];
  }, [rainData, selectedLayer]);

  // Find index of the PRESENT live observation frame (latest recorded observation before nowcast)
  const presentIndex = useMemo(() => {
    if (!rainData) return 0;
    if (selectedLayer === 'satellite') {
      const infra = rainData.satellite?.infrared || [];
      return infra.length > 0 ? infra.length - 1 : 0;
    }
    const past = rainData.radar?.past || [];
    return past.length > 0 ? past.length - 1 : 0;
  }, [rainData, selectedLayer]);

  // Always default to PRESENT live conditions on initial load or layer switch
  useEffect(() => {
    if (frames.length > 0) {
      setCurrentFrameIndex(presentIndex);
    }
  }, [presentIndex, selectedLayer]);

  // Dynamic frame animation timer
  useEffect(() => {
    if (!isPlaying || frames.length === 0) return;

    const interval = setInterval(() => {
      setCurrentFrameIndex((prev) => (prev + 1) % frames.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [isPlaying, frames]);

  // Initialize Leaflet Map once
  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (!mapContainerRef.current) return;
      if (leafletMapRef.current) {
        leafletMapRef.current.setView([lat, lon], 7);
        return;
      }

      const L = await import('leaflet');

      if (isMounted && mapContainerRef.current && !leafletMapRef.current) {
        const map = L.map(mapContainerRef.current, {
          center: [lat, lon],
          zoom: 7,
          zoomControl: false,
          attributionControl: false,
        });

        // Base tile layer
        const baseLayer = L.tileLayer(baseMapUrl, {
          maxZoom: 19,
          subdomains: 'abcd',
        }).addTo(map);

        baseTileLayerRef.current = baseLayer;

        // Custom marker pin
        const customIcon = L.divIcon({
          className: 'custom-radar-pin',
          html: `<div class="w-4 h-4 bg-sky-500 rounded-full border-2 border-white shadow-[0_0_15px_#38bdf8] animate-ping"></div>`,
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        });

        L.marker([lat, lon], { icon: customIcon }).addTo(map);

        leafletMapRef.current = map;
      }
    }

    initMap();

    return () => {
      isMounted = false;
    };
  }, [lat, lon]);

  // Dynamic base map tile URL update on light/dark mode switch
  useEffect(() => {
    if (baseTileLayerRef.current) {
      baseTileLayerRef.current.setUrl(baseMapUrl);
    }
  }, [baseMapUrl]);

  // Smoothly update radar/cloud tile overlay URL
  useEffect(() => {
    async function updateTileOverlay() {
      if (!leafletMapRef.current || frames.length === 0 || !rainData?.host) return;

      const activeFrame = frames[currentFrameIndex] || frames[frames.length - 1];
      if (!activeFrame) return;

      const tilePath = activeFrame.path;
      const colorScheme = selectedLayer === 'satellite' ? '0' : '2';
      const options = selectedLayer === 'satellite' ? '0_1' : '1_1';
      const tileUrl = `${rainData.host}${tilePath}/256/{z}/{x}/{y}/${colorScheme}/${options}.png`;

      const L = await import('leaflet');

      if (!radarTileLayerRef.current) {
        const layer = L.tileLayer(tileUrl, {
          opacity: selectedLayer === 'satellite' ? 0.85 : 0.75,
          maxZoom: 19,
          tileSize: 256,
          zIndex: 10,
        });
        layer.addTo(leafletMapRef.current);
        radarTileLayerRef.current = layer;
      } else {
        radarTileLayerRef.current.setOpacity(selectedLayer === 'satellite' ? 0.85 : 0.75);
        radarTileLayerRef.current.setUrl(tileUrl);
      }
    }

    updateTileOverlay();
  }, [currentFrameIndex, frames, rainData, selectedLayer]);

  const activeFrame = frames[currentFrameIndex];
  const frameTimeStr = activeFrame
    ? new Date(activeFrame.time * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    : '--:--';
  const isPresent = currentFrameIndex === presentIndex;

  return (
    <GlassCard className="relative overflow-hidden p-0 sm:p-0">
      {/* Header Controls Overlay */}
      <div className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-color)] bg-[var(--surface-glass)] backdrop-blur-md">
        <div className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider">
          <Radio size={16} className="text-sky-500 animate-pulse" />
          <span>{selectedLayer === 'satellite' ? 'Satellite Cloud Imagery' : 'Live Rain Radar Map'}</span>
          {isPresent && (
            <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 rounded-full animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              LIVE NOW
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Layer switcher */}
          <div className="flex p-1 bg-[var(--nav-btn-bg)] border border-[var(--border-color)] rounded-xl text-xs font-semibold">
            <button
              onClick={() => setSelectedLayer('radar')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                selectedLayer === 'radar'
                  ? 'bg-[var(--text-primary)] text-[var(--bg-main)] font-bold shadow'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <CloudRain size={14} />
              <span>Rain Radar</span>
            </button>
            <button
              onClick={() => setSelectedLayer('satellite')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                selectedLayer === 'satellite'
                  ? 'bg-[var(--text-primary)] text-[var(--bg-main)] font-bold shadow'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <Cloud size={14} />
              <span>Clouds</span>
            </button>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative w-full h-[22rem] sm:h-[26rem] bg-[var(--bg-main)]">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-[var(--surface-glass)] backdrop-blur-md text-sm font-semibold">
            Loading Weather Radar Tiles...
          </div>
        )}
        <div ref={mapContainerRef} className="w-full h-full z-0" />
      </div>

      {/* Scrubber & Animation Control Footer */}
      <div className="p-4 bg-[var(--surface-glass)] backdrop-blur-md border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center gap-4">
        {/* Play/Pause Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          disabled={frames.length === 0}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--text-primary)] text-[var(--bg-main)] hover:opacity-90 text-xs font-bold rounded-xl shadow-lg transition-all shrink-0 w-full sm:w-auto"
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          <span>{isPlaying ? 'Pause' : 'Play Timeline Animation'}</span>
        </button>

        {/* Timeline Range Slider */}
        <div className="flex-1 w-full flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={frames.length - 1 || 0}
            value={currentFrameIndex}
            onChange={(e) => {
              setIsPlaying(false);
              setCurrentFrameIndex(Number(e.target.value));
            }}
            className="w-full h-2 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-sky-500"
          />

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-mono font-bold">
              {frameTimeStr}
            </span>
            {!isPresent && (
              <button
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentFrameIndex(presentIndex);
                }}
                className="text-[10px] font-bold px-2 py-0.5 bg-[var(--text-primary)] text-[var(--bg-main)] rounded-md transition-all shadow-sm"
              >
                Go Live
              </button>
            )}
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
