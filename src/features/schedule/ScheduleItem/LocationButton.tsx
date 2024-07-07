import styled from 'styled-components';

import Icon from '@/components/Icon';
import type { SessionType } from '@/hooks/apis/sessions/useGetSessionList';

type LocationButtonProps = Pick<SessionType, 'place'>;

export const LocationButton = ({ place }: LocationButtonProps) => {
  if (!place) return null;

  const { address, latitude, longitude } = place;

  if (address === '온라인') return null;

  if (latitude === 0 || longitude === 0) return null;

  return (
    <LocationLink href={`https://map.kakao.com/link/to/${address},${latitude},${longitude}`}>
      <Text>
        <Icon name="location" />
        {address}
      </Text>
      <Icon name="arrow-right" />
    </LocationLink>
  );
};

const LocationLink = styled.a`
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
