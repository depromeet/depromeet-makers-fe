import type { PropsWithChildren } from 'react';
import React from 'react';
import styled from 'styled-components';

import { useRouterLoading } from '@/hooks/useRouterLoading';

import { Spinner } from '../Spinner';

function Layout({ children }: PropsWithChildren) {
  const { isLoading } = useRouterLoading();

  return (
    <Container>
      {isLoading && (
        <Overlay>
          <Spinner />
        </Overlay>
      )}
      {children}
    </Container>
  );
}

export default Layout;

const Container = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  width: 100vw;
  max-width: ${({ theme }) => theme.maxWidth};
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;
