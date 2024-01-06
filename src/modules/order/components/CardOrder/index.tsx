"use client";

import { ChatDots, MapPinLine } from "@phosphor-icons/react/dist/ssr";
import { OrderStatus } from "../../enums";

interface CardOrderProps {
  orderStatus: OrderStatus;
}

export function CardOrder({ orderStatus }: CardOrderProps) {
  return (
    <div className="p-2 bg-white rounded-lg font-inter">
      <div className="flex items-center justify-between">
        <span className="font-bold text-sm text-gray-100">Yan César</span>

        <div className="p-1 bg-gray-1000 rounded text-red-primary-dark">
          <ChatDots size={20} weight="bold" />
        </div>
      </div>

      <hr className="mt-2 border border-gray-700 " />

      <div className="mt-2 text-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold">VALOR TOTAL</span>
            <span className="text-xs font-medium">R$ 20,00</span>
          </div>

          <div className="flex flex-col gap-1 text-xs text-right">
            <span className="text-red-default font-medium">PEDIDO #2</span>
            <span className="font-medium">20/10/2021 (11:22)</span>
          </div>
        </div>

        <div className="mt-4">
          <span className="text-xs font-semibold">Entrega</span>

          <div className="flex items-center gap-1">
            <MapPinLine size={16} weight="bold" className="text-gray-700" />

            <span className="text-xs font-semibold font-inter text-gray-100">
              Rua 12 de Novembro, 59 - São João
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4">
          {orderStatus === OrderStatus.CONFIRMED && (
            <button className="border border-red-default text-red-default font-rubik font-semibold rounded text-xs w-full h-8">
              Saiu para entrega
            </button>
          )}
          {(orderStatus === OrderStatus.CONFIRMED ||
            orderStatus === OrderStatus.DELIVERING) && (
            <button className="border border-green-primary-dark text-green-primary-dark font-rubik font-semibold rounded text-xs w-full h-8">
              Finalizar
            </button>
          )}
          {orderStatus === OrderStatus.DELIVERED && (
            <button className="text-gray-500 font-rubik font-bold rounded text-xs w-full h-8">
              VER DETALHES
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
