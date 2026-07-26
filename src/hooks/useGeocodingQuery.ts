import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchLocations } from '../lib/api/geocoding';

export function useGeocodingQuery(searchTerm: string) {
  const [debouncedQuery, setDebouncedQuery] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchTerm);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  return useQuery({
    queryKey: ['geocoding', debouncedQuery],
    queryFn: () => searchLocations(debouncedQuery),
    enabled: debouncedQuery.trim().length >= 2,
    staleTime: 60 * 60 * 1000, // 1 hour cache
  });
}
