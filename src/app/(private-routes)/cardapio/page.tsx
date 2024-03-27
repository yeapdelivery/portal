import { cookies } from "next/headers";

import { Categories, SideBarCategory } from "@/modules/catalog/components";
import { productsService } from "@/modules/catalog/services/list-product-service";
import { ProductModel } from "@/modules/catalog/models/product-model";
import ListProduct from "@/modules/catalog/template/list-product";

const generateCategories = (products: ProductModel[]): Categories[] => {
  const categories: Categories[] = [];

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const category = categories.find(
      (category) => category.id === product.category.id
    );

    if (!category) {
      categories.push({
        id: product.category.id,
        name: product.category.name,
      });
    }
  }

  return categories;
};

export default async function Catalog() {
  const cookiesInstance = cookies();
  const storeId = cookiesInstance.get("storeId");

  const products: ProductModel[] = await productsService.loadProducts(
    storeId.value || ""
  );

  return (
    <div>
      <SideBarCategory categories={generateCategories(products)} />
      <ListProduct products={products} />
    </div>
  );
}
