"use client";

import Dialog from "@/modules/app/components/dialog";
import { PencilSimple } from "@phosphor-icons/react";
import { InitialStep } from "../create-product-modal/initial-step";
import { useState } from "react";
import { ProductModel, ProductVariant } from "../../models/product-model";

interface ProductModalProps {
  product: ProductModel;
  category: string;
  onUpdateProducts: () => void;
  openVariationProduct?: () => void;
  selectVariationProduct?: (selectedVariant: ProductVariant) => void;
}

export function ProductModal({
  category,
  product,
  onUpdateProducts,
  openVariationProduct,
  selectVariationProduct,
}: ProductModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Dialog.Button asChild>
        <button className="w-6 h-6 flex items-center justify-center bg-gray-1000 rounded">
          <PencilSimple weight="bold" size={16} className="text-red-default" />
        </button>
      </Dialog.Button>

      <Dialog.Content className="h-full overflow-scroll">
        <InitialStep
          product={product}
          category={category}
          onClose={() => setOpen(false)}
          onUpdateProducts={onUpdateProducts}
          openVariationProduct={openVariationProduct}
          selectVariationProduct={selectVariationProduct}
        />
      </Dialog.Content>
    </Dialog>
  );
}
