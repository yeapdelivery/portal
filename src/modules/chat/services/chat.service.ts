import api from "@/api";
import { ChatItemModel, ChatModel } from "../models";
import { SenderTypeEnum } from "../enums";

interface CreateChatBody {
  storeId: string;
  userId: string;
  content: string;
}

export async function getChatList(
  storeId: string,
  page: number
): Promise<ChatModel[]> {
  const { data } = await api.get<ChatModel[]>(
    `/chat/list/${storeId}/store-id`,
    {
      params: { page, limit: 10 },
    }
  );

  return data;
}

export async function getConversation(
  chatId: string,
  page: number
): Promise<ChatItemModel[]> {
  const { data } = await api.get<ChatItemModel[]>(
    `chat/list/${chatId}/chat-id`,
    {
      params: { page, limit: 10 },
    }
  );

  return data;
}

export async function checkUnreadMessages(storeId: string): Promise<string[]> {
  const { data } = await api.get<string[]>(`/chat/check-unread-messages`, {
    params: {
      storeId,
      type: SenderTypeEnum.STORE,
    },
  });

  return data;
}

export async function sendChatMessage(
  body: CreateChatBody
): Promise<ChatItemModel> {
  const { data } = await api.post<ChatItemModel>(`/chat`, {
    ...body,
    senderType: SenderTypeEnum.STORE,
  });

  return data;
}

export async function updateUnreadMessages(storeId: string): Promise<void> {
  await api.put(`/chat/${storeId}/update-unread-messages`, {
    type: SenderTypeEnum.STORE,
  });
}
