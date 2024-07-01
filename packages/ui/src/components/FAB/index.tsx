import type { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

import type { SessionAttendanceStatus } from "../../types/attendance";

type FABProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  sessionAttendanceStatus: SessionAttendanceStatus;
};

const SUB_TEXT = {
  BEFORE_15MINUTE: "세션 시작 전 미리 출석해주세요!",
  ON_TIME: "세션이 시작되었습니다.",
  AFTER_15MINUTE: "출석 시 지각 처리됩니다.",
};

export const FAB = ({
  text,
  sessionAttendanceStatus,
  children,
  ...props
}: FABProps) => {
  return (
    <FABStyled {...props}>
      <SubText sessionAttendanceStatus={sessionAttendanceStatus}>
        {SUB_TEXT[sessionAttendanceStatus]}
      </SubText>
      <Text>{text}</Text>
      {children}
    </FABStyled>
  );
};

const FABStyled = styled.button`
  position: fixed;
  left: 50%;
  bottom: 108px;
  transform: translate(-50%, 0%);
  z-index: ${({ theme }) => theme.zIndex.fab};

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  width: 300px;
  padding: 18px 32px;

  border-radius: 40px;
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.gray_900};
`;

const Text = styled.p`
  ${({ theme }) => theme.typo.title3};
  color: ${({ theme }) => theme.color.white};
`;

const SubText = styled.p<Pick<FABProps, "sessionAttendanceStatus">>`
  ${({ theme }) => theme.typo.caption};
  color: ${({ theme, sessionAttendanceStatus }) =>
    sessionAttendanceStatus === "AFTER_15MINUTE"
      ? theme.color.yellow_300
      : theme.color.gray_300};
`;
