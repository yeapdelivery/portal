"use client";

import { Check, Warning, X } from "@phosphor-icons/react/dist/ssr";
import * as ToastRx from "@radix-ui/react-toast";
import { tv } from "tailwind-variants";
import { ToastType } from "./types";

interface ToastProps {
  open: boolean;
  message: string;
  type: ToastType;
  setOpen: (open: boolean) => void;
}

const toast = tv({
  slots: {
    root: [
      "fixed bottom-4 right-4 bg-white shadow-md p-4 rounded-2xl",
      "data-[state=open]:animate-fade-in-left",
      "data-[closed]:animate-fade-out-right",
    ],
    message: "font-semibold",
    ball: [
      "w-5 h-5 rounded-full text-white",
      "flex items-center justify-center mr-1",
    ],
    close: "cursor-pointer",
  },

  variants: {
    type: {
      success: {
        root: "bg-green-100 border-green-500 border",
        message: "text-green-500",
        ball: "bg-green-500",
        close: "text-green-500",
      },
      error: {
        root: "bg-red-100 border-red-500 border",
        message: "text-red-500",
        ball: "bg-red-500",
        close: "text-red-500",
      },
      warning: {
        root: "bg-yellow-100 border-yellow-500 border",
        message: "text-yellow-500",
        ball: "bg-yellow-500",
        close: "text-yellow-500",
      },
      info: {
        root: "bg-blue-100 border-blue-500 border",
        message: "text-blue-500",
        ball: "bg-blue-500",
        close: "text-blue-500",
      },
    },
  },
});

const icon = {
  [ToastType.SUCCESS]: <Check size={16} />,
  [ToastType.ERROR]: <X size={16} />,
  [ToastType.WARNING]: "!",
  [ToastType.INFO]: "i",
};

export function Toast({ open, message, type, setOpen }: ToastProps) {
  const { root, message: messageStyle, ball, close } = toast({ type });

  const iconFromType = icon[type];

  return (
    <ToastRx.Provider duration={5000} swipeDirection="right">
      <ToastRx.Root open={open} onOpenChange={setOpen} className={root()}>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className={ball()}>{iconFromType}</div>

            <span className={messageStyle()}>{message}</span>
          </div>

          <ToastRx.Close asChild>
            <X size={16} className={close()} />
          </ToastRx.Close>
        </div>
      </ToastRx.Root>

      <ToastRx.Viewport />
    </ToastRx.Provider>
  );
}
