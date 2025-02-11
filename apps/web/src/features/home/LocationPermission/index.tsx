import { useState } from 'react';
import styled from 'styled-components';

import Button from '@/components/Button';
import { useGeolocation } from '@/hooks/useGeolocation';
import { isAndroid, isIos } from '@/utils/userAgent';

export const LocationPermission = () => {
  const location = useGeolocation();

  const [fallback, setFallback] = useState(false);

  const handleOpenSetting = () => {
    const url = isIos()
      ? 'prefs:root=Privacy&path=LOCATION'
      : isAndroid()
        ? 'intent://settings#Intent;action=android.settings.LOCATION_SOURCE_SETTINGS;end;'
        : null;

    if (url) {
      window.location.href = url;

      setTimeout(() => setFallback(true), 1000);
      return;
    }

    setFallback(true);
  };

  if (location.latitude !== 0 && location.longitude !== 0) {
    return null;
  }

  return (
    <Container>
      <Title>위치 정보 설정</Title>

      <Description>내 위치 확인을 위해 설정에서 위치 정보를 설정해주세요.</Description>

      {fallback && (
        <Description>
          설정 페이지가 자동으로 열리지 않는 경우,
          <br />
          <strong>개인정보 보호 &gt; 위치 서비스</strong>에서 직접 위치 접근 권한을 허용해주세요.
        </Description>
      )}

      <SettingButton onClick={handleOpenSetting}>설정</SettingButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 20px;
  width: 100%;
  min-height: 100px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.gray_200};

  @media ${({ theme }) => theme.media.mobile} {
    width: fit-content;
  }
`;

const Title = styled.p`
  font-weight: 500;
  margin-bottom: 12px;
`;

const Description = styled.p`
  font-size: 14px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.color.gray_600};
`;

const SettingButton = styled(Button)`
  padding: 14px 12px;
  font-size: 14px;
`;
