import Image from "next/image";
import { ProductModal } from "../product-modal";
import { ProductModel, ProductVariant } from "../../models/product-model";
import { currency } from "@/formatting";
import { DotsSix, ImageSquare } from "@phosphor-icons/react/dist/ssr";
import { VariationProductModal } from "../variation-product";
import { useLoading, useModal } from "@/modules/app/hooks";
import React from "react";
import { Trash } from "@phosphor-icons/react";
import { productsService } from "../../services/list-product-service";
import { useStore } from "@/modules/app/store/stores";
import { ProductTypeEnum } from "../../enums/product-type.enum";
import { SystemPill } from "@/modules/app/components/system-pill";
import {
  ProductStatusEnum,
  ProductStatusEnumMap,
} from "../../enums/product-status-model";
import { DeleteVariationModal } from "../variation-product/delete-variation-modal";
import { ChangeProductStatusModal } from "./change-product-status-modal";
import { useLogger } from "@/modules/app/hooks/use-logger.hook";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
  const [productSelectedToChangeStatus, setProductSelectedToChangeStatus] =
    React.useState<ProductModel | null>();
  const {
    open: openCreateVariationProduct,
    openModal: onOpenCreateVariationProduct,
    closeModal: onCloseCreateVariationProduct,
  } = useModal();
  const {
    open: openDeleteProduct,
    openModal: onOpenDeleteProduct,
    closeModal: onCloseDeleteProduct,
  } = useModal();
  const {
    open: openChangeProductStatus,
    openModal: onOpenChangeProductStatus,
    closeModal: onCloseChangeProductStatus,
  } = useModal();
  const [
    loadingDeleteProduct,
    startLoaderDeleteProduct,
    stopLoaderDeleteProduct,
  ] = useLoading();
  const store = useStore((state) => state.store);

  const logger = useLogger();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: product.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const priceLabel =
    product.type === ProductTypeEnum.COMPLEX ? "a partir de" : "por";

  const pillVariant =
    productData?.status === ProductStatusEnum.ACTIVE
      ? "success"
      : productData?.status === ProductStatusEnum.INACTIVE
      ? "error"
      : "blue";

  function updateProduct(product: ProductModel) {
    setProductData(product);
  }

  function handleSelectedVariant(variant: ProductVariant) {
    setSelectedVariant(variant);
    onOpenCreateVariationProduct();
  }

  async function handleDeleteProduct() {
    startLoaderDeleteProduct();
    try {
      await productsService.deleteProduct(store.id, product.id);

      onCloseDeleteProduct();
      onUpdateProducts();
    } catch (error) {
      logger.error("Erro ao deletar produto", { error });
    } finally {
      stopLoaderDeleteProduct();
    }
  }

  function onCloseVariant() {
    setSelectedVariant(null);
    onCloseCreateVariationProduct();
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white rounded-xl  border border-blue-100 "
    >
      <div className="flex justify-center" {...attributes} {...listeners}>
        <DotsSix size={16} />
      </div>

      <div className="flex gap-4 p-3">
        {productData.image ? (
          <div>
            <Image
              src={productData.image}
              alt="image"
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

                <div className="flex gap-4">
                  <button
                    onClick={onOpenDeleteProduct}
                    className="w-6 h-6 flex items-center justify-center bg-gray-1000 rounded"
                  >
                    <Trash
                      weight="bold"
                      size={16}
                      className="text-red-default"
                    />
                  </button>
                  <ProductModal
                    product={productData}
                    category={category}
                    onUpdateProducts={onUpdateProducts}
                    openVariationProduct={onOpenCreateVariationProduct}
                    selectVariationProduct={handleSelectedVariant}
                  />
                </div>
              </div>

              <div className="max-w-[80%] mt-1 font-outfit text-gray-100 text-[10px]">
                <p className="line-clamp-3">{productData?.description}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-100 font-bold">
                {priceLabel} {currency(productData?.price?.original)}
              </span>

              <SystemPill
                variant={pillVariant}
                onClick={() => {
                  setProductSelectedToChangeStatus(productData);
                  onOpenChangeProductStatus();
                }}
              >
                {ProductStatusEnumMap[productData?.status]}
              </SystemPill>
            </div>
          </div>
        </div>

        <VariationProductModal
          open={openCreateVariationProduct}
          variant={selectedVariant}
          productId={productData?.id}
          product={productData}
          onClose={() => onCloseVariant()}
          updateProducts={updateProduct}
        />

        <DeleteVariationModal
          openDeleteProduct={openDeleteProduct}
          product={productData}
          loadingDeleteProduct={loadingDeleteProduct}
          onCloseDeleteProduct={onCloseDeleteProduct}
          handleDeleteProduct={handleDeleteProduct}
        />

        <ChangeProductStatusModal
          open={openChangeProductStatus}
          product={productSelectedToChangeStatus}
          onClose={onCloseChangeProductStatus}
          updateProduct={onUpdateProducts}
        />
      </div>
    </div>
  );
}
