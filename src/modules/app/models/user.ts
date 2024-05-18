import { Address } from "./address";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthday?: string;
  address: Address;
}
