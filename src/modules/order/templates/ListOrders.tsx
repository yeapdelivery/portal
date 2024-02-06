"use client";

import { useEffect, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

import { DatePicker, TextFiled } from "@/modules/app/components";
import { OrderStatus } from "../enums";
import { CardOrder, TabOrder } from "../components";
import useScreenSize from "@/modules/app/hooks/use-screen-size";
import axios from "axios";
import { Order } from "../Models";
import { useLoading } from "@/modules/app/hooks";
import { getScreenSize } from "@/utils";

interface OrderBoard {
  confirmed: Order[];
  delivering: Order[];
  delivered: Order[];
}

export function ListOrders() {
  const [orderStatusTab, setOrderStatusTab] = useState(OrderStatus.CONFIRMED);
  const [orders, setOrders] = useState<OrderBoard>({
    confirmed: [],
    delivering: [],
    delivered: [],
  } as OrderBoard);
  const [orderChangeStatusId, newOrderChangeStatusId] = useState<string[]>([]);
  const [isListOrderLoading, _startListOrderLoader, stopListOrderLoader] =
    useLoading(true);
  const screenSize = useScreenSize();

  const ordersOccurrences =
    orders.confirmed.length +
    orders.delivering.length +
    orders.delivered.length;

  useEffect(() => {
    fetchOrders();
  }, []);

  function fetchOrders(): void {
    axios
      .get(`https://admin.yeapdelivery.com.br/api/order`)
      .then(({ data }) => {
        const ordersResponse = data.orders;
        setOrders({
          confirmed: ordersResponse.confirm,
          delivering: ordersResponse.delivering,
          delivered: ordersResponse.delivered,
        });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        stopListOrderLoader();
      });
  }

  function onChangeOrderStatusTab(orderStatus: OrderStatus): void {
    setOrderStatusTab(orderStatus);
  }

  function handleChangeStatus(
    order: Order,
    from: OrderStatus,
    to: OrderStatus
  ): void {
    const ordersFrom = orders[from];
    const newOrdersFrom = ordersFrom.filter(
      (orderConfirmed: Order) => orderConfirmed.order_id !== order.order_id
    );

    order.status = to;

    const newOrders = {
      ...orders,
      [from]: newOrdersFrom,
      [to]: [order, ...orders[to]],
    };

    newOrderChangeStatusId((oldValue) => [...oldValue, order.id]);
    setOrders(newOrders);
  }

  function handleRemoveNewValue(orderId: string) {
    newOrderChangeStatusId((oldValue) =>
      oldValue.filter((id) => id !== orderId)
    );
  }

  return (
    <div className="px-4 pb-7">
      <div className="flex flex-1 items-center justify-between gap-4 md:mt-12">
        <div className="flex items-center gap-1.5">
          <h1 className="font-bold text-sm xs:text-xl font-rubik text-gray-100">
            Pedidos
          </h1>

          <div className="text-[8px] md:text-xs text-red-default border border-red-default rounded  p-[4px]">
            {ordersOccurrences}{" "}
            {ordersOccurrences > 0 ? "ocorrencias" : "ocorrencia"}
          </div>
        </div>

        <div className="flex-1 hidden md:block">
          <TextFiled error={null} htmlFor="search" label="">
            <TextFiled.Input
              id="search"
              placeholder="Procure por cliente, telefone ou número."
              startIcon={
                <MagnifyingGlass size={20} className="text-gray-500" />
              }
            />
          </TextFiled>
        </div>

        <div className="w-[150px]">
          <DatePicker maxDate={new Date()} />
        </div>
      </div>

      <div className="flex-1 md:hidden mt-10">
        <TextFiled error={null} htmlFor="search" label="">
          <TextFiled.Input
            id="search"
            placeholder="Procure por cliente, telefone ou número."
            startIcon={<MagnifyingGlass size={20} className="text-gray-500" />}
          />
        </TextFiled>
      </div>

      <div className="mt-6 grid lg:grid-cols-kanban gap-[10px]">
        <div className="md:hidden">
          <TabOrder
            orderStatus={orderStatusTab}
            confirmedLength={orders.confirmed.length}
            deliveringLength={orders.delivering.length}
            deliveredLength={orders.delivered.length}
            onChange={(status) => onChangeOrderStatusTab(status)}
          />
        </div>

        {(screenSize.width >= getScreenSize("lg") ||
          orderStatusTab === OrderStatus.CONFIRMED) && (
          <div className="flex-1">
            <div className="hidden md:flex items-center gap-1">
              <h2 className="font-bold text-gray-100">Produção</h2>
              <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-red-default flex items-center justify-center text-xs font-semibold text-white">
                {orders.confirmed.length}
              </div>
            </div>

            <div className="mt-2 rounded-lg space-y-2 overflow-y-scroll h-[70vh] lg:h-[85vh]">
              {isListOrderLoading &&
                Array.from({ length: 10 }).map((_, index) => (
                  <CardOrder.Loading key={index} />
                ))}
              {!isListOrderLoading &&
                orders.confirmed.map((order) => (
                  <CardOrder
                    key={order.id}
                    order={order}
                    isNew={orderChangeStatusId.includes(order.id)}
                    handleChangeStatus={handleChangeStatus}
                    handleRemoveNewValue={handleRemoveNewValue}
                  />
                ))}
            </div>
          </div>
        )}

        <div className="mt-10 hidden md:block">
          <hr className="min-h-full w-[1px] border border-gray-700" />
        </div>
        {(screenSize.width >= getScreenSize("lg") ||
          orderStatusTab === OrderStatus.DELIVERING) && (
          <div>
            <div className="hidden md:flex items-center gap-1">
              <h2 className="font-bold text-gray-100">Entrega</h2>
              <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-red-default flex items-center justify-center text-xs font-semibold text-white">
                {orders.delivering.length}
              </div>
            </div>
            <div className="mt-2 rounded-lg space-y-2 overflow-y-scroll h-[70vh] lg:h-[85vh]">
              {isListOrderLoading &&
                Array.from({ length: 10 }).map((_, index) => (
                  <CardOrder.Loading key={index} />
                ))}
              {!isListOrderLoading &&
                orders.delivering.map((order) => (
                  <CardOrder
                    key={order.id}
                    order={order}
                    isNew={orderChangeStatusId.includes(order.id)}
                    handleChangeStatus={handleChangeStatus}
                    handleRemoveNewValue={handleRemoveNewValue}
                  />
                ))}
            </div>
          </div>
        )}

        <div className="mt-10 hidden md:block">
          <hr className="min-h-full w-[1px] border border-gray-700" />
        </div>

        {(screenSize.width >= getScreenSize("lg") ||
          orderStatusTab === OrderStatus.DELIVERED) && (
          <div>
            <div className="hidden md:flex items-center gap-1">
              <h2 className="font-bold text-xs text-gray-100">Finalizados</h2>
              <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-red-default flex items-center justify-center text-xs font-semibold text-white">
                {orders.delivered.length}
              </div>
            </div>
            <div className="mt-2 rounded-lg space-y-2 overflow-y-scroll h-[70vh] lg:h-[85vh]">
              {isListOrderLoading &&
                Array.from({ length: 10 }).map((_, index) => (
                  <CardOrder.Loading key={index} />
                ))}
              {!isListOrderLoading &&
                orders.delivered.map((order) => (
                  <CardOrder
                    key={order.id}
                    order={order}
                    isNew={orderChangeStatusId.includes(order.id)}
                    handleChangeStatus={handleChangeStatus}
                    handleRemoveNewValue={handleRemoveNewValue}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
