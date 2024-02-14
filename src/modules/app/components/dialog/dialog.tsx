"use client";

import * as DialogRx from "@radix-ui/react-dialog";
import { DialogContent } from "./content";

interface DialogProps {
  children: React.ReactNode;
}

export default function Dialog({ children }: DialogProps) {
  return <DialogRx.Root>{children}</DialogRx.Root>;
}

Dialog.Button = DialogRx.Trigger;
Dialog.Content = DialogContent;
