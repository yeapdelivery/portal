import Dialog from "@/modules/app/components/dialog";
import { Order } from "../../models";
import { formatOrderNumber } from "@/formatting";

import { orderStatusMap } from "../../enums/order-status";
import { ModalOrderContent } from "./modal-order-content";
import { formatDateWithHour } from "@/utils/format-date.util";

interface ModalOrderProps {
  order: Order;
  open: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ModalOrder({ open, order, onOpenChange }: ModalOrderProps) {
  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content
        title={
          formatOrderNumber(order.orderNumber) +
          " - " +
          formatDateWithHour(order.createdAt) +
          " - " +
          orderStatusMap[order.status]
        }
        position="center"
      >
        <ModalOrderContent order={order} />
      </Dialog.Content>
    </Dialog>
  );
}
