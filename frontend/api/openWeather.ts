import * as Location from 'expo-location';
import { supabase } from "@/lib/supabase";
import { WEATHER_API_URL } from './url';

let cachedLocation: { lat: number; lon: number } | null = null;

const getUserLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Location permission is required');
  }

  if (cachedLocation) {
    return cachedLocation;
  }

  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });

  cachedLocation = {
    lat: location.coords.latitude,
    lon: location.coords.longitude,
  };

  return cachedLocation;
};

export const getWeatherData = async () => {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  if (!token) {
      throw new Error('No auth token found');
  }
  
  const { lat, lon } = await getUserLocation();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(
      `${WEATHER_API_URL}?lat=${lat}&lon=${lon}`,
      {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        signal: controller.signal,
      }
    );

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to fetch weather');
    }

    return await res.json();
  } finally {
    clearTimeout(timeout);
  }
};