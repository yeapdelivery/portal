import React, { useState } from "react";

import Dialog from "@/modules/app/components/dialog";
import { InitialStep } from "./initial-step";

interface CreateProductModalProps {
  buttonTrigger: React.ReactNode;
  title: string;
  category: string;
  productOder: number;
  onUpdateProducts: () => void;
}

export function CreateProductModal({
  buttonTrigger,
  title,
  category,
  productOder,
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
          productOder={productOder}
          onClose={() => setOpen(false)}
          onUpdateProducts={onUpdateProducts}
        />
      </Dialog.Content>
    </Dialog>
  );
}
