"use client";

import { tv } from "tailwind-variants";
import { ChatDots, MapPinLine } from "@phosphor-icons/react/dist/ssr";

import { useEffect, useRef, useState } from "react";
import { DeliveryType, deliveryTypeMap, OrderStatus } from "../../enums";
import { Order } from "../../models";
import { CardLoading } from "./card-loading";
import { currency, formatAddress, formatOrderNumber } from "@/formatting";
import { updateOrderStatus } from "../../services";
import { formatDateWithHour } from "@/utils/format-date.util";
import { isOnDesktopApp, isPastChat } from "@/utils";
import { Printer } from "@phosphor-icons/react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { OrderPDF } from "../pdf-order-document";
import { Pill } from "@/modules/app/components/pill";
import { SystemPill } from "@/modules/app/components/system-pill";
import { useStore } from "@/modules/app/store/stores";
import Toast from "@/modules/app/components/toast";
import { useToast } from "@/modules/app/hooks";

interface CardOrderProps {
  order: Order;
  isNew?: boolean;
  handleSendMessageClick: (order: Order) => void;
  handleChangeStatus?: (
    order: Order,
    from: OrderStatus,
    to: OrderStatus
  ) => void;
  handleRemoveNewValue: (orderId: string) => void;
  openOrderDetail: (order: Order) => void;
}

const cardStyle = tv({
  slots: {
    card: [
      "hover:bg-gray-1000 p-3 data-[enter=true]:animate-card-order-animation",
      "rounded-lg font-inter  duration-500 animate-card-order-animation transition-opacity",
      "hover:border-solid hover:border hover:border-blue-default bg-white",
      "border border-gray-700",
    ],
  },
});

const INITIAL_TIMER = 30;

export function CardOrder({
  order,
  isNew = false,
  handleSendMessageClick,
  handleChangeStatus,
  handleRemoveNewValue,
  openOrderDetail,
}: CardOrderProps) {
  const { card } = cardStyle();

  const ref = useRef<HTMLDivElement>(null);
  const [timer, setTimer] = useState<number>(INITIAL_TIMER);
  const store = useStore((state) => state.store);
  const { toast, warning, setToast } = useToast();

  const verifyConfirmedState = order.status === OrderStatus.IN_PROGRESS;

  const verifyProducingState = order.status === OrderStatus.IN_PROGRESS;
  const verifyDeliveringState =
    !isNew && order.status === OrderStatus.DELIVERING;

  const isPast =
    isPastChat(order.createdAt) &&
    !isNew &&
    order.status === OrderStatus.DELIVERED;

  useEffect(() => {
    if (!isNew || order.status !== OrderStatus.DELIVERING) return;

    const interval = setInterval(() => {
      const newTimer = timer - 1;

      if (newTimer <= 0) {
        clearInterval(interval);
        handleRemoveNewValue(order.id);
        setTimer(0);

        updateOrderStatus(order.id, OrderStatus.DELIVERING);
        return;
      }

      setTimer(newTimer);
    }, 1000);
    return () => clearInterval(interval);
  }, [handleRemoveNewValue, isNew, order, timer]);

  function changeStatus(from: OrderStatus, to: OrderStatus) {
    if (ref.current) {
      const element = ref.current;
      element.style.animationDuration = "1s";
      element.style.opacity = "0";

      const timer = setTimeout(() => {
        handleChangeStatus(order, from, to);
        element.style.opacity = "1";
      }, 500);

      return () => clearTimeout(timer);
    }
  }

  function printOrder() {
    // if (!isOnDesktopApp) {
    //   warning("Essa funcionalidade só está disponível no aplicativo desktop.");
    //   return;
    // }

    // if (!store.printerName) {
    //   warning("Nenhuma impressora configurada.");
    //   return;
    // }

    if (window.api?.printOrder) {
      window.api.printOrder({
        order,
        printerName: store.printerName,
      });
    }
  }

  return (
    <div ref={ref} data-enter={isNew} className={card()}>
      <div className="flex items-center justify-between mb-1">
        <span className="font-bold text-sm text-gray-100">
          {order.userName}{" "}
          <span className="text-red-default font-medium">
            {formatOrderNumber(order.orderNumber)}
          </span>
        </span>

        <div className="flex items-center gap-4">
          <div className="p-1 bg-gray-1000 rounded text-red-primary-dark w-5 h-5 flex items-center justify-center">
            {!isPast && (
              <button onClick={() => handleSendMessageClick(order)}>
                <ChatDots size={16} weight="bold" />
              </button>
            )}
          </div>

          <div className="p-1 bg-gray-1000 rounded text-red-primary-dark w-5 h-5 flex items-center justify-center">
            <button className="mt-1" onClick={printOrder}>
              <Printer size={16} weight="bold" />
            </button>
          </div>
        </div>
      </div>

      <hr className="`mt`-2 border border-gray-700" />

      <div className="mt-2 text-gray-100">
        {order.status !== OrderStatus.DELIVERED && (
          <div className="my-3">
            <SystemPill
              variant={
                order.deliveryType === DeliveryType.PICKUP
                  ? "warning"
                  : "success"
              }
            >
              {deliveryTypeMap[order.deliveryType]}
            </SystemPill>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold">VALOR TOTAL</span>
            <span className="text-xs font-medium">
              {currency(order.totalPrice)}
            </span>
          </div>

          <div className="flex flex-col gap-1 text-xs text-right">
            <span className="font-medium">
              {formatDateWithHour(order.createdAt)}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <span className="text-xs font-semibold">Entrega</span>

          <div className="flex items-center gap-1">
            <MapPinLine size={16} weight="bold" className="text-gray-700" />

            <span className="text-xs font-semibold font-inter text-gray-100">
              {formatAddress(order.userAddress)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4">
          {verifyDeliveringState && (
            <button
              onClick={() =>
                changeStatus(OrderStatus.DELIVERING, OrderStatus.DELIVERED)
              }
              className="border animate-card-order-animation border-green-primary-dark text-green-primary-dark font-rubik font-semibold rounded text-[10px] w-full h-8"
            >
              Finalizar
            </button>
          )}
          {verifyProducingState && (
            <button
              onClick={() =>
                changeStatus(OrderStatus.IN_PROGRESS, OrderStatus.DELIVERED)
              }
              className="border animate-card-order-animation border-red-default text-red-default font-rubik font-semibold rounded text-[10px] w-full h-8"
            >
              Finalizar
            </button>
          )}

          {verifyConfirmedState && (
            <button
              onClick={() =>
                changeStatus(OrderStatus.IN_PROGRESS, OrderStatus.DELIVERING)
              }
              className="border animate-card-order-animation border-green-primary-dark text-green-primary-dark font-rubik font-semibold rounded text-[10px] w-full h-8"
            >
              {order.deliveryType === DeliveryType.DELIVERY
                ? "Saiu para entrega"
                : "Pronto para retirada"}
            </button>
          )}

          {isNew && timer > 0 && order.status === OrderStatus.DELIVERING && (
            <button
              onClick={() =>
                changeStatus(OrderStatus.DELIVERING, OrderStatus.IN_PROGRESS)
              }
              className="border border-red-default animate-card-order-animation text-red-default font-rubik font-semibold rounded text-xs w-full h-8"
            >
              Voltar para produção ({timer}s)
            </button>
          )}
        </div>

        <button
          onClick={() => openOrderDetail(order)}
          className="mt-2 text-red-400 animate-card-order-animation font-rubik font-bold rounded text-[10px] w-full h-8"
        >
          VER DETALHES
        </button>
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        open={toast.open}
        setOpen={(open) => {
          if (!open) {
            setToast({ ...toast, open: false });
          }
        }}
      />
    </div>
  );
}

CardOrder.Loading = CardLoading;
