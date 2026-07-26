import { useQuery } from '@tanstack/react-query';
import { fetchAirQualityData } from '../lib/api/airQuality';
import { AQIData } from '../lib/types/airQuality';

export function useAQIQuery(lat: number, lon: number) {
  return useQuery<AQIData, Error>({
    queryKey: ['air-quality', lat, lon],
    queryFn: () => fetchAirQualityData(lat, lon),
    staleTime: 10 * 60 * 1000, // 10 minutes cache
    refetchInterval: 15 * 60 * 1000,
    retry: 2,
  });
}
