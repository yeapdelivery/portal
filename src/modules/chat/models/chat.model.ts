import StoreModel from "@/modules/app/models/store";
import { User } from "@/modules/app/models/user";
import { SenderTypeEnum } from "../enums";

export interface ChatModel {
  lastMessage: string;
  lastMessageAt: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  user: User;
  store: StoreModel | null;
}

export interface ChatItemModel {
  chatId: string;
  senderType: SenderTypeEnum;
  content: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  image: string | null;
  id: string;
  user: User;
  store: StoreModel | null;
}
