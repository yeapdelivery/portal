"use client";

import { useEffect, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

import { DatePicker, TextFiled } from "@/modules/app/components";
import { OrderStatus } from "../enums";
import { CardOrder, TabOrder } from "../components";
import useScreenSize from "@/modules/app/hooks/useScreenSize";
import axios from "axios";
import { Order } from "../components/Models";
import { useLoading } from "@/modules/app/hooks";
import { getScreenSize } from "@/utils";

export function ListOrders() {
  const [orderStatusTab, setOrderStatusTab] = useState(OrderStatus.CONFIRMED);
  const [ordersConfirmed, setOrdersConfirmed] = useState<Order[]>([]);
  const [ordersDelivering, setOrdersDelivering] = useState<Order[]>([]);
  const [ordersDelivered, setOrdersDelivered] = useState<Order[]>([]);
  const [isListOrderLoading, _startListOrderLoader, stopListOrderLoader] =
    useLoading(true);
  const screenSize = useScreenSize();

  const ordersOccurrences =
    ordersConfirmed.length + ordersDelivering.length + ordersDelivered.length;

  useEffect(() => {
    function fetchOrders() {
      axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/order`)
        .then(({ data }) => {
          setOrdersConfirmed(data.orders.confirm);
          setOrdersDelivering(data.orders.delivering);
          setOrdersDelivered(data.orders.delivered);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          stopListOrderLoader();
        });
    }

    fetchOrders();
  }, []);

  function onChangeOrderStatusTab(orderStatus: OrderStatus) {
    setOrderStatusTab(orderStatus);
  }

  return (
    <div className="px-4  py-7">
      <div className="flex flex-1 items-center justify-between gap-4">
        <div className="flex items-center gap-1.5">
          <h1 className="font-bold text-sm xs:text-xl font-rubik text-gray-100">
            Pedidos
          </h1>

          <div className="text-[8px] md:text-xs text-red-default border border-red-default rounded  p-[1px]">
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

      <div className="flex-1 md:hidden mt-8">
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
            onChange={(status) => onChangeOrderStatusTab(status)}
          />
        </div>

        {(screenSize.width >= getScreenSize("lg") ||
          orderStatusTab === OrderStatus.CONFIRMED) && (
          <div className="flex-1">
            <div className="hidden md:flex items-center gap-1">
              <h2 className="font-bold text-gray-100">Produção</h2>
              <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-red-default flex items-center justify-center text-xs font-semibold text-white">
                {ordersConfirmed.length}
              </div>
            </div>

            <div className="mt-2 space-y-2 overflow-y-scroll h-[70vh] lg:h-[85vh]">
              {isListOrderLoading &&
                Array.from({ length: 10 }).map((_, index) => (
                  <CardOrder.Loading key={index} />
                ))}
              {!isListOrderLoading &&
                ordersConfirmed.map((order, index) => (
                  <CardOrder key={index} order={order} />
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
                {ordersDelivering.length}
              </div>
            </div>
            <div className="mt-2 space-y-2 overflow-y-scroll h-[70vh] lg:h-[85vh]">
              {isListOrderLoading &&
                Array.from({ length: 10 }).map((_, index) => (
                  <CardOrder.Loading key={index} />
                ))}
              {!isListOrderLoading &&
                ordersDelivering.map((order, index) => (
                  <CardOrder key={index} order={order} />
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
                {ordersDelivered.length}
              </div>
            </div>
            <div className="mt-2 space-y-2 overflow-y-scroll h-[70vh] lg:h-[85vh]">
              {isListOrderLoading &&
                Array.from({ length: 10 }).map((_, index) => (
                  <CardOrder.Loading key={index} />
                ))}
              {!isListOrderLoading &&
                ordersDelivered.map((order, index) => (
                  <CardOrder key={index} order={order} />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
