import { Order } from "@/modules/order/models";

export {};

declare global {
  interface Window {
    electron: typeof import("@electron-toolkit/preload").electronAPI;
    api: {
      ping: () => void;
      printOrder: (order: Order, printerName: string) => void;
      getPrinters: () => Promise<string[]>;
    };
  }
}
