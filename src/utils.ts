export const unixTimestampToMonthYear = (unixTimestamp: number): string => {
  const date = new Date(unixTimestamp * 1000);
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
    date,
  );
  const year = date.getFullYear();

  return `${month}, ${year}`;
};
