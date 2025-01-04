import styled from 'styled-components';

import Icon from '../../../components/Icon';

interface CheckBoxProps {
  checkBoxCount: number;
  checkedCount: number;
}

export const CheckBox = ({ checkBoxCount, checkedCount }: CheckBoxProps) => {
  const checkboxes = Array.from({ length: checkBoxCount }, (_, index) => {
    const isChecked = index < checkedCount;

    return isChecked ? 'checkbox-fill' : 'checkbox-outline';
  });

  return (
    <Container>
      {checkboxes.map((name, index) => (
        <Icon key={index} name={name} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 6px;
`;
