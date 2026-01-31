import * as Location from 'expo-location';

const API_KEY = 'f303e9c28e6428481ae9c03ec483279b';　// 一旦API KEY をここで置いときます。後で.envに移動します。

const getUserLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Location permission denied');
  }

  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });

  return {
    lat: location.coords.latitude,
    lon: location.coords.longitude,
  };
};

export const getWeatherData = async () => {
  const { lat, lon } = await getUserLocation();

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=ja&appid=${API_KEY}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch weather data');
  }

  return res.json();
};
