export interface LocationResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  feature_code?: string;
  country_code?: string;
  admin1?: string; // State/Province
  admin2?: string;
  country?: string;
  timezone: string;
  population?: number;
}

export interface SavedLocation {
  id: string;
  name: string;
  country?: string;
  admin1?: string;
  lat: number;
  lon: number;
  isHome?: boolean;
}
