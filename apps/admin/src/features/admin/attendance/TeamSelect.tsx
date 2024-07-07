import Chip from '@depromeet-makers-fe/ui/src/components/Chip/Chip'; // TODO (@kimyouknow) module export 설정 수정하기
import React from 'react';
import styled from 'styled-components';

const TEAM_COUNT = 6;
const TEAM_LIST = Array.from({ length: TEAM_COUNT }).map((_, index) => index + 1);

interface Props {
  value: number;
  onChange: (value: number) => void;
}

function TeamSelect(props: Props) {
  return (
    <Container>
      {TEAM_LIST.map((team) => (
        <Chip key={`team-${team}`} isSelected={props.value === team} onClick={() => props.onChange(team)}>
          {team}팀
        </Chip>
      ))}
    </Container>
  );
}

export default TeamSelect;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(${TEAM_COUNT / 2}, 1fr);
  gap: 8px;

  .chip {
    padding: 12px 32px;
  }
`;
