import { useState, useCallback } from 'react';

interface GeolocationState {
  loading: boolean;
  error: string | null;
  coordinates: { lat: number; lon: number } | null;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    loading: false,
    error: null,
    coordinates: null,
  });

  const getCurrentLocation = useCallback((onSuccess?: (lat: number, lon: number) => void) => {
    if (!navigator.geolocation) {
      setState({
        loading: false,
        error: 'Geolocation is not supported by your browser',
        coordinates: null,
      });
      return;
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setState({
          loading: false,
          error: null,
          coordinates: { lat, lon },
        });
        if (onSuccess) onSuccess(lat, lon);
      },
      (error) => {
        let msg = 'Unable to retrieve location';
        if (error.code === error.PERMISSION_DENIED) {
          msg = 'Location permission denied. Please search for your city manually.';
        }
        setState({
          loading: false,
          error: msg,
          coordinates: null,
        });
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  }, []);

  return { ...state, getCurrentLocation };
}
