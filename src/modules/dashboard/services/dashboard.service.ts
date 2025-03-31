import api from "@/api";
import { FinancialData } from "../types";

interface FinancialQuery {
  startDate: string;
  endDate: string;
}

export async function getFinancialData(
  query: FinancialQuery
): Promise<FinancialData> {
  const { data } = await api.get("/stores/orders/financial/overview", {
    params: query,
  });

  return data;
}
