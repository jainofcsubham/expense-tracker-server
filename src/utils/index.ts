export const getMonthAndYearFromString: (monthString: string) => {
  month: number;
  year: number;
} = (monthString: string) => {
  const regex = /^(0[1-9]|1[0-2])-\d{4}$/;
  const match = monthString.match(regex);
  if (!match) {
    return { month: -1, year: -1 };
  }
  const month = Number(match[1]);
  const year = Number(match[2]);
  return { month, year };
};
