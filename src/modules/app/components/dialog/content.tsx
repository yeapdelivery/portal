"use client";

import { X } from "@phosphor-icons/react";
import * as DialogRx from "@radix-ui/react-dialog";
import { tv } from "tailwind-variants";

const dialog = tv({
  slots: {
    overlay: [
      "data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out",
      "bg-black/50 fixed inset-0 z-50",
    ],
    content: ["bg-white fixed w-96"],
  },

  variants: {
    position: {
      right: {
        content: [
          " top-0 right-0 bottom-0 left-auto",
          "data-[state=open]:animate-animation-modal-fade-in",
          "data-[state=closed]:animate-animation-modal-fade-out z-[100]",
        ],
      },
      center: {
        content: [
          "rounded-xl",
          "transform translate-x-[-50%] translate-y-[-50%]",
          "top-[50%] bottom-auto left-[50%] max-h-[85vh]",
          "data-[state=open]:animate-fade-in-center-modal",
          "data-[state=closed]:animate-fade-out-center-modal z-[100]",
        ],
      },
      left: {
        content: [
          "right-0 top-0 left-0 bottom-0 md:right-auto",
          "data-[state=open]:animate-fade-in-right",
          "data-[state=closed]:animate-fade-out-right z-[100]",
        ],
      },
    },
  },
});

interface DialogContentProps {
  children: React.ReactNode;
  titleSlot?: React.ReactNode;
  title?: string;
  className?: string;
  position?: "left" | "center" | "right";
  onInteractOutside?: (event: any) => void;
}

export function DialogContent({
  titleSlot,
  title,
  children,
  className,
  position = "right",
  onInteractOutside,
}: DialogContentProps) {
  const { content, overlay } = dialog({ position });

  return (
    <DialogRx.Portal>
      <DialogRx.Overlay className={overlay()} data-test="overlay" />
      <DialogRx.Content
        className={content({ className })}
        data-test="dialog-content"
        onInteractOutside={onInteractOutside}
      >
        <div className="flex items-center justify-between py-6 px-5 ">
          {position === "left" && <div />}
          <DialogRx.Title asChild={!!titleSlot}>
            {titleSlot ? (
              titleSlot
            ) : (
              <div className="w-80">
                <span
                  data-test="dialog-title"
                  className="text-primary-default text-sm font-medium"
                >
                  {title}
                </span>
              </div>
            )}
          </DialogRx.Title>
          <DialogRx.Close asChild data-test="dialog-close">
            <button>
              <X size={16} className="text-primary-default" weight="bold" />
            </button>
          </DialogRx.Close>
        </div>
        <div className="px-5 pb-5">{children}</div>
      </DialogRx.Content>
    </DialogRx.Portal>
  );
}
