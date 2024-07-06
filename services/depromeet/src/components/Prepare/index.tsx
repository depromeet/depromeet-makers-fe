import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

function Prepare() {
  return (
    <Container>
      <Image src="/assets/images/prepare.svg" alt="준비중" width={110} height={98} />
      <Text>준비 중이에요</Text>
    </Container>
  );
}

export default Prepare;

const Container = styled.div`
  width: 100%;
  background: var(--gray-100, #f1f5f9);
  height: 100%;
  min-height: calc(100vh - 68px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Text = styled.p`
  ${({ theme }) => theme.typo.h3};
`;
