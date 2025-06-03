import api from "@/api";
import { Order } from "../models";
import { OrderStatus } from "../enums";

export interface OrderResponse {
  orders: Order[];
  count: number;
}

export async function getAllOrderByStatus(
  status: OrderStatus,
  page: number = 1,
  limit: number = 10,
  search?: string,
  sort: "asc" | "desc" = "desc"
): Promise<OrderResponse> {
  const { data } = await api.get<OrderResponse>(`/stores/orders/${status}`, {
    params: { page, limit: limit, search, sort },
  });

  return data;
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus
): Promise<void> {
  await api.put(`/stores/orders/${orderId}/update-status/${status}`, {
    status,
  });
}
