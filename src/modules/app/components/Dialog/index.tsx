"use client";

import * as DialogRx from "@radix-ui/react-dialog";
import { DialogContent } from "./Content";

interface DialogProps {
  children: React.ReactNode;
}

export function Dialog({ children }: DialogProps) {
  return <DialogRx.Root>{children}</DialogRx.Root>;
}

Dialog.Button = DialogRx.Trigger;
Dialog.Content = DialogContent;
