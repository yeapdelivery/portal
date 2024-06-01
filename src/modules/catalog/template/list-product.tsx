"use client";

import { useEffect, useState } from "react";
import { Categories, CategoryModal, SideBarCategory } from "../components";
import { HeaderSearch } from "../components/header-search";
import { ProductsList } from "../components/products-list";
import { CategoryWithProducts, ProductModel } from "../models/product-model";
import { productsService } from "../services/list-product-service";
import { useStore } from "@/modules/app/store/stores";
import Spinner from "@/modules/app/components/spinner/spinner";
import { useLoading, useToast } from "@/modules/app/hooks";
import Toast from "@/modules/app/components/toast";

export default function ListProduct() {
  const [products, setProducts] = useState<CategoryWithProducts[]>([]);
  const store = useStore((state) => state.store);
  const [loading, startLoader, stopLoader] = useLoading();
  const { error: errorToast, toast, setToast } = useToast();

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
      console.error(error);
    } finally {
      stopLoader();
    }
  }

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );

  if (!products.length)
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
      <ProductsList products={products} onUpdateProducts={loadProducts} />

      <Toast
        open={toast.open}
        message={toast.message}
        type={toast.type}
        setOpen={() => setToast({ open: false, message: "" })}
      />
    </div>
  );
}
