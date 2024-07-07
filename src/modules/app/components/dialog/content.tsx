"use client";

import { X } from "@phosphor-icons/react";
import * as DialogRx from "@radix-ui/react-dialog";
import { tv } from "tailwind-variants";

const dialog = tv({
  slots: {
    overlay: [
      "data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out",
      "bg-black/50 fixed inset-0",
    ],
    content: ["bg-white fixed w-96"],
  },

  variants: {
    position: {
      left: {
        content: [
          "left-0 top-0 right-0 bottom-0 md:left-auto ",
          "data-[state=open]:animate-animation-modal-fade-in",
          "data-[state=closed]:animate-animation-modal-fade-out",
        ],
      },
      center: {
        content: [
          "rounded-xl",
          "transform translate-x-[-50%] translate-y-[-50%]",
          "top-[50%] bottom-auto left-[50%] max-h-[85vh]",
          "data-[state=open]:animate-fade-in-center-modal",
          "data-[state=closed]:animate-fade-out-center-modal",
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
  position?: "left" | "center";
}

export function DialogContent({
  titleSlot,
  title,
  children,
  className,
  position = "left",
}: DialogContentProps) {
  const { content, overlay } = dialog({ position });

  return (
    <DialogRx.Portal>
      <DialogRx.Overlay className={overlay()} data-test="overlay" />
      <DialogRx.Content
        className={content({ className })}
        data-test="dialog-content"
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
                  className="text-red-default text-sm font-medium"
                >
                  {title}
                </span>
              </div>
            )}
          </DialogRx.Title>
          <DialogRx.Close asChild data-test="dialog-close">
            <button>
              <X size={16} className="text-red-default" weight="bold" />
            </button>
          </DialogRx.Close>
        </div>
        <div className="px-5 pb-5">{children}</div>
      </DialogRx.Content>
    </DialogRx.Portal>
  );
}
