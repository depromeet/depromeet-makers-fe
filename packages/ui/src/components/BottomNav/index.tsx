import { usePathname } from "next/navigation";
import styled from "styled-components";

import type { NavItemType } from "../../constants/bottomNav";

import { Icon } from "../Icon";
import theme from "../../styles/theme";

type NavItemProps = {
  selected?: boolean;
};

export const BottomNav = ({ items }: { items: NavItemType }) => {
  const pathname = usePathname();

  return (
    <>
      <BottomNavStyled>
        {items.map(({ text, icon, path }) => {
          const selected = path === pathname;

          return (
            <NavItem key={path} href={path} selected={selected}>
              <Icon
                name={icon}
                width={26}
                height={26}
                color={selected ? theme.color.gray_900 : theme.color.gray_300}
              />
              {text}
            </NavItem>
          );
        })}
      </BottomNavStyled>
      <Blank />
    </>
  );
};

const BottomNavStyled = styled.nav`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);

  display: flex;
  justify-content: center;
  width: ${({ theme }) => theme.maxWidth};
  padding: 12px 0;
  z-index: ${({ theme }) => theme.zIndex.bottomNav};

  background-color: ${({ theme }) => theme.color.white};
  border-top: 1px solid ${({ theme }) => theme.color.gray_200};
`;

const NavItem = styled.a<NavItemProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  width: 130px;

  color: ${({ theme, selected }) =>
    selected ? theme.color.gray_900 : theme.color.gray_300};
  fill: ${({ theme, selected }) =>
    selected ? theme.color.gray_900 : theme.color.gray_300};
  font-weight: 500;
  ${({ theme }) => theme.typo.caption};
`;
const Blank = styled.div`
  height: 68px;
`;
