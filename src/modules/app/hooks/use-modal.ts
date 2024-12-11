import { useState } from "react";

export function useModal() {
  const [open, setOpen] = useState(false);

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  function onOpenChange(open: boolean) {
    setOpen(open);
  }

  return {
    open,
    openModal,
    closeModal,
    onOpenChange,
  };
}
