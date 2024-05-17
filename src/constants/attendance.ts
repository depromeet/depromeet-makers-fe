// TODO : 이후에 서버에서 받아오는 값으로 변경
export enum ATTENDANCE_STATUS {
  출석대기 = '출석대기',
  출석 = '출석',
  지각 = '지각',
  결석 = '결석',
}

export const ATTENDANCE_STATUS_LIST = Object.keys(ATTENDANCE_STATUS) as ATTENDANCE_STATUS[];

export const CURRENT_GENERATION = 15;
