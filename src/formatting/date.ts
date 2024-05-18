import { parse, format } from "date-fns";

export function formatDate(date: string) {
  if (!date) return "";

  const originalDate = parse(date, "ddMMyyyy", new Date());

  return format(originalDate, "dd/MM/yyyy");
}
