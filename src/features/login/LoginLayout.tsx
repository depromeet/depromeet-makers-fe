import type { ComponentProps, PropsWithChildren } from 'react';
import React from 'react';
import styled from 'styled-components';

import Button from '@/components/Button';
import Icon from '@/components/Icon';

interface Props {
  title: string;
  desc?: string;
  onBack?: () => void;
  buttonProps: {
    children: string;
    onClick: () => void;
  } & ComponentProps<typeof Button>;
}

function LoginLayout(props: PropsWithChildren<Props>) {
  return (
    <Main>
      {props.onBack && (
        <Header>
          <button onClick={props.onBack}>
            <Icon name="arrow-left" />
          </button>
        </Header>
      )}
      <Hgroup>
        <Heading>{props.title}</Heading>
        {props.desc && <Desc>{props.desc}</Desc>}
      </Hgroup>
      {props.children}
      <ButtonWrapper>
        <Button {...props.buttonProps} />
      </ButtonWrapper>
    </Main>
  );
}

export default LoginLayout;

const Main = styled.main`
  padding: 20px;
  min-height: 100vh;
`;

const Header = styled.header``;

const Hgroup = styled.hgroup`
  margin-bottom: 32px;
  margin-top: 60px;
  white-space: pre;
`;

const Heading = styled.h2`
  ${({ theme }) => theme.typo.h2};
  color: ${({ theme }) => theme.color.gray_900};
`;

const Desc = styled.p`
  margin-top: 12px;
  ${({ theme }) => theme.typo.p};
  color: ${({ theme }) => theme.color.gray_500};
`;

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 48px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  padding: 0 20px;
  max-width: ${({ theme }) => theme.maxWidth};

  button {
    width: 100%;
  }
`;
