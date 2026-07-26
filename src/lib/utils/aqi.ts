import { AQIData, Pollutant } from '../types/airQuality';

export function calculateAQICategory(aqi: number): AQIData['category'] {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  return 'Hazardous';
}

export function getAQIColor(aqi: number): string {
  if (aqi <= 50) return '#10b981'; // Emerald / Green
  if (aqi <= 100) return '#f59e0b'; // Amber / Yellow
  if (aqi <= 150) return '#f97316'; // Orange
  if (aqi <= 200) return '#ef4444'; // Red
  if (aqi <= 300) return '#a855f7'; // Purple
  return '#9f1239'; // Maroon / Rose
}

export function getAQIHealthAdvice(category: AQIData['category']): string {
  switch (category) {
    case 'Good':
      return 'Air quality is satisfactory. Enjoy your outdoor activities!';
    case 'Moderate':
      return 'Air quality is acceptable. Unusually sensitive individuals should limit prolonged outdoor exertion.';
    case 'Unhealthy for Sensitive Groups':
      return 'Children, older adults, and individuals with respiratory issues should reduce outdoor exertion.';
    case 'Unhealthy':
      return 'Everyone may begin to experience health effects. Avoid prolonged outdoor physical activities.';
    case 'Very Unhealthy':
      return 'Health warnings of emergency conditions. Stay indoors and keep windows closed.';
    case 'Hazardous':
      return 'Serious risk of respiratory distress. Avoid all outdoor activities and use air purifiers indoors.';
  }
}

export function evaluatePollutant(
  name: string,
  code: string,
  val: number,
  unit: string,
  goodLimit: number,
  moderateLimit: number
): Pollutant {
  let status: Pollutant['status'] = 'good';
  if (val > moderateLimit * 2) status = 'unhealthy';
  else if (val > moderateLimit) status = 'unhealthy-sensitive';
  else if (val > goodLimit) status = 'moderate';

  const percentage = Math.min(Math.round((val / moderateLimit) * 100), 200);

  return {
    name,
    code,
    value: Math.round(val * 10) / 10,
    unit,
    status,
    percentageOfLimit: percentage,
  };
}
