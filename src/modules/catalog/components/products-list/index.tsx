import { ProductModel } from "../../models/product-model";
import { AddProductButton } from "../add-product-button";
import { CardCatalog } from "../card-catalog";
import { Categories } from "../side-bar-category";

interface ProductsListProps {
  product: ProductModel[];
}

interface CategoryWithProducts {
  category: string;
  products: ProductModel[];
}

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

const generateCategoriesWithProducts = (
  products: ProductModel[],
  categories: Categories[]
) => {
  const categoriesWithProducts: CategoryWithProducts[] = [];

  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    const productsFiltered = products.filter(
      (product) => product.category.id === category.id
    );

    categoriesWithProducts.push({
      category: category.name,
      products: productsFiltered,
    });
  }

  return categoriesWithProducts;
};

export function ProductsList({ product }: ProductsListProps) {
  const categories = generateCategories(product);
  const categoriesWithProducts = generateCategoriesWithProducts(
    product,
    categories
  );

  return (
    <div>
      {categoriesWithProducts.map(
        (categoryWithProducts, index, originalArray) => (
          <div key={categoryWithProducts.category}>
            <div className="mt-9">
              <div className="flex items-center gap-2">
                <span className="text-gray-100 text-lg font-bold font-outfit">
                  {categoryWithProducts.category}
                </span>

                <div className="flex items-center justify-center w-5 h-5 rounded-full text-white font-semibold bg-red-default text-[10px]">
                  {categoryWithProducts.products.length}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-4">
                {categoryWithProducts.products.map((product) => (
                  <CardCatalog product={product} key={product.id} />
                ))}

                <AddProductButton />
              </div>
            </div>

            {originalArray.length - 1 !== index && (
              <hr className="mt-6 border border-gray-700 " />
            )}
          </div>
        )
      )}
    </div>
  );
}
