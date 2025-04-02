import { useEffect, useState } from "react";
import Link from "next/link";

import { ChatModel } from "../../models";
import { formatDate } from "@/formatting/date";
import { useLoading, useModal } from "@/modules/app/hooks";
import { useStore } from "@/modules/app/store/stores";
import { getChatList } from "../../services";
import { useChat } from "../../store";
import { ChatLoading } from "../chat-loading";
import Button from "@/modules/app/components/button";
import { isPastChat } from "@/utils";
import Dialog from "@/modules/app/components/dialog";

function Wrapper({
  children,
  chat,
  onOpenChange,
  unreadMessages,
}: {
  children: React.ReactNode;
  chat: ChatModel;
  unreadMessages: string[];
  onOpenChange: (open: boolean) => void;
}) {
  const isPast = false;
  // isPastChat(chat.lastMessageAt) && !unreadMessages.includes(chat.id);

  if (isPast) {
    return (
      <div
        className="flex justify-between items-center border-b border-gray-600 pb-3 pt-3 cursor-pointer"
        onClick={() => onOpenChange(true)}
      >
        {children}
      </div>
    );
  }

  return (
    <Link
      href={`/chat/${chat.id}/${chat.user.id}`}
      key={chat.id}
      className="flex justify-between items-center border-b border-gray-600 pb-3 pt-3"
    >
      {children}
    </Link>
  );
}

export function ChatList() {
  const store = useStore((state) => state.store);
  const [chatList, setChatList] = useState<ChatModel[]>([]);
  const { unreadMessages } = useChat((state) => state);
  const [page, setPage] = useState(1);
  const [hasNoMore, setHasNoMore] = useState(true);

  const { open, onOpenChange } = useModal();

  const [isLoadingChatList, startLoadingChatList, stopLoadingChatList] =
    useLoading();

  useEffect(() => {
    if (store?.id) {
      handleGetChatList(page);
    }
  }, [store]);

  async function handleGetChatList(page: number) {
    startLoadingChatList();
    try {
      const chatList = await getChatList(store.id as string, page);

      setChatList((prev) => [...prev, ...chatList]);

      if (chatList.length < 10) {
        setHasNoMore(true);
        return;
      } else {
        setHasNoMore(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      stopLoadingChatList();
    }
  }

  async function updatePagination(page: number) {
    setPage(page);

    await handleGetChatList(page);
  }

  return (
    <div className="md:border-r border-gray-600 h-[calc(100vh-300px)] md:h-[calc(100vh-180px)] px-5 md:max-w-[300px] overflow-y-scroll">
      {!isLoadingChatList ? (
        <div>
          {chatList?.map((chat) => (
            <Wrapper
              chat={chat}
              key={chat.id}
              unreadMessages={unreadMessages}
              onOpenChange={onOpenChange}
            >
              <div>
                <div>
                  <span className="text-gray-100 font-semibold truncate">
                    {chat.user.name}
                  </span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm truncate max-w-[150px]">
                    {chat.lastMessage}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3">
                {unreadMessages.includes(chat.id) && (
                  <div className="w-3 h-3 rounded-full bg-red-default" />
                )}
                <span className="text-[10px] text-gray-400">
                  {formatDate(chat.lastMessageAt)}
                </span>
              </div>
            </Wrapper>
          ))}

          {!hasNoMore && (
            <Button
              variant="secondary"
              className="mt-10"
              onClick={() => updatePagination(page + 1)}
            >
              Carregar mais
            </Button>
          )}
        </div>
      ) : (
        <ChatLoading />
      )}

      <Dialog open={open} onOpenChange={onOpenChange}>
        <Dialog.Content position="center" title="Conversa inativa">
          <div className="space-y-4">
            <p>Essa conversa está inativa há mais de 2 horas</p>

            <Button
              variant="secondary"
              onClick={() => {
                onOpenChange(false);
              }}
            >
              Fechar
            </Button>
          </div>
        </Dialog.Content>
      </Dialog>
    </div>
  );
}
