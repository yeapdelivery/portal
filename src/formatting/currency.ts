export function currency(value: number) {
  if (typeof value !== "number") {
    return "";
  }

  return value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
}
