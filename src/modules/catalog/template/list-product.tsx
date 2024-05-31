"use client";

import { useEffect, useState } from "react";
import { Categories, CategoryModal, SideBarCategory } from "../components";
import { HeaderSearch } from "../components/header-search";
import { ProductsList } from "../components/products-list";
import { CategoryWithProducts, ProductModel } from "../models/product-model";
import { productsService } from "../services/list-product-service";
import { useStore } from "@/modules/app/store/stores";
import Spinner from "@/modules/app/components/spinner/spinner";

export default function ListProduct() {
  const [products, setProducts] = useState<CategoryWithProducts[]>([]);
  const store = useStore((state) => state.store);

  useEffect(() => {
    loadProducts();
  }, [store]);

  async function loadProducts() {
    if (!store.id) return;
    const { data } = await productsService.loadProducts(store.id || "");

    setProducts(data.items);
  }

  if (!products.length)
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div className="px-5 mt-8">
      <HeaderSearch />
      <CategoryModal />
      <ProductsList products={products} onUpdateProducts={loadProducts} />
    </div>
  );
}
