"use client";

import { ChatList, ConversationList } from "../components";

import { useParams } from "next/navigation";

export function ChatIdTemplate() {
  const { chatId, userId } = useParams();

  return (
    <div className="px-5 flex h-[calc(100vh-500px)]  w-full">
      <div className="flex-1 md:px-5">
        <ConversationList chatId={chatId as string} userId={userId as string} />
      </div>
    </div>
  );
}
