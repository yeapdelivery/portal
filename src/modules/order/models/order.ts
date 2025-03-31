import { Address } from "@/modules/app/models";
import { DeliveryType } from "../enums";
import { PaymentType } from "../enums/payment-methods.enum";

export interface Order {
  orderNumber: number;
  totalPrice: number;
  status: string;
  storeId: string;
  userId: string;
  userName: string;
  phone: string;
  observation: string;
  userAddress: Address;
  products: Product[];
  deliveryPrice: string;
  deliveryTime: number;
  deliveryType: DeliveryType;
  paymentType: PaymentType;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface Product {
  id: string;
  name: string;
  price: Price;
  quantity: number;
  variations: Variation[];
}

export interface Price {
  id: string;
  original: number;
  promotional: any;
}

export interface Variation {
  id: string;
  name: string;
  options: Option[];
}

export interface Option {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
