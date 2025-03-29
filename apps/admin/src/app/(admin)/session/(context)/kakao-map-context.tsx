import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import { createContext, useContext, useState } from 'react';

export interface MarkerType {
  id: string;
  position: {
    lat: number;
    lng: number;
  };
  placeName: string;
  addressName: string;
}

interface UsersContextType {
  markers: MarkerType[];
  setMarkers: Dispatch<SetStateAction<MarkerType[]>>;
  selectedPlace?: MarkerType;
  setSelectedPlace: Dispatch<SetStateAction<MarkerType | undefined>>;
}

const KaKaoMapContext = createContext<UsersContextType | null>(null);

const KaKaoMapProvider = ({ children }: PropsWithChildren) => {
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<MarkerType>();

  return (
    <KaKaoMapContext.Provider value={{ markers, setMarkers, selectedPlace, setSelectedPlace }}>
      {children}
    </KaKaoMapContext.Provider>
  );
};

export const useKaKaoMap = () => {
  const kaKaoMapContext = useContext(KaKaoMapContext);

  if (!kaKaoMapContext) {
    throw new Error('<kaKaoMapContext /> 내부에서 useKaKaoMap을 사용할 수 있어요.');
  }

  return kaKaoMapContext;
};

export default KaKaoMapProvider;
