import styled from 'styled-components';

interface InfoBoxProps {
  title: string;
  content: string | number;
  isSuccess?: boolean;
}

export const InfoBox = ({ title, content, isSuccess }: InfoBoxProps) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Content isSuccess={isSuccess}>{content}</Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 0 0;
  gap: 12px;

  padding: 20px 24px;
  border-radius: 12px;

  background-color: ${({ theme }) => theme.color.white};
`;

const Title = styled.p`
  ${({ theme }) => theme.typo.subtitle3};
  color: ${({ theme }) => theme.color.gray_400};
`;

const Content = styled.p<Pick<InfoBoxProps, 'isSuccess'>>`
  ${({ theme }) => theme.typo.h3};
  color: ${({ theme, isSuccess }) => (isSuccess ? theme.color.green_300 : theme.color.gray_900)};
`;
