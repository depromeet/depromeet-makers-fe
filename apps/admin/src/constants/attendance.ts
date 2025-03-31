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

export const ATTENDANCE_STATUS_TEXT_COLOR: Record<ATTENDANCE_STATUS, string> = {
  [ATTENDANCE_STATUS.출석대기]: 'text-gray-300',
  [ATTENDANCE_STATUS.출석]: 'text-green-300',
  [ATTENDANCE_STATUS.지각]: 'text-yellow-300',
  [ATTENDANCE_STATUS.결석]: 'text-red-300',
};

export const ATTENDANCE_STATUS_COLOR: Record<ATTENDANCE_STATUS, string> = {
  [ATTENDANCE_STATUS.출석대기]: `bg-gray-100 ${ATTENDANCE_STATUS_TEXT_COLOR[ATTENDANCE_STATUS.출석대기]}`,
  [ATTENDANCE_STATUS.출석]: `bg-green-100 ${ATTENDANCE_STATUS_TEXT_COLOR[ATTENDANCE_STATUS.출석]}`,
  [ATTENDANCE_STATUS.지각]: `bg-yellow-100 ${ATTENDANCE_STATUS_TEXT_COLOR[ATTENDANCE_STATUS.지각]}`,
  [ATTENDANCE_STATUS.결석]: `bg-red-100 ${ATTENDANCE_STATUS_TEXT_COLOR[ATTENDANCE_STATUS.결석]}`,
};

export const ATTENDANCE_STATUS_LIST = Object.values(ATTENDANCE_STATUS) as ATTENDANCE_STATUS[];

export const CURRENT_GENERATION = 16; // 임시 처리
// export const CURRENT_GENERATION = Number(process.env.NEXT_PUBLIC_DEPROMEET_GENERATION || 0);

export const WEEK_COUNT = 16;
export const WEEK_LIST = Array.from({ length: WEEK_COUNT }).map((_, index) => index + 1);
