import styled from 'styled-components';

import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

import color from './color';

const meta = {
  title: 'Color',
  component: Color,
};

export default meta;

export function Color() {
  const [_, copy] = useCopyToClipboard();

  const handleCopy = (text: string) => {
    copy(text);
  };

  return (
    <Grid>
      {Object.keys(color).map((key) => (
        <ColorItem $colorKey={key as keyof typeof color} key={key} onClick={() => handleCopy(key)}>
          <div className="palette" />
          <p> {key}</p>
        </ColorItem>
      ))}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 100px);
  grid-gap: 16px;
`;

const ColorItem = styled.div<{ $colorKey: keyof typeof color }>`
  cursor: pointer;

  &:hover {
    .palette {
      border: 2px solid ${({ theme }) => theme.color.gray_400};
    }
    p {
      text-decoration: underline;
    }
  }

  .palette {
    background-color: ${({ theme, $colorKey }) => theme.color[$colorKey]};
    width: 100px;
    height: 100px;
    display: inline-block;
    border-radius: 8px;
  }

  p {
    color: ${({ theme }) => theme.color.gray_800};
    font-size: 14px;
    font-weight: 500;
    text-align: center;
  }
`;
