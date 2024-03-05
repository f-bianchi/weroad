export const formatDate = (
  date: string | Date | undefined,
  options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  },
): string => {
  if (!date) return '';
  return new Intl.DateTimeFormat('en-GB', options).format(new Date(date));
};

export const formatDateISO8601 = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatDateShort = (date: string | Date | undefined): string => {
  return formatDate(date, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};
