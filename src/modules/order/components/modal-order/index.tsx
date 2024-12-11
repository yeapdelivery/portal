import Dialog from "@/modules/app/components/dialog";
import { Order } from "../../models";
import { currency, formatAddress, formatOrderNumber } from "@/formatting";
import { format } from "date-fns";
import { formatPhone } from "@/formatting/phone";
import { DELIVERY_TYPE_LABELS } from "../../enums";
import { orderStatusMap } from "../../enums/order-status";
import { ModalOrderContent } from "./modal-order-content";

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
          format(new Date(order.createdAt), "dd/MM/yyyy (h:mm)") +
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
