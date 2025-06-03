"use client";

import { useEffect, useRef, useState } from "react";
import { useStore } from "../../store/stores";

import socket from "@/providers/socketIo.provider";
import { Order } from "@/modules/order/models";
import { getAllOrderByStatus } from "@/modules/order/services";
import { OrderStatus } from "@/modules/order/enums";
import { useModal, useToast } from "../../hooks";

import { useChat } from "@/modules/chat/store";
import { OrderModal } from "../order-modal";
import { HaveNewMessageModal } from "../have-new-message-modal";
import { checkUnreadMessages } from "@/modules/chat/services";
import { usePathname } from "next/navigation";
import { useLogger } from "../../hooks/use-logger.hook";

export function SocketWrapper() {
  const store = useStore((state) => state.store);
  const [unreadMessages, setUnreadMessages] = useChat((state) => [
    state.unreadMessages,
    state.setUnreadMessages,
  ]);
  const [orders, setOrders] = useState<Order[]>([]);
  const {
    open: isOpenHaveNewMessageModal,
    onOpenChange: setOpenHaveNewMessageModal,
  } = useModal();
  const [connectedStoreRom, setConnectedStoreRom] = useState(false);
  const pathname = usePathname();

  const { error: toastError } = useToast();
  const logger = useLogger();

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    audioRef.current = new Audio("/bell.mp3");

    const handleUserInteraction = () => {
      if (!audioRef.current) return;

      audioRef.current
        .play()
        .then(() => {
          audioRef.current?.pause();
          audioRef.current.currentTime = 0;
        })
        .catch(() => {});

      window.removeEventListener("click", handleUserInteraction);
    };

    window.addEventListener("click", handleUserInteraction);
    return () => {
      window.removeEventListener("click", handleUserInteraction);
    };
  }, []);

  useEffect(() => {
    if (!store.id) return;

    fetchOrders();
    getCheckUnreadMessages();
  }, [store]);

  useEffect(() => {
    if (!store.id) return;

    if (!connectedStoreRom) {
      socket.emit("joinStore", store.id, (response) => {
        if (response.success) {
          setConnectedStoreRom(true);
        }
      });

      socket.on("orderReceived", (newOrder) => {
        setOrders((prev) => [newOrder, ...prev]);
      });

      socket.on("storeHaveNewMessage", (chatId) => {
        const set = new Set(unreadMessages);
        set.add(chatId);
        setUnreadMessages(Array.from(set));

        if (pathname.includes("chat")) return;
        setOpenHaveNewMessageModal(true);
      });
    }

    return () => {
      socket.off("orderReceived");
      socket.off("storeHaveNewMessage");
    };
  }, [store, pathname]);

  useEffect(() => {
    if (orders.length === 0) return;

    playAudio();
  }, [orders]);

  async function playAudio(): Promise<void> {
    try {
      if (audioRef.current) {
        await audioRef.current.play();
      }
    } catch (error) {
      console.error("Error playing audio: ", error);
    }
  }

  async function fetchOrders(): Promise<void> {
    try {
      const { orders } = await getAllOrderByStatus(
        OrderStatus.PENDING,
        1,
        100,
        undefined,
        "asc"
      );

      setOrders(orders);

      if (orders.length > 0) {
        await playAudio();
      }
    } catch (error) {
      toastError("Erro ao buscar pedidos");
      logger.error("Erro ao buscar pedidos", { error });
    }
  }

  async function getCheckUnreadMessages(): Promise<void> {
    try {
      const hasUnreadMessages = await checkUnreadMessages(store.id);

      if (hasUnreadMessages?.length > 0) {
        setUnreadMessages(hasUnreadMessages);

        if (pathname.includes("chat")) return;
        setOpenHaveNewMessageModal(true);
      }
    } catch (error) {
      logger.error("Erro ao buscar mensagens não lidas", { error });
    }
  }

  return (
    <div>
      <HaveNewMessageModal
        open={isOpenHaveNewMessageModal && orders.length === 0}
        onOpenChange={setOpenHaveNewMessageModal}
      />
      <OrderModal orders={orders} setOrders={setOrders} />
    </div>
  );
}
