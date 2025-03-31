/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useEffect, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

import TextFiled from "@/modules/app/components/text-filed";
import { CardOrder, TabOrder } from "../components";
import useScreenSize from "@/modules/app/hooks/use-screen-size";
import { Order } from "../models";
import { useLoading, useModal, useToast } from "@/modules/app/hooks";
import { getScreenSize } from "@/utils";
import {
  getAllOrderByStatus,
  OrderResponse,
  updateOrderStatus,
} from "../services";
import { OrderStatus } from "../enums";
import { useStore } from "@/modules/app/store/stores";
import Toast from "@/modules/app/components/toast";
import { ToastType } from "@/modules/app/components/toast/types";
import Button from "@/modules/app/components/button";
import { Plus } from "@phosphor-icons/react";
import { ModalOrder } from "../components/modal-order";
import { removeNewOrderEvent, useNewOrderEvent } from "@/events";
import { SendMessageModal } from "@/modules/app/components/send-message-modal";

interface OrderBoard {
  [OrderStatus.IN_PROGRESS]: OrderResponse;
  [OrderStatus.DELIVERING]: OrderResponse;
  [OrderStatus.DELIVERED]: OrderResponse;
}

export function ListOrders() {
  const [orderStatusTab, setOrderStatusTab] = useState(OrderStatus.IN_PROGRESS);
  const [orders, setOrders] = useState<OrderBoard>({
    [OrderStatus.IN_PROGRESS]: {
      orders: [],
      count: 0,
    },
    [OrderStatus.DELIVERING]: {
      orders: [],
      count: 0,
    },
    [OrderStatus.DELIVERED]: {
      orders: [],
      count: 0,
    },
  } as OrderBoard);
  const [orderChangeStatusId, newOrderChangeStatusId] = useState<string[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const screenSize = useScreenSize();
  const store = useStore((state) => state.store);
  const [pageInProgress, setPageInProgress] = useState(1);
  const [pageDelivering, setPageDelivering] = useState(1);
  const [pageDelivered, setPageDelivered] = useState(1);

  const [isListOrderLoading, startListOrderLoader, stopListOrderLoader] =
    useLoading(true);
  const [
    isLoadMoreOrderInProgress,
    startLoadMoreOrderInProgress,
    stopLoadMoreOrderInProgress,
  ] = useLoading();
  const [
    isLoadMoreOrderDelivering,
    startLoadMoreOrderDelivering,
    stopLoadMoreOrderDelivering,
  ] = useLoading();
  const [
    isLoadMoreOrderDelivered,
    startLoadMoreOrderDelivered,
    stopLoadMoreOrderDelivered,
  ] = useLoading();

  const { open, onOpenChange } = useModal();
  const { open: openSendMessageModal, onOpenChange: onOpenSendMessageModal } =
    useModal();
  const { error: errorToast, success, toast, setToast } = useToast();

  const ordersOccurrences =
    orders[OrderStatus.IN_PROGRESS].count +
    orders[OrderStatus.DELIVERING].count +
    orders[OrderStatus.DELIVERED].count;

  useEffect(() => {
    fetchOrders();
  }, [store]);

  useEffect(() => {
    async function getOrder() {
      startListOrderLoader();
      await fetchOrder(OrderStatus.IN_PROGRESS, 1, true);
      stopListOrderLoader();
    }

    useNewOrderEvent(getOrder);

    return () => removeNewOrderEvent(getOrder);
  });

  const startLoadMoreOrder = {
    [OrderStatus.IN_PROGRESS]: startLoadMoreOrderInProgress,
    [OrderStatus.DELIVERING]: startLoadMoreOrderDelivering,
    [OrderStatus.DELIVERED]: startLoadMoreOrderDelivered,
  };

  const stopLoadMoreOrder = {
    [OrderStatus.IN_PROGRESS]: stopLoadMoreOrderInProgress,
    [OrderStatus.DELIVERING]: stopLoadMoreOrderDelivering,
    [OrderStatus.DELIVERED]: stopLoadMoreOrderDelivered,
  };

  const hasMoreOrderInProgress =
    orders[OrderStatus.IN_PROGRESS].count !==
    orders[OrderStatus.IN_PROGRESS].orders.length;
  const hasMoreOrderDelivering =
    orders[OrderStatus.DELIVERING].count !==
    orders[OrderStatus.DELIVERING].orders.length;
  const hasMoreOrderDelivered =
    orders[OrderStatus.DELIVERED].count !==
    orders[OrderStatus.DELIVERED].orders.length;

  async function handleSetOrders(
    status: OrderStatus,
    newOrders: OrderResponse,
    shouldNewOrderFist: boolean = false
  ) {
    if (shouldNewOrderFist) {
      setOrders((oldValue) => ({
        ...oldValue,
        [status]: {
          orders: [...newOrders.orders],
          count: newOrders.count,
        },
      }));

      return;
    } else {
      setOrders((oldValue) => ({
        ...oldValue,
        [status]: {
          orders: [...oldValue[status].orders, ...newOrders.orders],
          count: newOrders.count,
        },
      }));
    }
  }

  async function fetchOrder(
    status: OrderStatus,
    page: number,
    shouldNewOrderFist = false
  ): Promise<void> {
    if (!store.id) return;

    startLoadMoreOrder[status]();
    try {
      const newOrders = await getAllOrderByStatus(status, page);

      handleSetOrders(status, newOrders, shouldNewOrderFist);
    } catch (error) {
      console.log(error);
      errorToast("Erro ao buscar pedidos");
    } finally {
      stopLoadMoreOrder[status]();
    }
  }

  async function fetchOrders(): Promise<void> {
    if (!store.id) return;

    try {
      const [confirmed, delivering, delivered] = await Promise.all([
        getAllOrderByStatus(OrderStatus.IN_PROGRESS),
        getAllOrderByStatus(OrderStatus.DELIVERING),
        getAllOrderByStatus(OrderStatus.DELIVERED),
      ]);

      setOrders({
        [OrderStatus.IN_PROGRESS]: confirmed || { orders: [], count: 0 },
        [OrderStatus.DELIVERING]: delivering || { orders: [], count: 0 },
        [OrderStatus.DELIVERED]: delivered || { orders: [], count: 0 },
      });
    } catch (error) {
      console.log(error);
    } finally {
      stopListOrderLoader();
    }
  }

  function onChangeOrderStatusTab(orderStatus: OrderStatus): void {
    setOrderStatusTab(orderStatus);
  }

  async function handleChangeStatus(
    order: Order,
    from: OrderStatus,
    to: OrderStatus
  ): Promise<void> {
    const ordersFrom = orders[from].orders;

    const newOrdersFrom = ordersFrom.filter(
      (orderConfirmed: Order) => orderConfirmed.id !== order.id
    );

    order.status = to;

    const newOrders = {
      ...orders,
      [from]: {
        orders: newOrdersFrom,
        count: orders[from].count - 1,
      },
      [to]: {
        orders: [order, ...orders[to].orders],
        count: orders[to].count + 1,
      },
    };

    newOrderChangeStatusId((oldValue) => [...oldValue, order.id]);
    setOrders(newOrders);

    if (to !== OrderStatus.DELIVERING) {
      await updateOrderStatus(order.id, to);
    }
  }

  function handleRemoveNewValue(orderId: string): void {
    newOrderChangeStatusId((oldValue) =>
      oldValue.filter((id) => id !== orderId)
    );
  }

  function onOpenOrderDetail(order: Order): void {
    setSelectedOrder(order);
    onOpenChange(true);
  }

  function handleOpenSendMessageModal(order: Order) {
    setSelectedOrder(order);
    onOpenSendMessageModal(true);
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

        {/* <div className="w-[150px]">
          <DatePicker maxDate={new Date()} />
        </div> */}
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
            confirmedLength={orders[OrderStatus.IN_PROGRESS].count}
            deliveringLength={orders[OrderStatus.DELIVERING].count}
            deliveredLength={orders[OrderStatus.DELIVERED].count}
            onChange={(status) => onChangeOrderStatusTab(status)}
          />
        </div>

        {(screenSize.width >= getScreenSize("lg") ||
          orderStatusTab === OrderStatus.IN_PROGRESS) && (
          <div className="flex-1">
            <div className="hidden md:flex items-center gap-1">
              <h2 className="font-bold text-gray-100">Produção</h2>
              <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-red-default flex items-center justify-center text-xs font-semibold text-white">
                {orders[OrderStatus.IN_PROGRESS].count}
              </div>
            </div>

            <div className="mt-2 rounded-lg space-y-2 overflow-y-scroll h-[70vh] lg:h-[85vh] pr-2">
              {isListOrderLoading &&
                Array.from({ length: 10 }).map((_, index) => (
                  <CardOrder.Loading key={index} />
                ))}
              {!isListOrderLoading &&
                orders[OrderStatus.IN_PROGRESS].orders.map((order) => (
                  <CardOrder
                    key={order.id}
                    order={order}
                    isNew={orderChangeStatusId.includes(order.id)}
                    handleSendMessageClick={handleOpenSendMessageModal}
                    handleChangeStatus={handleChangeStatus}
                    handleRemoveNewValue={handleRemoveNewValue}
                    openOrderDetail={onOpenOrderDetail}
                  />
                ))}

              {hasMoreOrderInProgress && (
                <Button
                  startIcon={Plus}
                  variant="secondary"
                  className="mt-10"
                  isLoading={isLoadMoreOrderInProgress}
                  disabled={isLoadMoreOrderInProgress}
                  onClick={() => {
                    setPageInProgress(pageInProgress + 1);
                    fetchOrder(OrderStatus.IN_PROGRESS, pageInProgress + 1);
                  }}
                >
                  Carregar mais
                </Button>
              )}
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
                {orders[OrderStatus.DELIVERING].count}
              </div>
            </div>
            <div className="mt-2 rounded-lg space-y-2 overflow-y-scroll h-[70vh] lg:h-[85vh] pr-2">
              {isListOrderLoading &&
                Array.from({ length: 10 }).map((_, index) => (
                  <CardOrder.Loading key={index} />
                ))}
              {!isListOrderLoading &&
                orders[OrderStatus.DELIVERING].orders.map((order) => (
                  <CardOrder
                    key={order.id}
                    order={order}
                    handleSendMessageClick={handleOpenSendMessageModal}
                    isNew={orderChangeStatusId.includes(order.id)}
                    handleChangeStatus={handleChangeStatus}
                    handleRemoveNewValue={handleRemoveNewValue}
                    openOrderDetail={onOpenOrderDetail}
                  />
                ))}

              {hasMoreOrderDelivering && (
                <Button
                  startIcon={Plus}
                  variant="secondary"
                  className="mt-10"
                  isLoading={isLoadMoreOrderDelivering}
                  disabled={isLoadMoreOrderDelivering}
                  onClick={() => {
                    setPageDelivering(pageDelivering + 1);
                    fetchOrder(OrderStatus.DELIVERING, pageDelivering + 1);
                  }}
                >
                  Carregar mais
                </Button>
              )}
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
                {orders[OrderStatus.DELIVERED].count}
              </div>
            </div>
            <div className="mt-2 rounded-lg space-y-2 overflow-y-scroll h-[70vh] lg:h-[85vh] pr-2">
              {isListOrderLoading &&
                Array.from({ length: 10 }).map((_, index) => (
                  <CardOrder.Loading key={index} />
                ))}
              {!isListOrderLoading &&
                orders[OrderStatus.DELIVERED].orders.map((order) => (
                  <CardOrder
                    key={order.id}
                    order={order}
                    isNew={orderChangeStatusId.includes(order.id)}
                    handleSendMessageClick={handleOpenSendMessageModal}
                    handleChangeStatus={handleChangeStatus}
                    handleRemoveNewValue={handleRemoveNewValue}
                    openOrderDetail={onOpenOrderDetail}
                  />
                ))}

              {hasMoreOrderDelivered && (
                <Button
                  startIcon={Plus}
                  variant="secondary"
                  className="mt-10"
                  isLoading={isLoadMoreOrderDelivered}
                  disabled={isLoadMoreOrderDelivered}
                  onClick={() => {
                    setPageDelivered(pageDelivered + 1);
                    fetchOrder(OrderStatus.DELIVERED, pageDelivered + 1);
                  }}
                >
                  Carregar mais
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      <Toast
        message={toast.message}
        open={toast.open}
        setOpen={(open) => {
          setToast({ message: "", open });
        }}
        type={toast.type}
      />

      <ModalOrder
        order={selectedOrder}
        open={open}
        onOpenChange={onOpenChange}
      />

      <SendMessageModal
        open={openSendMessageModal}
        userId={selectedOrder?.userId}
        userName={selectedOrder?.userName}
        setOpen={onOpenSendMessageModal}
      />
    </div>
  );
}
