import styled from 'styled-components';

import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

import Icon, { IconComponentMap } from '.';

const meta = {
  title: 'Icon',
  component: Icon,
  parameters: {
    docs: {
      description: {
        component: '아이콘 컴포넌트입니다. 클릭하면 아이콘 이름이 복사됩니다.',
      },
    },
  },
};

export default meta;

const icons = Object.keys(IconComponentMap);

export function Default() {
  const [_, copy] = useCopyToClipboard();

  const handleCopy = (text: string) => {
    copy(text)
      .then(() => {
        console.log('Copied!', text);
      })
      .catch((error: unknown) => {
        console.error('Failed to copy!', error);
      });
  };

  return (
    <>
      <h2
        style={{
          marginBottom: '16px',
        }}
      >
        아이콘 컴포넌트입니다. 클릭하면 아이콘 이름이 복사됩니다.
      </h2>
      <IconWrapper>
        {icons.map((key) => (
          <IconItem key={key} onClick={() => handleCopy(key)}>
            <div className="icon">
              <Icon key={key} name={key as keyof typeof IconComponentMap} width={24} height={24} />
            </div>
            <p className="label">{key}</p>
          </IconItem>
        ))}
      </IconWrapper>
    </>
  );
}

const IconWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
`;

const IconItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  &:hover {
    .icon {
      border-color: ${({ theme }) => theme.color.gray_400};
    }

    p {
      text-decoration: underline;
    }
  }

  .icon {
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.color.gray_300};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
  }

  .label {
    ${({ theme }) => theme.typo.subtitle3};
    color: ${({ theme }) => theme.color.gray_700};
  }
`;
