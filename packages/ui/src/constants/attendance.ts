// TODO : 이후에 서버에서 받아오는 값으로 변경
export enum ATTENDANCE_STATUS {
  출석대기 = 'ATTENDANCE_ON_HOLD',
  출석 = 'ATTENDANCE',
  지각 = 'TARDY',
  결석 = 'ABSENCE',
}

export const ATTENDANCE_STATUS_KR: Record<ATTENDANCE_STATUS, string> = {
  [ATTENDANCE_STATUS.출석대기]: '출석대기',
  [ATTENDANCE_STATUS.출석]: '출석',
  [ATTENDANCE_STATUS.지각]: '지각',
  [ATTENDANCE_STATUS.결석]: '결석',
};

export const ATTENDANCE_STATUS_LIST = Object.values(ATTENDANCE_STATUS) as ATTENDANCE_STATUS[];

export const CURRENT_GENERATION = Number(process.env.NEXT_PUBLIC_DEPROMEET_GENERATION || 0);
