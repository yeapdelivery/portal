import { useCallback, useEffect, useId, useRef, useState } from "react";
import { tv } from "tailwind-variants";
import socket from "@/providers/socketIo.provider";
import { CaretLeft, PaperPlaneTilt } from "@phosphor-icons/react";
import { v4 as uuidv4 } from "uuid";

import { ChatItemModel } from "../../models";
import { SenderTypeEnum } from "../../enums";
import Button from "@/modules/app/components/button";

import { useLoading } from "@/modules/app/hooks";
import {
  getConversation,
  sendChatMessage,
  updateUnreadMessages,
} from "../../services";
import { useUser } from "@/modules/app/store/user";
import { useStore } from "@/modules/app/store/stores";
import { formatDateWithHour } from "@/utils/format-date.util";
import TextArea from "@/modules/app/components/text-area";
import { useChat } from "../../store";
import { ConversationLoading } from "../conversation-loading";
import { authService } from "@/modules/auth/services";
import { useLogger } from "@/modules/app/hooks/use-logger.hook";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ConversationListProps {
  chatId: string;
  userId: string;
}

const chatStyles = tv({
  slots: {
    messageContainer: "w-full flex",
    message: "relative w-fit max-w-[80%] p-3 rounded-lg text-sm",
  },
  variants: {
    senderType: {
      [SenderTypeEnum.STORE]: {
        messageContainer: "justify-end",
        message: ["bg-red-default text-gray-800 rounded-br-none"],
      },
      [SenderTypeEnum.USER]: {
        messageContainer: "justify-start",
        message: ["bg-gray-900 text-gray-100 rounded-bl-none"],
      },
      [SenderTypeEnum.SYSTEM]: {},
    },
  },
});

export function ConversationList({ chatId, userId }: ConversationListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { messageContainer, message: messageStyle } = chatStyles();

  const [pageChatItemsList, setPageChatItemsList] = useState(1);
  const [chatItemsList, setChatItemsList] = useState<Partial<ChatItemModel>[]>(
    []
  );
  const [hasNoMoreChatItems, setHasNoMoreChatItems] = useState(true);
  const [message, setMessage] = useState("");
  const user = useUser((state) => state.user);
  const store = useStore((state) => state.store);
  const { unreadMessages, setUnreadMessages } = useChat((state) => state);
  const [userChat, setUserChat] = useState<{ id: string; name: string }>(
    {} as { id: string; name: string }
  );

  const [isLoadingChatList, startLoadingChatList, stopLoadingChatList] =
    useLoading();

  const [isLoadMoreLoading, startLoadMoreLoading, stopLoadMoreLoading] =
    useLoading();

  const [isUserLoading, startUserLoading, stopUserLoading] = useLoading();
  const route = useRouter();

  const logger = useLogger();

  const [
    isLoadingSendMessage,
    startLoadingSendMessage,
    stopLoadingSendMessage,
  ] = useLoading();

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (!user?.id) return;

    handleGetChatItemsList();
  }, [user]);

  useEffect(() => {
    if (chatItemsList?.length > 0) {
      const message = chatItemsList[0];
      if (userId === message?.user?.id && chatId === message?.chatId) {
        handleUpdateUnreadMessages();
      }
    }
  }, [chatItemsList, userId, chatId]);

  useEffect(() => {
    if (!store?.id) return;

    socket.emit("joinChatId", store?.id + userId);

    socket.on("messageStoreChatReceived", (message) => {
      if (message.chatId === chatId) {
        setChatItemsList((prev) => [message, ...prev]);
      }
    });

    return () => {
      socket.off("messageStoreChatReceived");
    };
  }, [store]);

  useEffect(() => {
    if (!user.id) return;
    getUser();
  }, [userId, user]);

  async function handleGetChatItemsList(): Promise<void> {
    startLoadingChatList();
    try {
      const chatList = await getConversation(
        chatId as string,
        pageChatItemsList
      );

      setChatItemsList((prev) => [...prev, ...chatList]);
      if (chatList.length < 10) {
        setHasNoMoreChatItems(true);
      } else {
        setHasNoMoreChatItems(false);
      }
    } catch (error) {
      logger.error("Error fetching chat items list", error);
    } finally {
      stopLoadingChatList();
    }
  }

  const getUser = useCallback(async () => {
    startUserLoading();
    try {
      const response = await authService.getUserById(userId);
      setUserChat({
        id: response.id,
        name: response.name,
      });
    } catch (error) {
      logger.error("Error fetching user data", error);
    } finally {
      stopUserLoading();
    }
  }, [userId]);

  async function handleUpdateUnreadMessages(): Promise<void> {
    try {
      const message = chatItemsList[0];

      await updateUnreadMessages(message.chatId as string);
      setUnreadMessages(unreadMessages.filter((id) => id !== message.chatId));
    } catch (error) {
      logger.error("Error updating unread messages", error);
    }
  }

  async function onLoadMore(): Promise<void> {
    const newPage = pageChatItemsList + 1;

    setPageChatItemsList(newPage);
    startLoadMoreLoading();

    try {
      const chatList = await getConversation(chatId as string, newPage);

      setChatItemsList((prev) => [...prev, ...chatList]);
      if (chatList.length < 10) {
        setHasNoMoreChatItems(true);
      } else {
        setHasNoMoreChatItems(false);
      }
    } catch (error) {
      logger.error("Error fetching chat items list", error);
    } finally {
      stopLoadMoreLoading();
    }
  }

  async function onSendMessage(): Promise<void> {
    startLoadingSendMessage();
    try {
      await sendChatMessage({
        storeId: store.id,
        userId,
        content: message,
      });

      const newChatItem: Partial<ChatItemModel> = {
        id: uuidv4(),
        content: message,
        createdAt: new Date().toISOString(),
        senderType: SenderTypeEnum.STORE,
        store: store,
        updatedBy: userId,
        updatedAt: new Date().toISOString(),
        user: null,
        chatId: chatId,
      };

      setChatItemsList([newChatItem, ...chatItemsList]);
      setMessage("");
    } catch (error) {
      logger.error("Error sending message", error);
    } finally {
      stopLoadingSendMessage();
    }
  }

  function openImage(image: string): void {
    window.open(image, "_blank");
  }

  function goToBack(): void {
    route.push("/chat");
  }

  return (
    <div>
      {!isUserLoading && (
        <button
          className="pb-2 border-b border-gray-700 text-lg font-semibold flex items-center gap-2"
          onClick={goToBack}
        >
          <CaretLeft size={20} />

          {userChat.name}
        </button>
      )}
      <div ref={containerRef}>
        {!isLoadingChatList ? (
          <div className="overflow-y-scroll h-[calc(100vh-350px)] md:h-[calc(100vh-250px)] w-full flex flex-col-reverse gap-4 items-end p-5">
            {chatItemsList.map((conversation) => (
              <>
                {conversation?.image && (
                  <div
                    className="self-start cursor-pointer"
                    onClick={() => openImage(conversation.image)}
                  >
                    <Image
                      src={conversation?.image}
                      width={100}
                      height={100}
                      alt="user image"
                      className="w-[200px] object-cover"
                    />
                  </div>
                )}

                <div
                  key={conversation.id || uuidv4()}
                  className={messageContainer({
                    senderType: conversation.senderType,
                  })}
                >
                  <div
                    className={messageStyle({
                      senderType: conversation.senderType,
                    })}
                  >
                    <div>{conversation.content}</div>
                    <div className="text-[10px] text-right">
                      {formatDateWithHour(conversation.createdAt)}
                    </div>
                  </div>
                </div>
              </>
            ))}

            {!hasNoMoreChatItems && (
              <div className="w-full flex justify-center">
                <Button
                  variant="secondary"
                  isLoading={isLoadMoreLoading}
                  disabled={isLoadMoreLoading}
                  onClick={onLoadMore}
                >
                  Carregar mais mensagens
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="overflow-y-scroll h-[calc(100vh-300px)] md:h-[calc(100vh-200px)] w-full">
            <ConversationLoading />
          </div>
        )}
      </div>

      <div className="w-full flex items-center gap-2">
        <TextArea
          className="flex-1 h-20"
          value={message}
          disabled={isLoadingSendMessage}
          placeholder="Escreva uma mensagem"
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
        <Button
          className="w-20 h-20"
          startIcon={PaperPlaneTilt}
          isLoading={isLoadingSendMessage}
          disabled={!Boolean(message.length) || isLoadingSendMessage}
          onClick={onSendMessage}
        />
      </div>
    </div>
  );
}
