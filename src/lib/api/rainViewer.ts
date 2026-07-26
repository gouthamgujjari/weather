import { RainViewerData } from '../types/radar';

export async function fetchRainViewerData(): Promise<RainViewerData> {
  const response = await fetch('https://api.rainviewer.com/public/weather-maps.json');
  if (!response.ok) {
    throw new Error('Failed to fetch RainViewer radar tiles data');
  }

  return response.json();
}
