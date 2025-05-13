"use client";
import { useEffect, useState } from "react";

import { useStore } from "@/modules/app/store/stores";
import Spinner from "@/modules/app/components/spinner/spinner";
import { useLoading, useModal, useToast } from "@/modules/app/hooks";
import Toast from "@/modules/app/components/toast";

import { CategoryModal } from "../components";
import { HeaderSearch } from "../components/header-search";
import { ProductsList } from "../components/products-list";
import { CategoryWithProducts } from "../models/product-model";
import { productsService } from "../services/list-product-service";
import Dialog from "@/modules/app/components/dialog/dialog";
import Button from "@/modules/app/components/button/button";
import { categoryService } from "../services/category.service";
import { AxiosError } from "axios";
import { X } from "@phosphor-icons/react/dist/ssr";
import { useLogger } from "@/modules/app/hooks/use-logger.hook";
import { ScrollToggleButton } from "../components/float-button-scroll";

export default function ListProduct() {
  const [products, setProducts] = useState<CategoryWithProducts[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryWithProducts>({} as CategoryWithProducts);
  const [hasProductError, setHasProductError] = useState(false);
  const store = useStore((state) => state.store);
  const [loading, startLoader, stopLoader] = useLoading(true);
  const [loadingDeleteCategory, startDeleteCategory, stopDeleteCategory] =
    useLoading();
  const { error: errorToast, toast, setToast } = useToast();
  const {
    open: openDeleteCategoryModal,
    closeModal: closeConfirmationDeleteCategory,
    openModal: openConfirmationDeleteCategory,
  } = useModal();

  const logger = useLogger();

  useEffect(() => {
    loadProducts();
  }, [store]);

  async function loadProducts() {
    if (!store.id) return;

    startLoader();
    try {
      const { data } = await productsService.loadProducts(store.id || "");

      setProducts(data.items);
    } catch (error) {
      errorToast("Erro ao carregar produtos");
      logger.error("Erro ao carregar produtos", { error });
    } finally {
      stopLoader();
    }
  }

  async function handleDeleteCategory() {
    startDeleteCategory();
    setHasProductError(false);
    try {
      await categoryService.deleteCategory(
        store.id,
        selectedCategory.category.id
      );
      loadProducts();
      closeConfirmationDeleteCategory();
    } catch (error) {
      const HAS_PRODUCT_MESSAGE =
        "Category has products in active or draft status";

      if (error instanceof AxiosError) {
        if (error.response.data.message === HAS_PRODUCT_MESSAGE) {
          setHasProductError(true);
          errorToast("Category has products in active or draft status");
          return;
        }
      }
      errorToast("Erro ao deletar categoria");
      console.error(error);
    } finally {
      stopDeleteCategory();
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!products.length && !loading)
    return (
      <div className="px-5 mt-8 mb-20 ">
        <div className="flex items-center justify-center flex-col">
          <span className="text-gray-100 font-rubik text-xl">
            Nenhum produto encontrado! Adicione uma categoria para continuar
          </span>

          <div className="mt-4">
            <CategoryModal updateProducts={loadProducts} />
          </div>
        </div>
      </div>
    );

  return (
    <div className="px-5 mt-8 mb-20">
      <HeaderSearch updateProducts={loadProducts} />
      <ProductsList
        products={products}
        onUpdateProducts={loadProducts}
        onOpenConfirmationDeleteCategory={(category) => {
          setSelectedCategory(category);
          openConfirmationDeleteCategory();
        }}
      />

      <Toast
        open={toast.open}
        message={toast.message}
        type={toast.type}
        setOpen={() => setToast({ open: false, message: "" })}
      />

      <Dialog
        open={openDeleteCategoryModal}
        onOpenChange={() => {
          closeConfirmationDeleteCategory();
          setHasProductError(false);
        }}
      >
        <Dialog.Content position="center" title="Deletar categoria">
          <div>
            {selectedCategory?.products?.length > 0 ? (
              <div className="bg-yellow-100 text-yellow-primary-dark px-4 py-2 mt-4 rounded-lg flex items-start gap-2">
                <div className="min-w-[20px] min-h-[20px] max-w-[20px] max-h-[20px] mt-1.5 rounded-full bg-yellow-primary-dark text-white flex items-center justify-center">
                  <X size={14} weight="bold" />
                </div>

                <p>
                  Não é possível deletar a categoria pois existem produtos
                  ativos ou em rascunho.
                </p>
              </div>
            ) : (
              <div>
                <p>
                  Tem certeza que deseja deletar a categoria{" "}
                  <strong>{selectedCategory?.category?.name}</strong> ?{" "}
                </p>

                {hasProductError && (
                  <div className="bg-red-100 text-red-default px-4 py-2 mt-4 rounded flex items-start gap-2">
                    <div className="min-w-[20px] min-h-[20px] max-w-[20px] max-h-[20px] mt-1.5 rounded-full bg-red-default text-white flex items-center justify-center">
                      <X size={14} weight="bold" />
                    </div>

                    <p>
                      Não é possível deletar a categoria pois existem produtos
                      ativos ou em rascunho.
                    </p>
                  </div>
                )}

                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    variant="secondary"
                    onClick={closeConfirmationDeleteCategory}
                    disabled={loadingDeleteCategory}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="error"
                    onClick={handleDeleteCategory}
                    isLoading={loadingDeleteCategory}
                    disabled={loadingDeleteCategory}
                  >
                    Deletar
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog>

      <ScrollToggleButton />
    </div>
  );
}
