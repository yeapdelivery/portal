"use client";

import { useState } from "react";
import { CategoryModal } from "../components";
import { HeaderSearch } from "../components/header-search";
import { ProductsList } from "../components/products-list";
import { ProductModel } from "../models/product-model";

interface ListProductProps {
  products: ProductModel[];
}

export default function ListProduct({
  products: productsFromParams,
}: ListProductProps) {
  const [products, setProducts] = useState(productsFromParams);

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const search = event.target.value.toLowerCase();
    const filteredProducts = productsFromParams.filter((product) =>
      product.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036F]/g, "")
        .includes(
          search
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036F]/g, "")
        )
    );

    setProducts(filteredProducts);
  }

  return (
    <div className="lg:pl-64 px-5 mt-8">
      <HeaderSearch handleSearch={handleSearch} />
      <CategoryModal />
      <ProductsList product={products} />
    </div>
  );
}
