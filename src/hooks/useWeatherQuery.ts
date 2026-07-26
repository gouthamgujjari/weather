import { useQuery } from '@tanstack/react-query';
import { fetchWeatherData } from '../lib/api/openMeteo';
import { WeatherData } from '../lib/types/weather';

export function useWeatherQuery(lat: number, lon: number) {
  return useQuery<WeatherData, Error>({
    queryKey: ['weather', lat, lon],
    queryFn: () => fetchWeatherData(lat, lon),
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    refetchInterval: 10 * 60 * 1000,
    retry: 2,
  });
}
