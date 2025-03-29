import { useState } from 'react';
import { useMap } from 'react-kakao-maps-sdk';

import { useKaKaoMap } from '../(context)/kakao-map-context';

export const useKaKaoMapSearch = () => {
  const map = useMap();
  const { setMarkers } = useKaKaoMap();

  const [search, setSearch] = useState('');

  const searchPlace = () => {
    const { keywordSearch } = new kakao.maps.services.Places();

    keywordSearch(search, (placeSearchResult, status, _pagination) => {
      if (status !== kakao.maps.services.Status.OK) return;

      const bounds = new kakao.maps.LatLngBounds();

      const searchResults = placeSearchResult.map((place) => {
        bounds.extend(new kakao.maps.LatLng(+place.y, +place.x));

        return {
          id: place.id,
          position: {
            lat: +place.y,
            lng: +place.x,
          },
          placeName: place.place_name,
          addressName: place.address_name,
        };
      });

      setMarkers(searchResults);

      map.setBounds(bounds);
    });
  };

  return {
    search,
    setSearch,
    searchPlace,
  };
};
