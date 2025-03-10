import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import styled from 'styled-components';

import { BottomNav } from '@/components/BottomNav';
import { Header } from '@/components/Header';
import { useSnackBar } from '@/components/SnackBar/useSnackBar';
import { ADMIN_NAV_ITEMS } from '@/constants/bottomNav';
import { COOKIE_KEY } from '@/constants/cookie';

const Setting = () => {
  const router = useRouter();
  const { showSnackBar } = useSnackBar();

  const handleLogout = () => {
    Cookies.remove(COOKIE_KEY.ACCESS_TOKEN);
    Cookies.remove(COOKIE_KEY.REFRESH_TOKEN);
    Cookies.remove(COOKIE_KEY.CURRENT_ROLE);

    showSnackBar({ message: '로그아웃 되었습니다.' });

    router.replace('/');
  };

  return (
    <Container>
      <Header title="설정" canBack />

      <Content>
        <Title>계정관리</Title>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </Content>

      <BottomNav items={ADMIN_NAV_ITEMS} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100dvh;
`;

const Content = styled.div`
  margin-top: 68px;
  padding: 0 20px;
`;

const Title = styled.p`
  ${({ theme }) => theme.typo.subtitle2};
  color: ${({ theme }) => theme.color.gray_600};
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 8px;
`;

const LogoutButton = styled.button`
  cursor: pointer;
  padding: 16px 0px;
  ${({ theme }) => theme.typo.title1};
  color: ${({ theme }) => theme.color.gray_900};
`;

export default Setting;
