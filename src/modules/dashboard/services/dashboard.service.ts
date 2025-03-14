import api from "@/api";

interface FinancialQuery {
  startDate: string;
  endDate: string;
}

export async function getFinancialData(query: FinancialQuery) {
  const { data } = await api.get("/stores/orders/financial/overview", {
    params: query,
  });

  return data;
}
