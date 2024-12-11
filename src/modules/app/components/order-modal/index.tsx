"use client";

import { useEffect, useState } from "react";
import { useStore } from "../../store/stores";
import Dialog from "../dialog";

import socket from "@/providers/socketIo.provider";
import { Order } from "@/modules/order/models";
import {
  getAllOrderByStatus,
  updateOrderStatus,
} from "@/modules/order/services";
import { OrderStatus } from "@/modules/order/enums";
import { ModalOrderContent } from "@/modules/order/components/modal-order/modal-order-content";
import Button from "../button";
import { formatOrderNumber } from "@/formatting";
import { format } from "date-fns";
import { orderStatusMap } from "@/modules/order/enums/order-status";
import { useLoading, useToast } from "../../hooks";
import Toast from "../toast";
import ptBr from "date-fns/locale/pt-BR";
import { postNewOrderEvent } from "@/events";

export function OrderModal() {
  const store = useStore((state) => state.store);
  const [orders, setOrders] = useState<Order[]>([]);

  const { toast, setToast, error: toastError } = useToast();
  const [
    isUpdatingOrderStatus,
    startUpdateOrderStatus,
    finishUpdateOrderStatus,
  ] = useLoading();

  const order = orders[orders.length - 1];

  useEffect(() => {
    if (!store.id) return;
    fetchOrders();

    socket.emit("joinStore", store.id);

    socket.on("orderReceived", (newOrder) => {
      setOrders((prev) => [...prev, newOrder]);
    });

    return () => {
      socket.off("orderReceived");
    };
  }, [store]);

  useEffect(() => {
    if (orders.length === 0) return;

    playAudio();
  }, [orders]);

  async function playAudio() {
    const audio = new Audio("/bell.mp3");
    audio.play().catch((error) => {
      console.error("Error playing audio: ", error);
    });
  }

  async function fetchOrders() {
    try {
      const { orders } = await getAllOrderByStatus(OrderStatus.PENDING, 1, 100);

      setOrders(orders);

      if (orders.length > 0) {
        await playAudio();
      }
    } catch (error) {
      console.error(error);
      toastError("Erro ao buscar pedidos");
    }
  }

  async function handleUpdateOrderStatus(status: OrderStatus) {
    startUpdateOrderStatus();
    try {
      await updateOrderStatus(order.id, status);
      setOrders((prev) => prev.filter((o) => o.id !== order.id));
      setToast({ message: "Pedido atualizado com sucesso", open: true });

      setToast({ message: "Pedido atualizado com sucesso", open: true });

      if (status === OrderStatus.IN_PROGRESS) {
        postNewOrderEvent();
      }
    } catch (error) {
      toastError("Erro ao atualizar pedido");
    } finally {
      finishUpdateOrderStatus();
    }
  }

  if (!store.id || !order) {
    return null;
  }

  return (
    <>
      <Dialog open={!!orders.length}>
        <Dialog.Content
          title={
            formatOrderNumber(order.orderNumber) +
            " - " +
            format(new Date(order.createdAt), "dd/MM/yyyy (HH:mm)", {
              locale: ptBr,
            }) +
            " - " +
            orderStatusMap[order.status]
          }
          position="left"
          className="overflow-hidden"
        >
          <div className="max-h-[70vh] overflow-scroll pr-5">
            <ModalOrderContent order={order} />
          </div>

          <div className="flex flex-col gap-3 mt-3 border-t">
            <Button
              className="mt-4"
              isLoading={isUpdatingOrderStatus}
              disabled={isUpdatingOrderStatus}
              onClick={() => handleUpdateOrderStatus(OrderStatus.IN_PROGRESS)}
            >
              Aceitar
            </Button>
            <Button
              variant="secondary"
              isLoading={isUpdatingOrderStatus}
              disabled={isUpdatingOrderStatus}
              onClick={() => handleUpdateOrderStatus(OrderStatus.CANCELED)}
            >
              Recusar
            </Button>
          </div>
        </Dialog.Content>
      </Dialog>
      <Toast
        open={toast.open}
        type={toast.type}
        message={toast.message}
        setOpen={(open) => {
          setToast({ message: "", open });
        }}
      />
    </>
  );
}
