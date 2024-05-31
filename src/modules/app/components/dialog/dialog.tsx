"use client";

import * as DialogRx from "@radix-ui/react-dialog";
import { DialogContent } from "./content";

interface DialogProps {
  open?: boolean;
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
}

export default function Dialog({ children, open, onOpenChange }: DialogProps) {
  return (
    <DialogRx.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </DialogRx.Root>
  );
}

Dialog.Button = DialogRx.Trigger;
Dialog.Content = DialogContent;
