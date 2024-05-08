import styled from 'styled-components';

interface Props {
  passwordLength: number;
  inputLength: number;
  onChange: (value: string) => void;

  error?: string;
}

function PasswordInput(props: Props) {
  return (
    <DotContainer>
      <Input
        autoFocus
        type="number"
        maxLength={props.passwordLength}
        onChange={(e) => e.target.value.length <= props.passwordLength && props.onChange(e.target.value)}
      />
      {Array.from({ length: props.passwordLength }, (_, index) => (
        <Dot key={index} isChecked={index < props.inputLength} />
      ))}
      {props.error && <ErrorStyled>{props.error}</ErrorStyled>}
    </DotContainer>
  );
}

export default PasswordInput;

const DotContainer = styled.div`
  position: relative;
  display: flex;
  gap: 16px;
  padding: 16px 0;
  width: fit-content;
`;

const Input = styled.input`
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  top: 16px;
  height: 20px;
  opacity: 0;
`;

const Dot = styled.div<{ isChecked: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ theme, isChecked }) => (isChecked ? theme.color.gray_600 : theme.color.gray_200)};
  margin: 0 4px;
`;

const ErrorStyled = styled.p`
  position: absolute;
  top: 48px;
  left: 0;
  ${({ theme }) => theme.typo.caption};
  color: ${({ theme }) => theme.color.red_300};
`;
