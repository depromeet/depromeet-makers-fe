import styled from 'styled-components';

import Icon from '../../../components/Icon';
import type { SessionType } from '../../../hooks/apis/sessions/useGetSessionList';
import { openKakaoMap } from '../../../utils/kakaoMap';

type LocationButtonProps = Pick<SessionType, 'place'>;

export const LocationButton = ({ place }: LocationButtonProps) => {
  if (!place) return null;

  const { address } = place;

  if (address === '온라인') return null;
  if (address === '오프라인') return null;

  const handleClickLocationButton = () => {
    openKakaoMap(place);
  };

  return (
    <LocationButtonContainer onClick={handleClickLocationButton}>
      <Text>
        <Icon name="location" />
        {address}
      </Text>
      <Icon name="arrow-right" />
    </LocationButtonContainer>
  );
};

const LocationButtonContainer = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 12px 16px 12px 12px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.color.gray_200};

  ${({ theme }) => theme.typo.caption};
  color: ${({ theme }) => theme.color.gray_500};
`;

const Text = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
`;
