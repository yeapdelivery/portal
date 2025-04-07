"use client";

import Button from "@/modules/app/components/button/button";
import Dialog from "@/modules/app/components/dialog";
import TextFiled from "@/modules/app/components/text-filed";
import { useLoading, useToast } from "@/modules/app/hooks";
import { useStore } from "@/modules/app/store/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { categoryService } from "../../services/category.service";
import Toast from "@/modules/app/components/toast";
import { useState } from "react";
import { CategoryOrder } from "./category-order";
import { useLogger } from "@/modules/app/hooks/use-logger.hook";

const categorySchema = z.object({
  name: z.string().min(0, "Nome da categoria é obrigatório"),
});

type CategorySchema = z.infer<typeof categorySchema>;

interface CategoryModalProps {
  updateProducts: () => void;
}

export function CategoryModal({ updateProducts }: CategoryModalProps) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
  });
  const [isLoading, startLoading, stopLoading] = useLoading();
  const { error: errorToast, success, setToast, toast } = useToast();

  const store = useStore((state) => state.store);

  const logger = useLogger();

  async function onSubmit(data: CategorySchema) {
    startLoading();
    try {
      await categoryService.addCategory(data.name, store.id);
      success("Categoria adicionada com sucesso");

      setOpen(false);
      updateProducts();
    } catch (error) {
      logger.error("Erro ao adicionar categoria", { error });
      errorToast("Erro ao adicionar categoria");
    } finally {
      stopLoading();
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Button asChild>
          <Button className="w-34 lg:w-80" startIcon={Plus}>
            Categorias
          </Button>
        </Dialog.Button>

        <Dialog.Content title="Adicionar categoria">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextFiled
              label="Nome da categoria"
              error={errors?.name?.message}
              htmlFor="category"
            >
              <TextFiled.Input
                id="category"
                placeholder="Nome da categoria"
                {...register("name")}
              />
            </TextFiled>

            <Button
              className="w-full h-9"
              type="submit"
              isLoading={isLoading}
              disabled={isLoading}
            >
              Adicionar
            </Button>
          </form>

          <div className="mt-4">
            <CategoryOrder updateProducts={updateProducts} />
          </div>
        </Dialog.Content>
      </Dialog>
      <Toast
        open={toast.open}
        message={toast.message}
        type={toast.type}
        setOpen={() => {
          setToast({ open: false, message: "" });
        }}
      />
    </>
  );
}
