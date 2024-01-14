import { Address } from "@/modules/app/models/";

export const formatZipCode = (zipCode: string): string => {
  if (zipCode) {
    zipCode = zipCode.replace(/\D/g, "");
    zipCode = zipCode.replace(/^(\d{5})(\d)/, "$1-$2");
    return zipCode;
  }

  return "";
};

export const formatAddress = (address: Address): string => {
  return `${address.street}, ${address.number}, ${address.neighborhood},
    ${address.city} - ${address.state} - ${formatZipCode(address.zip)}`;
};
