import { parse, format } from "date-fns";

export function formatDate(date: string) {
  if (!date) return "";

  return format(new Date(date), "dd/MM/yyyy");
}
