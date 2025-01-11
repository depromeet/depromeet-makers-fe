import { useEffect, useState } from 'react';

interface Location {
  loaded: boolean;
  coordinates: Pick<GeolocationPosition['coords'], 'latitude' | 'longitude'>;
  error?: Pick<GeolocationPositionError, 'code' | 'message'>;
}

export const useGeolocation = () => {
  const [location, setLocation] = useState<Location>({
    loaded: false,
    coordinates: { latitude: 0, longitude: 0 },
  });

  const onSuccess = (location: GeolocationPosition) => {
    setLocation({
      loaded: true,
      coordinates: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    });
  };

  const onError = (error: Location['error']) => {
    setLocation({
      loaded: true,
      coordinates: { latitude: 0, longitude: 0 },
      error,
    });
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      onError({
        code: 0,
        message: '현재 브라우저가 위치 정보를 지원하지 않습니다.',
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location.coordinates;
};
