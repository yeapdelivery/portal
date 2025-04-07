"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useStore } from "../../store/stores";
import Dialog from "../dialog";

import { Order } from "@/modules/order/models";
import { updateOrderStatus } from "@/modules/order/services";
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
import { useLogger } from "../../hooks/use-logger.hook";

interface OrderModalProps {
  orders: Order[];
  setOrders: Dispatch<SetStateAction<Order[]>>;
}

export function OrderModal({ orders, setOrders }: OrderModalProps) {
  const store = useStore((state) => state.store);

  const { toast, setToast, error: toastError } = useToast();
  const [
    isUpdatingOrderStatus,
    startUpdateOrderStatus,
    finishUpdateOrderStatus,
  ] = useLoading();
  const logger = useLogger();

  const order = orders[orders.length - 1];

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
      logger.error("Erro ao atualizar pedido", { error });
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
