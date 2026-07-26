export type TempUnit = 'C' | 'F';
export type SpeedUnit = 'kmh' | 'mph' | 'ms';

export function formatTemp(celsius: number, unit: TempUnit = 'C'): string {
  if (unit === 'F') {
    const f = (celsius * 9) / 5 + 32;
    return `${Math.round(f)}°`;
  }
  return `${Math.round(celsius)}°`;
}

export function formatSpeed(kmh: number, unit: SpeedUnit = 'kmh'): string {
  if (unit === 'mph') {
    return `${Math.round(kmh * 0.621371)} mph`;
  }
  if (unit === 'ms') {
    return `${Math.round(kmh / 3.6)} m/s`;
  }
  return `${Math.round(kmh)} km/h`;
}

export function getWindDirectionLabel(degree: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round((degree % 360) / 22.5);
  return directions[index % 16];
}

export function getUVLevel(uvIndex: number): { label: string; color: string; advice: string } {
  if (uvIndex <= 2) return { label: 'Low', color: '#10b981', advice: 'Minimal sun protection required.' };
  if (uvIndex <= 5) return { label: 'Moderate', color: '#f59e0b', advice: 'Wear sunglasses and SPF 30+.' };
  if (uvIndex <= 7) return { label: 'High', color: '#f97316', advice: 'Cover up, stay in shade near midday.' };
  if (uvIndex <= 10) return { label: 'Very High', color: '#ef4444', advice: 'Extra protection needed. Avoid sun 11-4.' };
  return { label: 'Extreme', color: '#8b5cf6', advice: 'Avoid outdoor sun exposure.' };
}
