import { Order } from "@/modules/order/models";

export {};

interface PrinterOrderParams {
  order: Order;
  printerName: string;
}
declare global {
  interface Window {
    electron: typeof import("@electron-toolkit/preload").electronAPI;
    api: {
      ping: () => void;
      printOrder: (data: PrinterOrderParams) => void;
      getPrinters: () => Promise<string[]>;
    };
  }
}
