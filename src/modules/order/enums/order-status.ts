export enum OrderStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  DELIVERING = "DELIVERING",
  DELIVERED = "DELIVERED",
  CANCELED = "CANCELED",
}

export const orderStatusMap: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: "Pedente",
  [OrderStatus.IN_PROGRESS]: "Produção",
  [OrderStatus.DELIVERING]: "Entrega",
  [OrderStatus.DELIVERED]: "Entregue",
  [OrderStatus.CANCELED]: "Cancelado",
};
