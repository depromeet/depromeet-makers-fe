'use client';

import type { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk';

import { Skeleton } from '@/components/ui/skeleton';

import type { MarkerType } from '../(context)/kakao-map-context';
import { useKaKaoMap } from '../(context)/kakao-map-context';

import { KaKaoMapSearch } from './kakao-map-search';

interface KaKaoMapFormProps<T extends FieldValues = FieldValues> extends ControllerRenderProps<T, FieldPath<T>> {}

export const KaKaoMapForm = ({ onChange }: KaKaoMapFormProps) => {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY ?? '',
    libraries: ['clusterer', 'drawing', 'services'],
  });
  const { markers, selectedPlace, setSelectedPlace } = useKaKaoMap();

  const handleSelectPlace = (place: MarkerType) => {
    setSelectedPlace(place);
    onChange({
      id: place.id,
      title: place.placeName,
      address: place.addressName,
      latitude: place.position.lat,
      longitude: place.position.lng,
    });
  };

  if (loading || error) return <Skeleton className="w-full h-[350px]" />;

  return (
    <div className="flex flex-col-reverse gap-2">
      <Map
        center={{
          lat: 33.5563,
          lng: 126.79581,
        }}
        className="w-full h-[350px]"
        level={3}
      >
        <KaKaoMapSearch />

        {markers.map((marker) => (
          <MapMarker key={marker.id} position={marker.position} onClick={() => handleSelectPlace(marker)}>
            {selectedPlace && selectedPlace.placeName === marker.placeName && (
              <div className="p-2 rounded-md border-gray-50">{marker.placeName}</div>
            )}
          </MapMarker>
        ))}
      </Map>
    </div>
  );
};
