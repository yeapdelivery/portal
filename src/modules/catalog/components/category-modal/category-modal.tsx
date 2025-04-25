"use client";

import Button from "@/modules/app/components/button/button";
import Dialog from "@/modules/app/components/dialog";
import TextFiled from "@/modules/app/components/text-filed";
import { useLoading, useToast } from "@/modules/app/hooks";
import { useStore } from "@/modules/app/store/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Plus } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { categoryService } from "../../services/category.service";
import Toast from "@/modules/app/components/toast";
import { useState } from "react";
import { CategoryOrder } from "./category-order";
import { useLogger } from "@/modules/app/hooks/use-logger.hook";
import { AxiosError } from "axios";

const categorySchema = z.object({
  name: z.string().min(0, "Nome da categoria é obrigatório"),
});

type CategorySchema = z.infer<typeof categorySchema>;

interface CategoryModalProps {
  category?: string;
  categoryId?: string;
  updateProducts: () => void;
}

export function CategoryModal({
  category,
  categoryId,
  updateProducts,
}: CategoryModalProps) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category || "",
    },
  });
  const [isLoading, startLoading, stopLoading] = useLoading();
  const { error: errorToast, success, setToast, toast } = useToast();

  const store = useStore((state) => state.store);

  const logger = useLogger();

  const isEditing = !!categoryId;

  async function onSubmit(data: CategorySchema) {
    startLoading();
    try {
      if (!isEditing) {
        await categoryService.addCategory(data.name, store.id);
        success("Categoria adicionada com sucesso");
      } else {
        await categoryService.updateCategory(store.id, categoryId, data.name);
        success("Categoria atualizada com sucesso");
      }

      setOpen(false);
      updateProducts();
    } catch (error) {
      if (isEditing) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 400) {
            errorToast(error.response.data.message);
            return;
          }
        }

        errorToast("Erro ao editar categoria");
        return;
      }
      logger.error("Erro ao adicionar categoria", { error });
      errorToast("Erro ao adicionar categoria");
    } finally {
      stopLoading();
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        {!isEditing ? (
          <Dialog.Button asChild>
            <Button className="w-34 lg:w-80" startIcon={Plus}>
              Categorias
            </Button>
          </Dialog.Button>
        ) : (
          <Dialog.Button asChild>
            <button className="w-6 h-6 flex items-center justify-center bg-gray-1000 rounded">
              <Pencil weight="bold" size={16} className="text-red-default" />
            </button>
          </Dialog.Button>
        )}
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
              {isEditing ? "Editar" : "Adicionar"}
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
