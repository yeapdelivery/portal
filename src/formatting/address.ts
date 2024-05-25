import { Address } from "@/modules/app/models/";
import { formatZipCode } from "./formatZipCode";

export const formatAddress = (address: Address): string => {
  return `${address.street}, ${address.number}, ${address.neighborhood},
    ${address.city} - ${address.state} - ${formatZipCode(address.zip)}`;
};
