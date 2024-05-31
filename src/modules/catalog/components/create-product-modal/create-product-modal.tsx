import React, { useState } from "react";

import Dialog from "@/modules/app/components/dialog";
import { InitialStep } from "./inital-step";

import Button from "@/modules/app/components/button/button";

interface CreateProductModalProps {
  buttonTrigger: React.ReactNode;
  title: string;
  category: string;
  onUpdateProducts: () => void;
}

export function CreateProductModal({
  buttonTrigger,
  title,
  category,
  onUpdateProducts,
}: CreateProductModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Dialog.Button asChild>
        <div>{buttonTrigger}</div>
      </Dialog.Button>

      <Dialog.Content title={title} className="h-full overflow-scroll">
        <InitialStep
          category={category}
          onClose={() => setOpen(false)}
          onUpdateProducts={onUpdateProducts}
        />
      </Dialog.Content>
    </Dialog>
  );
}
