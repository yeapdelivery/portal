import React from "react";
import { categoryService } from "../../services/category.service";
import { useStore } from "@/modules/app/store/stores";
import { CategoryModel } from "../../models/product-model";
import { useLoading } from "@/modules/app/hooks";
import Button from "@/modules/app/components/button/button";
import Dialog from "@/modules/app/components/dialog/dialog";
import { CaretDown, CaretUp, ListDashes } from "@phosphor-icons/react/dist/ssr";
import { useLogger } from "@/modules/app/hooks/use-logger.hook";

interface CategoryOrderProps {
  updateProducts: () => void;
}

export function CategoryOrder({ updateProducts }: CategoryOrderProps) {
  const [categories, setCategories] = React.useState<CategoryModel[]>([]);
  const [open, setOpen] = React.useState(false);
  const [isLoading, startLoading, stopLoading] = useLoading();
  const [isLoadingSave, startLoadingSave, stopLoadingSave] = useLoading();
  const store = useStore((state) => state.store);

  const logger = useLogger();

  React.useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    startLoading();
    try {
      const { data: categoryResponse } = await categoryService.loadCategories(
        store.id || ""
      );

      setCategories(categoryResponse);
    } catch (error) {
      logger.error("Erro ao carregar categorias", { error });
    } finally {
      stopLoading();
    }
  }

  function order(
    indexModified: number,
    indexOfLoop: number,
    direction: "up" | "down"
  ) {
    const categoryModified = categories[indexModified];
    const categoryLoop = categories[indexOfLoop];

    if (indexModified - 1 === indexOfLoop && direction === "up") {
      return { ...categoryLoop, order: categoryLoop.order + 1 };
    }

    if (indexModified + 1 === indexOfLoop && direction === "down") {
      return { ...categoryLoop, order: categoryLoop.order - 1 };
    }

    if (indexOfLoop === indexModified && direction === "up") {
      return { ...categoryModified, order: categoryLoop.order - 1 };
    }

    if (indexOfLoop === indexModified && direction === "down") {
      return { ...categoryModified, order: categoryLoop.order + 1 };
    }

    return categoryLoop;
  }

  function handleOrder(index: number, direction: "up" | "down") {
    const newCategories = categories
      .map((_category, i) => order(index, i, direction))
      .sort((a, b) => a.order - b.order);

    setCategories(newCategories);
  }

  async function handleSaveOrder() {
    startLoadingSave();
    try {
      const categoriesToSave = categories.map((category, index) => ({
        name: category.name,
        order: category.order,
      }));

      await categoryService.updateCategoriesOrder(
        store.id || "",
        categoriesToSave
      );
      updateProducts();
      setOpen(false);
    } catch (error) {
    } finally {
      stopLoadingSave();
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Dialog.Button asChild>
        <button className="flex items-center text-red-default underline justify-center gap-2 w-full">
          <span>Ordenar categorias</span>
          <ListDashes size={20} />
        </button>
      </Dialog.Button>
      <Dialog.Content title="Ordenar a visualização das categories">
        <div className="space-y-3">
          {categories.map((category, index, originalArray) => (
            <div
              key={category.id}
              className="text-red-default pb-1 border-b border-b-red-default flex items-center justify-between"
            >
              <span>{category.name}</span>

              <div className="flex items-center">
                {originalArray.length - 1 !== index && (
                  <button onClick={() => handleOrder(index, "down")}>
                    <CaretDown size={18} />
                  </button>
                )}
                {index !== 0 && (
                  <button onClick={() => handleOrder(index, "up")}>
                    <CaretUp size={18} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <Button
          className="mt-4"
          onClick={handleSaveOrder}
          isLoading={isLoadingSave}
          disabled={isLoadingSave}
        >
          Salvar categorias
        </Button>
      </Dialog.Content>
    </Dialog>
  );
}
