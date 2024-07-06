import styled from 'styled-components';

interface ProgressProps {
  percent: number;
}

export const Progress = ({ percent }: ProgressProps) => {
  return (
    <Container aria-valuemin={0} aria-valuemax={100} role="progressbar">
      <Indicator percent={percent} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 8px;
  overflow: hidden;

  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.gray_200};
`;

const Indicator = styled.div<ProgressProps>`
  width: ${({ percent }) => `${percent}%`};
  height: 100%;

  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.gray_500};
`;
