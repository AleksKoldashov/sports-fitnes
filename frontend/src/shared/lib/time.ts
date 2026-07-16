export const converterDate = (date: string) => {
  const [yaer, month, day] = date.split('-');

  const [getDay] = day.split('T');

  return `${getDay}.${month}.${yaer}`;
};
