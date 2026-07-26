import { useQuery } from '@tanstack/react-query';
import { fetchRainViewerData } from '../lib/api/rainViewer';
import { RainViewerData } from '../lib/types/radar';

export function useRainViewerQuery() {
  return useQuery<RainViewerData, Error>({
    queryKey: ['rain-viewer-tiles'],
    queryFn: fetchRainViewerData,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });
}
