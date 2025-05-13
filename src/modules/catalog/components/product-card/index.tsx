import { Trash } from "@phosphor-icons/react/dist/ssr";
import { CategoryWithProducts, ProductModel } from "../../models/product-model";
import { AddProductButton } from "../add-product-button";
import { CardCatalog } from "../card-catalog";
import { CategoryModal } from "../category-modal";
import { CreateProductModal } from "../create-product-modal";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import React from "react";
import { productsService } from "../../services/list-product-service";
import { useStore } from "@/modules/app/store/stores";

interface ProductsCardProps {
  categoryWithProducts: CategoryWithProducts;
  isLastItem: boolean;
  onUpdateProducts: () => void;
  onOpenConfirmationDeleteCategory: (
    selectedCategory: CategoryWithProducts
  ) => void;
}

export function ProductsCard({
  categoryWithProducts,
  isLastItem,
  onOpenConfirmationDeleteCategory,
  onUpdateProducts,
}: ProductsCardProps) {
  const store = useStore((state) => state.store);
  const [products, setProducts] = React.useState<ProductModel[]>(
    categoryWithProducts.products
  );

  async function handleDropEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const activeIndex = products.findIndex((item) => item.id === active.id);

      const overIndex = products.findIndex((item) => item.id === over?.id);
      const newProducts = arrayMove(products, activeIndex, overIndex);

      setProducts(newProducts);

      const productOrder = newProducts.map((product, index) => ({
        id: product.id,
        order: index + 1,
      }));
      await productsService.updateProductOrder(
        store.id,
        categoryWithProducts.category.id,
        productOrder
      );
    }
  }

  console.log("products", products);

  return (
    <div id={categoryWithProducts.category.id}>
      <div className="mt-9">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-gray-100 text-lg font-bold font-outfit">
              {categoryWithProducts?.category?.name}
            </span>

            <div className="flex items-center justify-center w-5 h-5 rounded-full text-white font-semibold bg-red-default text-[10px]">
              {categoryWithProducts?.products?.length}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <CategoryModal
              category={categoryWithProducts.category.name}
              categoryId={categoryWithProducts.category.id}
              updateProducts={onUpdateProducts}
            />

            <button
              onClick={() =>
                onOpenConfirmationDeleteCategory(categoryWithProducts)
              }
              className="w-6 h-6 flex items-center justify-center bg-gray-1000 rounded"
            >
              <Trash weight="bold" size={16} className="text-red-default" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-4">
          <DndContext onDragEnd={handleDropEnd}>
            <SortableContext items={products.map((item) => item.id)}>
              {products.map((productItem) => (
                <CardCatalog
                  product={productItem}
                  key={productItem.id}
                  category={categoryWithProducts.category.id}
                  onUpdateProducts={onUpdateProducts}
                />
              ))}
            </SortableContext>
          </DndContext>

          <CreateProductModal
            title="Criar produto"
            buttonTrigger={
              <button className="w-full">
                <AddProductButton />
              </button>
            }
            category={categoryWithProducts.category.id}
            onUpdateProducts={onUpdateProducts}
          />
        </div>
      </div>

      {!isLastItem && <hr className="mt-6 border border-gray-700 " />}
    </div>
  );
}
