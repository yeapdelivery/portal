import { CategoryWithProducts } from "../../models/product-model";
import { ProductsCard } from "../product-card";

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
        <ProductsCard
          categoryWithProducts={categoryWithProducts}
          key={index}
          isLastItem={index === originalArray.length - 1}
          onOpenConfirmationDeleteCategory={onOpenConfirmationDeleteCategory}
          onUpdateProducts={onUpdateProducts}
        />
      ))}
    </div>
  );
}
