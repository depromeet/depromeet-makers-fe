import type { PropsWithChildren } from 'react';
import React from 'react';
import styled from 'styled-components';

function Layout({ children }: PropsWithChildren) {
  return <Container>{children}</Container>;
}

export default Layout;

const Container = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  width: 100vw;
  max-width: ${({ theme }) => theme.maxWidth};
`;
