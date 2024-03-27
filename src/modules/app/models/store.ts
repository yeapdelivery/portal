import StoreTypeEnum from "../enums/store-type";
import { Address } from "./address";
import OwnerModal from "./owner";

export default interface StoreModel {
  id: string;
  name: string;
  email: string;
  address: Address;
  ownerInfo: OwnerModal;
  type: StoreTypeEnum;
}
