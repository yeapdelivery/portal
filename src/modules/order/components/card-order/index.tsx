"use client";

import { useEffect, useRef, useState } from "react";
import { ChatDots, MapPinLine } from "@phosphor-icons/react/dist/ssr";
import { OrderStatus } from "../../enums";
import { Order } from "../../models";
import { format, set } from "date-fns";
import { currency, formatAddress } from "@/formatting";
import { CardLoading } from "./card-loading";
import { tv } from "tailwind-variants";

interface CardOrderProps {
  order: Order;
  isNew?: boolean;
  handleChangeStatus?: (
    order: Order,
    from: OrderStatus,
    to: OrderStatus
  ) => void;
  handleRemoveNewValue: (orderId: string) => void;
}

const cardStyle = tv({
  slots: {
    card: [
      "hover:bg-gray-1000 p-3 data-[enter=true]:animate-card-order-animation",
      "rounded-lg font-inter  duration-500 animate-card-order-animation transition-opacity",
      "hover:border-solid hover:border hover:border-blue-default bg-white",
    ],
  },
});

const INITIAL_TIMER = 30;

export function CardOrder({
  order,
  isNew = false,
  handleChangeStatus,
  handleRemoveNewValue,
}: CardOrderProps) {
  const { card } = cardStyle();

  const ref = useRef<HTMLDivElement>(null);
  const [timer, setTimer] = useState<number>(INITIAL_TIMER);

  const verifyConfirmedState = order.status === OrderStatus.CONFIRMED;

  const verifyProducingState = order.status === OrderStatus.CONFIRMED;
  const verifyDeliveringState =
    !isNew && order.status === OrderStatus.DELIVERING;

  const verifyDeliveredState = order.status === OrderStatus.DELIVERED;

  useEffect(() => {
    if (!isNew || order.status !== OrderStatus.DELIVERING) return;

    const interval = setInterval(() => {
      const newTimer = timer - 1;

      if (newTimer <= 0) {
        clearInterval(interval);
        handleRemoveNewValue(order.id);
        setTimer(0);
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

  return (
    <div ref={ref} data-enter={isNew} className={card()}>
      <div className="flex items-center justify-between">
        <span className="font-bold text-sm text-gray-100">
          {order.customer.name}
        </span>

        <div className="p-1 bg-gray-1000 rounded text-red-primary-dark">
          <ChatDots size={20} weight="bold" />
        </div>
      </div>

      <hr className="mt-2 border border-gray-700" />

      <div className="mt-2 text-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold">VALOR TOTAL</span>
            <span className="text-xs font-medium">{currency(order.price)}</span>
          </div>

          <div className="flex flex-col gap-1 text-xs text-right">
            <span className="text-red-default font-medium">
              PEDIDO #{`${order.order_id}`}
            </span>
            <span className="font-medium">
              {format(new Date(order.created_at), "dd/MM/yyyy (h:mm)")}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <span className="text-xs font-semibold">Entrega</span>

          <div className="flex items-center gap-1">
            <MapPinLine size={16} weight="bold" className="text-gray-700" />

            <span className="text-xs font-semibold font-inter text-gray-100">
              {formatAddress(order.address)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4">
          {verifyConfirmedState && (
            <button
              onClick={() =>
                changeStatus(OrderStatus.CONFIRMED, OrderStatus.DELIVERING)
              }
              className="border animate-card-order-animation border-red-default text-red-default font-rubik font-semibold rounded text-[10px] w-full h-8"
            >
              Saiu para entrega
            </button>
          )}
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
                changeStatus(OrderStatus.CONFIRMED, OrderStatus.DELIVERED)
              }
              className="border animate-card-order-animation border-green-primary-dark text-green-primary-dark font-rubik font-semibold rounded text-[10px] w-full h-8"
            >
              Finalizar
            </button>
          )}
          {verifyDeliveredState && (
            <button className="text-gray-500 animate-card-order-animation font-rubik font-bold rounded text-[10px] w-full h-8">
              VER DETALHES
            </button>
          )}
          {isNew && timer > 0 && order.status === OrderStatus.DELIVERING && (
            <button
              onClick={() =>
                changeStatus(OrderStatus.DELIVERING, OrderStatus.CONFIRMED)
              }
              className="border border-red-default animate-card-order-animation text-red-default font-rubik font-semibold rounded text-xs w-full h-8"
            >
              Voltar para produção ({timer}s)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

CardOrder.Loading = CardLoading;
