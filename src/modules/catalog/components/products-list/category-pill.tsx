import { SystemPill } from "@/modules/app/components/system-pill";
import { Check, PencilSimple } from "@phosphor-icons/react";
import {
  CategoryStatusModel,
  CategoryStatusModelMap,
} from "../../enums/category-status-model";
import { CategoryWithProducts } from "../../models/product-model";
import { X } from "@phosphor-icons/react/dist/ssr";

interface CategoryPill {
  categoryWithProducts: CategoryWithProducts;
}

export function CategoryPill({ categoryWithProducts }: CategoryPill) {
  const { status } = categoryWithProducts?.category;
  const statusLabel =
    CategoryStatusModelMap[categoryWithProducts?.category?.status];
  let icon = Check;
  let variant = "success";

  if (status === CategoryStatusModel.INACTIVE) {
    icon = X;
    variant = "error";
  }

  return (
    <SystemPill startIcon={icon} variant={variant as any}>
      {statusLabel}
    </SystemPill>
  );
}
