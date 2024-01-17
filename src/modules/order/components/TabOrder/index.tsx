"use client";

import { tv } from "tailwind-variants";
import { OrderStatus } from "../../enums";

interface TabOrderProps {
  orderStatus: OrderStatus;
  confirmedLength: number;
  deliveringLength: number;
  deliveredLength: number;
  onChange: (orderStatus: OrderStatus) => void;
}

const tabOrder = tv({
  slots: {
    container: ["grid grid-cols-3 gap-1 border border-gray-700 rounded"],
    tab: ["px-3 py-1"],
  },

  variants: {
    isSelected: {
      true: {
        tab: "bg-white",
      },
    },
  },
});

export function TabOrder({
  orderStatus,
  confirmedLength,
  deliveredLength,
  deliveringLength,
  onChange,
}: TabOrderProps) {
  const { container, tab } = tabOrder();

  return (
    <div data-cy="tab-order" className={container()}>
      <button
        data-cy="tab-order-confirmed"
        className={tab({ isSelected: orderStatus === OrderStatus.CONFIRMED })}
        onClick={() => onChange(OrderStatus.CONFIRMED)}
      >
        <div className="flex  items-center gap-1">
          <h2 className="font-bold text-xs xs:text-base text-gray-100">
            Produção
          </h2>
          <div>
            <div
              data-cy="confirmed-length"
              className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-red-default flex items-center justify-center text-[10px] md:text-xs font-semibold text-white"
            >
              {confirmedLength}
            </div>
          </div>
        </div>
      </button>

      <button
        data-cy="tab-order-delivering"
        className={tab({ isSelected: orderStatus === OrderStatus.DELIVERING })}
        onClick={() => onChange(OrderStatus.DELIVERING)}
      >
        <div className="flex items-center gap-1">
          <h2 className="font-bold text-xs xs:text-base text-gray-100">
            Entrega
          </h2>
          <div>
            <div
              data-cy="delivering-length"
              className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-red-default flex items-center justify-center text-[10px] md:text-xs font-semibold text-white"
            >
              {deliveringLength}
            </div>
          </div>
        </div>
      </button>

      <button
        data-cy="tab-order-delivered"
        className={tab({ isSelected: orderStatus === OrderStatus.DELIVERED })}
        onClick={() => onChange(OrderStatus.DELIVERED)}
      >
        <div className="flex items-center gap-1">
          <h2 className="font-bold text-xs xs:text-base text-gray-100">
            Finalizado
          </h2>
          <div>
            <div
              data-cy="delivered-length"
              className="w-4 h-4 xl:w-5 xl:h-5 rounded-full bg-red-default flex items-center justify-center text-[10px] xl:text-xs font-semibold text-white"
            >
              {deliveredLength}
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
