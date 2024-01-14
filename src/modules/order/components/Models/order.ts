import { Address } from "@/modules/app/models";
import { OrderStatus } from "../../enums";

export class Order {
  id: string;
  customer: {
    id: string;
    name: string;
  };
  price: number;
  order_id: number;
  created_at: Date;
  status: OrderStatus;
  address: Address;
}
