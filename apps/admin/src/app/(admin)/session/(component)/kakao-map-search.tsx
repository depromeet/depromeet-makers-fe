import type { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

import type { MarkerType } from '../(context)/kakao-map-context';
import { useKaKaoMap } from '../(context)/kakao-map-context';
import { type SessionForm as SessionFormType } from '../(data)/session';
import { useKaKaoMapSearch } from '../(hook)/use-kakao-map-search';

export const KaKaoMapSearch = () => {
  const form = useFormContext<SessionFormType>();

  const { search, setSearch, searchPlace } = useKaKaoMapSearch();
  const { markers, selectedPlace, setSelectedPlace } = useKaKaoMap();

  const handleChangeSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSelectPlace = (place: MarkerType) => {
    setSelectedPlace(place);
    form.setValue('place', {
      id: place.id,
      title: place.placeName,
      address: place.addressName,
      latitude: place.position.lat,
      longitude: place.position.lng,
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Input value={search} onChange={handleChangeSearchInput} />
        <Button type="button" onClick={searchPlace} className="flex-shrink-0">
          검색하기
        </Button>
      </div>

      {markers.length > 0 && (
        <ScrollArea className="flex flex-col gap-2 p-4 rounded-md border border-gray-200 max-h-[250px]">
          {markers.map((marker) => (
            <PlaceItem
              key={marker.id}
              place={marker}
              isSelected={selectedPlace?.id === marker.id}
              onSelectPlace={() => handleSelectPlace(marker)}
            />
          ))}
        </ScrollArea>
      )}
    </div>
  );
};

interface PlaceItemProps {
  place: MarkerType;
  isSelected?: boolean;
  onSelectPlace: () => void;
}

const PlaceItem = ({ place, isSelected, onSelectPlace }: PlaceItemProps) => {
  return (
    <button
      type="button"
      onClick={onSelectPlace}
      className={`flex gap-2 p-2 w-full text-sm hover:bg-gray-50 ${isSelected ? 'bg-gray-100' : ''}`}
    >
      <span className="font-semibold">{place.placeName}</span>
      <span className="text-gray-500">{place.addressName}</span>
    </button>
  );
};
