import api from "@/api";
import { Dashboard, FinancialData, TopSellingProducts } from "../types";

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

export async function getDashboardData(): Promise<Dashboard> {
  const { data } = await api.get(`/dashboard/`);

  return data;
}

export async function getTopSellingProducts(): Promise<TopSellingProducts[]> {
  const { data } = await api.get(`/dashboard/top-products`);

  return data;
}
