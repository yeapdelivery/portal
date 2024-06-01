import { useState } from "react";
import { CategoryWithProducts, ProductModel } from "../../models/product-model";
import { AddProductButton } from "../add-product-button";
import { CardCatalog } from "../card-catalog";
import { CreateProductModal } from "../create-product-modal";

interface ProductsListProps {
  products: CategoryWithProducts[];
  onUpdateProducts: () => void;
}

export function ProductsList({
  products,
  onUpdateProducts,
}: ProductsListProps) {
  return (
    <div>
      {products.map((categoryWithProducts, index, originalArray) => (
        <div key={index}>
          <div className="mt-9">
            <div className="flex items-center gap-2">
              <span className="text-gray-100 text-lg font-bold font-outfit">
                {categoryWithProducts?.category?.name}
              </span>

              <div className="flex items-center justify-center w-5 h-5 rounded-full text-white font-semibold bg-red-default text-[10px]">
                {categoryWithProducts?.products?.length}
              </div>
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
