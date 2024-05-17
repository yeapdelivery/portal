interface Address {
  id: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  zip: string;
  complement?: string;
  reference?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthday?: string;
  address: Address;
}
