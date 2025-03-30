"use client";

import { ChatCircleDots } from "@phosphor-icons/react/dist/ssr";
import { ChatList } from "../components";

export function ChatTemplate() {
  return (
    <div className="px-5 flex w-full">
      <div className="w-full md:w-[300px] h-[calc(100vh-100px)]">
        <ChatList />
      </div>
      <div className="flex-1 md:px-5 hidden md:block">
        <div className="flex flex-col justify-center h-full items-center text-gray-500">
          <ChatCircleDots size={60} />

          <p className="text-xl">Selecione uma conversa</p>
        </div>
      </div>
    </div>
  );
}
