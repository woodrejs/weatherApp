import { formatDate } from "./formatDate";

///DATE
export const getDate = (): string => {
  const date = new Date();
  const day = formatDate(date.getDate());
  const month = formatDate(date.getMonth());
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};
