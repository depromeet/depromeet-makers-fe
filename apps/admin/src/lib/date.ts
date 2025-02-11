/**
 * ISO 8601 형식의 날짜 문자열을 "YYYY.MM.DD일 HH:mm" 형식으로 변환합니다.
 *
 * @param dateString - 예: "2025-01-04T18:10"
 * @returns 변환된 문자열, 예: "2025.1.4 18:10"
 */
export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error('유효하지 않은 날짜 문자열입니다.');
  }

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const paddedMinutes = minutes.toString().padStart(2, '0');

  return `${year}.${month}.${day} ${hours}:${paddedMinutes}`;
};
