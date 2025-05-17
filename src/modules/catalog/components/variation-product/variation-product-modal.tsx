import React, { useEffect } from "react";

import Dialog from "@/modules/app/components/dialog/dialog";
import Filed from "@/modules/app/components/filed";
import TextArea from "@/modules/app/components/text-area";
import TextFiled from "@/modules/app/components/text-filed";
import {
  ProductModel,
  ProductVariant,
  ProductVariationOption,
} from "../../models/product-model";
import { Trash } from "@phosphor-icons/react/dist/ssr";
import Button from "@/modules/app/components/button/button";
import { Plus } from "@phosphor-icons/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/modules/app/components/check-box";
import { useLoading, useModal, useToast } from "@/modules/app/hooks";
import { variantService } from "../../services/variant.service";
import { useStore } from "@/modules/app/store/stores";
import Toast from "@/modules/app/components/toast";
import { currency } from "@/formatting";
import { AxiosError } from "axios";
import { httpErrorsMessages } from "@/utils";
import { useLogger } from "@/modules/app/hooks/use-logger.hook";

interface CreateVariationProductModalProps {
  open: boolean;
  variant: ProductVariant;
  productId: string;
  product: ProductModel;
  onClose: () => void;
  updateProducts: (product: ProductModel) => void;
}

const emptyOption = () => ({
  id: `toCreate-${Math.random()}`,
  name: "",
  price: 0,
  description: "",
});

const variantSchema = z
  .object({
    name: z
      .string()
      .min(3, {
        message: "O nome da variação deve ter no mínimo 3 caracteres",
      })
      .max(255),
    isRequired: z.boolean().optional(),
    isPizza: z.boolean().optional(),
    min: z
      .string()
      .min(1, {
        message: "A quantidade mínima deve ser maior que 0",
      })
      .transform((value) => Number(value)),
    max: z
      .string()
      .min(1, {
        message: "A quantidade máxima deve ser maior que 0",
      })
      .transform((value) => Number(value)),
    description: z.string().min(3, {
      message: "A descrição deve ter no mínimo 3 caracteres",
    }),
    options: z.array(
      z.object({
        id: z.string().optional(),
        name: z.string().min(3, {
          message: "O nome da opção deve ter no mínimo 3 caracteres",
        }),
        price: z.string().transform((value) => {
          const number = value.replace(/[^\d.,]/g, "").replace(",", ".");

          return Number(number);
        }),
        description: z.string(),
      })
    ),
  })
  .refine(
    (data) => {
      const min = data.min;
      const max = data.max;

      if (min > max) {
        return false;
      }

      return true;
    },
    {
      message: "A quantidade mínima não pode ser maior que a quantidade máxima",
    }
  )
  .refine(
    (data) => {
      const options = data.options;

      if (options.length < 1) {
        return false;
      }

      return true;
    },
    {
      message: "Deve haver pelo menos uma opção",
      path: ["options"],
    }
  )
  .refine(
    (data) => {
      const options = data.options;

      const hasEmptyOption = options.some((option) => !option.name);

      return !hasEmptyOption;
    },
    {
      message: "Nome Obrigatório",
    }
  );

type VariationProductModalForm = z.infer<typeof variantSchema>;

export function VariationProductModal({
  open,
  variant,
  product,
  productId,
  onClose,
  updateProducts,
}: CreateVariationProductModalProps) {
  const hasVariantOption = !!variant && !!variant.options.length;

  const initialProductOptions = !hasVariantOption
    ? [emptyOption()]
    : variant.options;

  const store = useStore((state) => state.store);

  const [options, setOptions] = React.useState<ProductVariationOption[]>(
    initialProductOptions
  );
  const [isRequired, setIsRequired] = React.useState<boolean>(
    variant?.isRequired
  );
  const [isPizza, setIsPizza] = React.useState<boolean>(
    typeof variant?.isPizza === "boolean" ? variant.isPizza : true
  );
  const [optionUpdatedIds, setOptionUpdatedIds] = React.useState<string[]>([]);
  const [selectedOption, setSelectedOption] =
    React.useState<ProductVariationOption>();

  const isEditing = !!variant && !!variant.id;

  const [isLoading, startLoader, stopLoader] = useLoading();
  const [isLoadingOptions, startLoaderOptions, stopLoaderOptions] =
    useLoading();
  const { toast, error: errorToast, setToast, success } = useToast();
  const {
    open: openDeleteModal,
    openModal: onOpenDeleteOptionModal,
    closeModal: onCloseDeleteOptionModal,
  } = useModal();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<VariationProductModalForm>({
    resolver: zodResolver(variantSchema),
  });

  const logger = useLogger();

  useEffect(() => {
    if (variant && variant.id) {
      setValue("name", variant?.name);
      setValue("isRequired", variant?.isRequired);
      setValue("min", `${variant?.min}` as any);
      setValue("max", `${variant?.max}` as any);
      setValue("description", variant?.description);
      const newOptions = initialProductOptions.map((option) => {
        return {
          id: option.id,
          name: option.name,
          price: currency(option.price) as any,
          description: option.description,
        };
      });

      setValue("options", newOptions);
      setOptions(newOptions as any);
      setIsPizza(variant?.isPizza);

      if (product.isPizza) {
        const isPizza =
          typeof variant?.isPizza === "boolean"
            ? variant.isPizza
            : product.isPizza
            ? true
            : false;

        setIsPizza(isPizza);
        setValue("isPizza", isPizza);
      }
    }
  }, [variant, product]);

  function handleAddOption() {
    setOptions((prev) => [...prev, emptyOption()]);
  }

  function handleDeleteOption(index: number) {
    const option = options[index];
    setSelectedOption(option);
    onOpenDeleteOptionModal();
  }

  function onChangesOptions(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    filed: "name" | "price" | "description"
  ) {
    const value = event.target.value;
    const newOptions = options.map((option, i) => {
      if (i === index) {
        return { ...option, [filed]: value };
      }
      return option;
    }) as any;

    setOptionUpdatedIds((prev) => {
      if (!prev.includes(options[index].id)) {
        return [...prev, options[index].id];
      }
      return prev;
    });
    setOptions(newOptions);
    setValue("options", newOptions);
  }

  function cleanValues(data: VariationProductModalForm) {
    setOptions([emptyOption()]);
    setValue("name", "");
    setValue("isRequired", false);
    setValue("min", null);
    setValue("max", null);
    setValue("description", "");
    setValue("options", [emptyOption()]);
  }

  async function createOption(data: VariationProductModalForm) {
    const newData = {
      ...data,
      options: data.options.map((option) => ({
        name: option.name,
        price: option.price,
        description: option.description,
      })),
    };

    if (!isEditing) {
      const { data: newProduct } = await variantService.createVariant(
        newData as Omit<ProductVariant, "id">,
        store.id,
        productId
      );

      updateProducts(newProduct);
      success("Variação criada com sucesso");
    } else {
      const { data: newProduct } = await variantService.updateVariant(
        { ...newData, id: variant.id } as ProductVariant,
        store.id,
        productId
      );

      updateProducts(newProduct);
    }

    onClose();
    cleanValues(data);
  }
  async function onSubmit(data: VariationProductModalForm) {
    startLoader();

    try {
      await createOption(data);
    } catch (error) {
      logger.error("Erro ao criar variação", { error });

      if (error instanceof AxiosError) {
        const messageError = httpErrorsMessages[error.response.data.message];

        if (messageError) {
          errorToast(messageError);
          return;
        }
      }
      errorToast("Erro ao criar variação");
    } finally {
      stopLoader();
    }
  }

  async function onDeleteNewOption(optionId: string) {
    const newOptions = options.filter((option) => {
      return option?.id !== optionId;
    });

    setOptions(newOptions);
    setSelectedOption(undefined);
  }

  async function onDeleteOption() {
    startLoaderOptions();
    try {
      if (selectedOption?.id.includes("toCreate")) {
        setOptions((prev) =>
          prev.filter((option, i) => option.id !== selectedOption.id)
        );

        return;
      }

      await variantService.deleteVariantOption(
        variant.id,
        store.id,
        productId,
        selectedOption.id
      );

      onCloseDeleteOptionModal();
      setOptions((prev) =>
        prev.filter((option, i) => option.id !== selectedOption.id)
      );
      setSelectedOption(undefined);

      success("Opção deletada com sucesso");
    } catch (error) {
      logger.error("Erro ao deletar variação", { error });
      errorToast("Erro ao deletar variação");
    } finally {
      stopLoaderOptions();
    }
  }

  function onCloseVariantModal() {
    onClose();
    cleanValues({} as any);
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onCloseVariantModal}>
        <Dialog.Content
          className="h-full overflow-y-auto"
          onInteractOutside={(event) => {
            event.preventDefault();
          }}
        >
          <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <TextFiled
              label="Nome da variação"
              error={errors?.name?.message}
              required
            >
              <TextFiled.Input
                placeholder="Nome da variação"
                {...register("name")}
              />
            </TextFiled>

            <div className="flex items-start justify-between gap-4">
              <TextFiled
                label="Quantidade mínima"
                error={errors?.min?.message}
                className="flex-1"
                required
              >
                <TextFiled.Input
                  placeholder="min"
                  mask="9999"
                  {...register("min")}
                />
              </TextFiled>

              <TextFiled
                label="Quantidade máxima"
                error={errors?.max?.message}
                className="flex-1"
              >
                <TextFiled.Input
                  placeholder="máx"
                  mask="9999"
                  {...register("max")}
                />
              </TextFiled>
            </div>

            <Filed
              label="Descrição"
              error={errors?.description?.message}
              required
            >
              <TextArea placeholder="Descrição" {...register("description")} />
            </Filed>

            {product.isPizza && (
              <Checkbox
                label="Esta variação é uma pizza também?"
                checked={isPizza}
                onChange={(checked) => {
                  setIsPizza(checked);
                  setValue("isPizza", checked);
                }}
                value="isPizza"
              />
            )}

            <Checkbox
              label="Obrigatório"
              checked={isRequired}
              onChange={(checked) => {
                setIsRequired(checked);
                setValue("isRequired", checked);
              }}
              value="isRequired"
            />

            <div>
              <span className="text-gray-100 text-sm font-outfit font-medium">
                Opções
              </span>

              <div className="space-y-4">
                {options.map((option, index, originalOptions) => (
                  <div
                    key={option.id + index}
                    className="flex items-end gap-4 w-full"
                  >
                    <div className="flex-1 space-y-3">
                      <div className="flex-1 flex items-start gap-4 w-full">
                        <TextFiled
                          label="Nome da opção"
                          className="flex-1"
                          error={errors?.options?.[index]?.name?.message}
                          required
                        >
                          <TextFiled.Input
                            placeholder="Nome da opção"
                            defaultValue={option.name ?? option.name}
                            id={"name" + index}
                            onChange={(event) =>
                              onChangesOptions(event, index, "name")
                            }
                          />
                        </TextFiled>
                        <TextFiled
                          label="Preço"
                          error={errors?.options?.[index]?.price?.message}
                          className="flex-1"
                        >
                          <TextFiled.Input
                            placeholder="Preço"
                            id={"price" + index}
                            defaultValue={option.price > 0 ? option.price : ""}
                            currency
                            onChange={(event) =>
                              onChangesOptions(event, index, "price")
                            }
                          />
                        </TextFiled>
                      </div>

                      <Filed
                        label="Descrição"
                        error={errors?.options?.[index]?.description?.message}
                      >
                        <TextArea
                          placeholder="Descrição"
                          defaultValue={
                            option.description ?? option.description
                          }
                          id={"description" + index}
                          onChange={(event) =>
                            onChangesOptions(event, index, "description")
                          }
                        />
                      </Filed>
                    </div>
                    {(originalOptions.length > 1 || variant?.id) && (
                      <button
                        onClick={() => {
                          if (option?.id.includes("toCreate")) {
                            onDeleteNewOption(option.id);
                            return;
                          }
                          handleDeleteOption(index);
                        }}
                        className="h-10 w-10 bg-gray-800 flex items-center justify-center rounded text-red-default"
                        type="button"
                      >
                        <Trash size={16} weight="bold" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                className="flex items-center text-red-default gap-1 mt-2"
                type="button"
                onClick={handleAddOption}
              >
                <Plus size={14} weight="bold" />
                <span className="text-sm">Adicionar opção</span>
              </button>

              <div className="flex items-center justify-between mt-10 gap-4 mb-20">
                <Button
                  variant="secondary"
                  onClick={() => onCloseVariantModal()}
                  disabled={isLoading}
                  className="flex-1"
                  type="button"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isLoading}
                  isLoading={isLoading}
                >
                  Salvar
                </Button>
              </div>
            </div>
          </form>

          <Toast
            open={toast.open}
            message={toast.message}
            type={toast.type}
            setOpen={() => setToast({ open: false, message: "" })}
          />
        </Dialog.Content>
      </Dialog>

      <Dialog open={openDeleteModal} onOpenChange={onCloseDeleteOptionModal}>
        <Dialog.Content
          title={`Deletar a opção "${selectedOption?.name}"`}
          position="center"
        >
          <div>
            <p>Tem certeza que deseja deletar a opção?</p>
            <div className="flex items-center justify-between gap-4 mt-6">
              <Button
                variant="secondary"
                onClick={() => onCloseDeleteOptionModal()}
                disabled={isLoadingOptions}
                className="flex-1"
                type="button"
              >
                Cancelar
              </Button>
              <Button
                onClick={() => onDeleteOption()}
                disabled={isLoadingOptions}
                className="flex-1"
                type="button"
                variant="error"
                isLoading={isLoadingOptions}
              >
                Deletar
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog>
    </>
  );
}
