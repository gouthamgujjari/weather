import { WeatherData, CurrentWeather, HourlyForecastItem, DailyForecastItem } from '../types/weather';
import { getWeatherCodeInfo } from '../utils/weatherTheme';

export async function fetchWeatherData(lat: number, lon: number): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'is_day',
      'precipitation',
      'weather_code',
      'surface_pressure',
      'wind_speed_10m',
      'wind_direction_10m',
      'dew_point_2m',
    ].join(','),
    hourly: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'precipitation_probability',
      'precipitation',
      'weather_code',
      'wind_speed_10m',
      'uv_index',
      'is_day',
    ].join(','),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'sunrise',
      'sunset',
      'uv_index_max',
      'precipitation_sum',
      'precipitation_probability_max',
    ].join(','),
    minutely_15: ['precipitation'].join(','),
    timezone: 'auto',
    forecast_days: '7',
  });

  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch weather forecast data');
  }

  const data = await response.json();

  const current: CurrentWeather = {
    temperature: data.current.temperature_2m,
    feelsLike: data.current.apparent_temperature,
    apparentTemp: data.current.apparent_temperature,
    weatherCode: data.current.weather_code,
    weatherDescription: getWeatherCodeInfo(data.current.weather_code, Boolean(data.current.is_day)).description,
    isDay: Boolean(data.current.is_day),
    humidity: data.current.relative_humidity_2m,
    windSpeed: data.current.wind_speed_10m,
    windDirection: data.current.wind_direction_10m,
    pressure: data.current.surface_pressure,
    uvIndex: data.hourly?.uv_index?.[0] || 0,
    visibility: 10000, // Open-Meteo default estimate
    dewPoint: data.current.dew_point_2m || 0,
  };

  const hourly: HourlyForecastItem[] = (data.hourly.time || []).map((timeStr: string, index: number) => {
    const timestamp = new Date(timeStr).getTime();
    const code = data.hourly.weather_code[index];
    const isDay = Boolean(data.hourly.is_day[index]);

    return {
      time: timeStr,
      timestamp,
      temp: data.hourly.temperature_2m[index],
      feelsLike: data.hourly.apparent_temperature[index],
      humidity: data.hourly.relative_humidity_2m[index],
      pop: data.hourly.precipitation_probability[index] || 0,
      precipitation: data.hourly.precipitation[index] || 0,
      weatherCode: code,
      weatherDescription: getWeatherCodeInfo(code, isDay).description,
      isDay,
      windSpeed: data.hourly.wind_speed_10m[index],
      uvIndex: data.hourly.uv_index[index] || 0,
    };
  });

  const daily: DailyForecastItem[] = (data.daily.time || []).map((dateStr: string, index: number) => {
    const code = data.daily.weather_code[index];
    const dayName = new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short' });

    return {
      date: dateStr,
      dayName,
      weatherCode: code,
      weatherDescription: getWeatherCodeInfo(code, true).description,
      tempMax: data.daily.temperature_2m_max[index],
      tempMin: data.daily.temperature_2m_min[index],
      popMax: data.daily.precipitation_probability_max[index] || 0,
      precipitationTotal: data.daily.precipitation_sum[index] || 0,
      uvIndexMax: data.daily.uv_index_max[index] || 0,
      sunrise: data.daily.sunrise[index],
      sunset: data.daily.sunset[index],
    };
  });

  const minutelyPrecipitation = (data.minutely_15?.time || []).map((timeStr: string, i: number) => ({
    time: timeStr,
    precipitation: data.minutely_15.precipitation[i] || 0,
  }));

  return {
    latitude: data.latitude,
    longitude: data.longitude,
    timezone: data.timezone,
    elevation: data.elevation,
    current,
    minutelyPrecipitation,
    hourly: hourly.slice(0, 48), // Next 48 hours
    daily,
    sunrise: data.daily.sunrise[0],
    sunset: data.daily.sunset[0],
  };
}
