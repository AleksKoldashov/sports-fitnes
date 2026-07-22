export const converterDate = (date: string | null) => {
  if (!date) return 'дата не передана';
  const [yaer, month, day] = date.split('-');

  const [getDay] = day.split('T');

  return `${getDay}.${month}.${yaer}`;
};
