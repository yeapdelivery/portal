export enum DeliveryType {
  DELIVERY = "delivery",
  PICKUP = "pickup",
}

export const DELIVERY_TYPE_LABELS = {
  [DeliveryType.DELIVERY]: "Entrega",
  [DeliveryType.PICKUP]: "Retirar na loja",
};
