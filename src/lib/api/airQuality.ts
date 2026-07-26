import { AQIData } from '../types/airQuality';
import { calculateAQICategory, getAQIColor, getAQIHealthAdvice, evaluatePollutant } from '../utils/aqi';

export async function fetchAirQualityData(lat: number, lon: number): Promise<AQIData> {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    current: [
      'us_aqi',
      'european_aqi',
      'pm10',
      'pm2_5',
      'carbon_monoxide',
      'nitrogen_dioxide',
      'sulphur_dioxide',
      'ozone',
    ].join(','),
    hourly: ['us_aqi', 'pm2_5', 'pm10'].join(','),
    timezone: 'auto',
    forecast_days: '2',
  });

  const response = await fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch air quality data');
  }

  const data = await response.json();
  const current = data.current || {};
  const aqiUs = Math.round(current.us_aqi || 35);
  const aqiEuropean = Math.round(current.european_aqi || 20);

  const category = calculateAQICategory(aqiUs);
  const color = getAQIColor(aqiUs);
  const healthGuidance = getAQIHealthAdvice(category);

  // Pollutant calculations (reference thresholds based on WHO / EPA 24h limits)
  const pm2_5 = evaluatePollutant('Fine Particles', 'PM2.5', current.pm2_5 || 12, 'µg/m³', 15, 35);
  const pm10 = evaluatePollutant('Coarse Particles', 'PM10', current.pm10 || 24, 'µg/m³', 45, 150);
  const o3 = evaluatePollutant('Ozone', 'O₃', current.ozone || 40, 'µg/m³', 100, 160);
  const no2 = evaluatePollutant('Nitrogen Dioxide', 'NO₂', current.nitrogen_dioxide || 15, 'µg/m³', 25, 100);
  const so2 = evaluatePollutant('Sulphur Dioxide', 'SO₂', current.sulphur_dioxide || 5, 'µg/m³', 40, 125);
  const co = evaluatePollutant('Carbon Monoxide', 'CO', (current.carbon_monoxide || 250) / 1000, 'mg/m³', 4, 10);

  const hourlyTrend = (data.hourly?.time || []).slice(0, 24).map((t: string, i: number) => ({
    time: new Date(t).toLocaleTimeString([], { hour: 'numeric' }),
    aqiUs: Math.round(data.hourly.us_aqi[i] || aqiUs),
    pm2_5: Math.round(data.hourly.pm2_5[i] || current.pm2_5 || 10),
    pm10: Math.round(data.hourly.pm10[i] || current.pm10 || 20),
  }));

  return {
    aqiUs,
    aqiEuropean,
    category,
    color,
    healthGuidance,
    pollutants: {
      pm2_5,
      pm10,
      o3,
      no2,
      so2,
      co,
    },
    hourlyTrend,
  };
}
