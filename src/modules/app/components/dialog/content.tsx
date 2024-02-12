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
    content: [
      "bg-white fixed top-0 right-0 bottom-0 left-0 md:left-auto md:w-96",
      "data-[state=open]:animate-animation-modal-fade-in",
      "data-[state=closed]:animate-animation-modal-fade-out",
    ],
  },
});

interface DialogContent {
  children: React.ReactNode;
  titleSlot?: React.ReactNode;
  title?: string;
}

export function DialogContent({ titleSlot, title, children }: DialogContent) {
  const { content, overlay } = dialog();

  return (
    <DialogRx.Portal>
      <DialogRx.Overlay className={overlay()} data-test="overlay" />
      <DialogRx.Content className={content()} data-test="dialog-content">
        <div className="flex items-center justify-between py-6 px-5">
          <div />
          <DialogRx.Title asChild={!!titleSlot}>
            {titleSlot ? (
              titleSlot
            ) : (
              <span
                data-test="dialog-title"
                className="text-red-default text-sm font-medium"
              >
                {title}
              </span>
            )}
          </DialogRx.Title>
          <DialogRx.Close asChild data-test="dialog-close">
            <button>
              <X size={16} className="text-red-default" weight="bold" />
            </button>
          </DialogRx.Close>
        </div>
        <div className="px-5">{children}</div>
      </DialogRx.Content>
    </DialogRx.Portal>
  );
}
