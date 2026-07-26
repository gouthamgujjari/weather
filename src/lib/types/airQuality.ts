export interface Pollutant {
  name: string;
  code: string;
  value: number;
  unit: string;
  status: 'good' | 'moderate' | 'unhealthy-sensitive' | 'unhealthy' | 'very-unhealthy' | 'hazardous';
  percentageOfLimit: number;
}

export type AQIScale = 'US_EPA' | 'EUROPEAN';

export interface AQIData {
  aqiUs: number;
  aqiEuropean: number;
  category: 'Good' | 'Moderate' | 'Unhealthy for Sensitive Groups' | 'Unhealthy' | 'Very Unhealthy' | 'Hazardous';
  color: string; // Tailwind hex / class
  healthGuidance: string;
  pollutants: {
    pm2_5: Pollutant;
    pm10: Pollutant;
    o3: Pollutant;
    no2: Pollutant;
    so2: Pollutant;
    co: Pollutant;
  };
  hourlyTrend: {
    time: string;
    aqiUs: number;
    pm2_5: number;
    pm10: number;
  }[];
}
