import { usePathname } from 'next/navigation';
import styled from 'styled-components';

import theme from '@/styles/theme';

import Icon from '../Icon';

type NavItemProps = {
  selected?: boolean;
};

const NAV_ITEMS = [
  // TODO: path 수정 필요
  { text: '홈', icon: 'home', path: '' },
  { text: '일정', icon: 'calendar', path: '' },
  { text: '마이페이지', icon: 'user', path: '' },
] as const;

export const BottomNav = () => {
  const pathname = usePathname();

  return (
    <BottomNavStyled>
      {NAV_ITEMS.map(({ text, icon, path }) => {
        const selected = path === pathname;

        return (
          <NavItem key={path} href={path} selected={selected}>
            <Icon name={icon} width={26} height={26} color={selected ? theme.color.gray_900 : theme.color.gray_400} />
            {text}
          </NavItem>
        );
      })}
    </BottomNavStyled>
  );
};

const BottomNavStyled = styled.nav`
  position: fixed;
  bottom: 0;

  display: flex;
  justify-content: space-evenly;
  width: 100%;
  padding: 12px 0;

  border-top: 1px solid ${({ theme }) => theme.color.gray_200};
`;

const NavItem = styled.a<NavItemProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;

  color: ${({ theme, selected }) => (selected ? theme.color.gray_900 : theme.color.gray_400)};
  fill: ${({ theme, selected }) => (selected ? theme.color.gray_900 : theme.color.gray_400)};
  font-weight: 500;
`;
