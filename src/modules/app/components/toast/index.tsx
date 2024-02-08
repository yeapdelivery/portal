"use client";

import { X } from "@phosphor-icons/react/dist/ssr";
import * as ToastRx from "@radix-ui/react-toast";
import { tv } from "tailwind-variants";

interface ToastProps {
  open: boolean;
  message: string;
  type: "success" | "error" | "warning";
  setOpen: (open: boolean) => void;
}

const toast = tv({
  slots: {
    root: ["fixed bottom-4 right-4 bg-white shadow-md p-4 rounded-2xl"],
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
      },
      error: {
        root: "bg-red-100 border-red-500 border",
        message: "text-red-500",
        ball: "bg-red-500",
      },
      warning: {
        root: "bg-yellow-100 border-yellow-500 border",
        message: "text-yellow-500",
        ball: "bg-yellow-500",
      },
    },
  },
});

export function Toast({ open, message, type, setOpen }: ToastProps) {
  const { root, message: messageStyle, ball } = toast({ type });

  return (
    <ToastRx.Provider duration={20000} swipeDirection="right">
      <ToastRx.Root open={open} onOpenChange={setOpen} className={root()}>
        <div className="flex items-center gap-2">
          <div className={ball()}>
            <X size={16} />
          </div>

          <span className={messageStyle()}>{message}</span>
        </div>
        <ToastRx.Close asChild>close</ToastRx.Close>
      </ToastRx.Root>

      <ToastRx.Viewport />
    </ToastRx.Provider>
  );
}
