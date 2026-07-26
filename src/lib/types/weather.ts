export interface CurrentWeather {
  temperature: number;
  feelsLike: number;
  apparentTemp: number;
  weatherCode: number;
  weatherDescription: string;
  isDay: boolean;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  pressure: number;
  uvIndex: number;
  visibility: number;
  dewPoint: number;
}

export interface HourlyForecastItem {
  time: string; // ISO or formatted
  timestamp: number;
  temp: number;
  feelsLike: number;
  humidity: number;
  pop: number; // Probability of precipitation %
  precipitation: number; // mm
  weatherCode: number;
  weatherDescription: string;
  isDay: boolean;
  windSpeed: number;
  uvIndex: number;
}

export interface DailyForecastItem {
  date: string; // YYYY-MM-DD
  dayName: string;
  weatherCode: number;
  weatherDescription: string;
  tempMax: number;
  tempMin: number;
  popMax: number; // Max precipitation chance %
  precipitationTotal: number;
  uvIndexMax: number;
  sunrise: string;
  sunset: string;
}

export interface WeatherData {
  latitude: number;
  longitude: number;
  timezone: string;
  elevation: number;
  current: CurrentWeather;
  minutelyPrecipitation?: { time: string; precipitation: number }[];
  hourly: HourlyForecastItem[];
  daily: DailyForecastItem[];
  sunrise: string;
  sunset: string;
}

export interface PrecipitationStatus {
  hasPrecipitation: boolean;
  summary: string;
  type: 'none' | 'starting' | 'ongoing' | 'stopping';
  minutesUntilStart?: number;
  intensity?: 'light' | 'moderate' | 'heavy';
}
