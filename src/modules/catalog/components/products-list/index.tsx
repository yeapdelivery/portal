import { useState } from "react";
import { CategoryWithProducts, ProductModel } from "../../models/product-model";
import { AddProductButton } from "../add-product-button";
import { CardCatalog } from "../card-catalog";
import { CreateProductModal } from "../create-product-modal";
import { Check, Trash } from "@phosphor-icons/react/dist/ssr";
import { SystemPill } from "@/modules/app/components/system-pill";
import { CategoryStatusModelMap } from "../../enums/category-status-model";
import { CategoryPill } from "./category-pill";

interface ProductsListProps {
  products: CategoryWithProducts[];
  onUpdateProducts: () => void;
  onOpenConfirmationDeleteCategory: (
    selectedCategory: CategoryWithProducts
  ) => void;
}

export function ProductsList({
  products,
  onUpdateProducts,
  onOpenConfirmationDeleteCategory,
}: ProductsListProps) {
  return (
    <div>
      {products.map((categoryWithProducts, index, originalArray) => (
        <div key={index} id={categoryWithProducts.category.id}>
          <div className="mt-9">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-gray-100 text-lg font-bold font-outfit">
                  {categoryWithProducts?.category?.name}
                </span>

                <div className="flex items-center justify-center w-5 h-5 rounded-full text-white font-semibold bg-red-default text-[10px]">
                  {categoryWithProducts?.products?.length}
                </div>

                <CategoryPill categoryWithProducts={categoryWithProducts} />
              </div>
              <button
                onClick={() =>
                  onOpenConfirmationDeleteCategory(categoryWithProducts)
                }
                className="w-6 h-6 flex items-center justify-center bg-gray-1000 rounded"
              >
                <Trash weight="bold" size={16} className="text-red-default" />
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-4">
              {categoryWithProducts.products.map((productItem, index) => (
                <CardCatalog
                  product={productItem}
                  key={index}
                  category={categoryWithProducts.category.id}
                  onUpdateProducts={onUpdateProducts}
                />
              ))}
              <CreateProductModal
                title="Criar produto"
                buttonTrigger={<AddProductButton />}
                category={categoryWithProducts.category.id}
                onUpdateProducts={onUpdateProducts}
              />
            </div>
          </div>

          {originalArray.length - 1 !== index && (
            <hr className="mt-6 border border-gray-700 " />
          )}
        </div>
      ))}
    </div>
  );
}
