export const isSameDate = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const getFormattedDate = (dateString: string) => {
  const date = new Date(dateString);

  return {
    year: date.getFullYear().toString(),
    month: (date.getMonth() + 1).toString(),
    day: date.getDate().toString(),
  };
};

export const getDateText = (dateString: string) => {
  const { year, month, day } = getFormattedDate(dateString);

  return {
    year: `${year}년`,
    month: `${month}월`,
    day: `${day}일`,
  };
};
