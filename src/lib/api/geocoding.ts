import { LocationResult } from '../types/location';

export async function searchLocations(query: string): Promise<LocationResult[]> {
  if (!query || query.trim().length < 2) return [];

  const params = new URLSearchParams({
    name: query.trim(),
    count: '10',
    language: 'en',
    format: 'json',
  });

  const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to search locations');
  }

  const data = await response.json();
  return data.results || [];
}
