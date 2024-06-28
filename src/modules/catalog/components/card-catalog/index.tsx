import Image from "next/image";
import { ProductModal } from "../product-modal";
import { ProductModel, ProductVariant } from "../../models/product-model";
import { currency } from "@/formatting";
import { ImageSquare } from "@phosphor-icons/react/dist/ssr";
import { CreateVariationProductModal } from "../variation-product";
import { useModal } from "@/modules/app/hooks";
import React from "react";

interface CardCatalogProps {
  product: ProductModel;
  category: string;
  onUpdateProducts: () => void;
}

export function CardCatalog({
  product,
  category,
  onUpdateProducts,
}: CardCatalogProps) {
  const [selectedVariant, setSelectedVariant] =
    React.useState<ProductVariant | null>();
  const [productData, setProductData] = React.useState<ProductModel>(product);
  const {
    open: openCreateVariationProduct,
    openModal: onOpenCreateVariationProduct,
    closeModal: onCloseCreateVariationProduct,
  } = useModal();

  function updateProduct(product: ProductModel) {
    setProductData(product);
  }

  return (
    <div className="p-3 bg-white rounded-xl flex gap-4">
      {productData.image ? (
        <div>
          <Image
            src={productData.image}
            alt="hamburguer"
            width={117}
            height={117}
            className="w-[100px] h-[83px] text-gray-500 bg-gray-400 object-cover rounded-xl"
          />
        </div>
      ) : (
        <div className="w-[100px] h-[83px] text-gray-500 bg-gray-800 flex items-center justify-center rounded-xl">
          <ImageSquare size={32} />
        </div>
      )}

      <div className="w-full">
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-gray-100 font-bold">
                {productData?.name}
              </span>

              <ProductModal
                product={productData}
                category={category}
                onUpdateProducts={onUpdateProducts}
                openVariationProduct={onOpenCreateVariationProduct}
                selectVariationProduct={setSelectedVariant}
              />
            </div>

            <div className="max-w-[80%] mt-1 font-outfit text-gray-100 text-[10px]">
              <p className="line-clamp-3">{productData?.description}</p>
            </div>
          </div>

          <span className="text-[10px] text-gray-100 font-bold">
            {currency(productData?.price?.original)}
          </span>
        </div>
      </div>

      <CreateVariationProductModal
        open={openCreateVariationProduct}
        variant={selectedVariant}
        productId={productData?.id}
        onClose={() => onCloseCreateVariationProduct()}
        updateProducts={updateProduct}
      />
    </div>
  );
}
