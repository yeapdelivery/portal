import React, { useEffect } from "react";
import Dialog from "@/modules/app/components/dialog/dialog";
import Filed from "@/modules/app/components/filed";
import TextArea from "@/modules/app/components/text-area";
import TextFiled from "@/modules/app/components/text-filed";
import {
  ProductVariant,
  ProductVariationOption,
} from "../../models/product-model";
import { Trash } from "@phosphor-icons/react/dist/ssr";
import Button from "@/modules/app/components/button/button";
import { Plus } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/modules/app/components/check-box";
import { useLoading, useToast } from "@/modules/app/hooks";
import { variantService } from "../../services/variant.service";
import { useStore } from "@/modules/app/store/stores";
import Toast from "@/modules/app/components/toast";
import { currency } from "@/formatting";
import {
  CreateVariationProductModalProps,
  emptyOption,
  VariationProductModalForm,
  variantSchema,
} from "./variation-product-modal";

export function VariationProductModal({
  open,
  variant,
  productId,
  onClose,
  updateProducts,
}: CreateVariationProductModalProps) {
  const hasVariantOption = !!variant && !!variant.options.length;

  const initialProductOptions = !hasVariantOption
    ? [emptyOption]
    : variant.options;

  const store = useStore((state) => state.store);

  const [options, setOptions] = React.useState<ProductVariationOption[]>(
    initialProductOptions
  );
  const [isRequired, setIsRequired] = React.useState<boolean>(
    variant?.isRequired
  );
  const [isLoading, startLoader, stopLoader] = useLoading();
  const { toast, error: errorToast, setToast, success } = useToast();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<VariationProductModalForm>({
    resolver: zodResolver(variantSchema),
  });

  useEffect(() => {
    if (variant && variant.id) {
      setValue("name", variant?.name);
      setValue("isRequired", variant?.isRequired);
      setValue("min", `${variant?.min}` as any);
      setValue("max", `${variant?.max}` as any);
      setValue("description", variant?.description);
      setValue(
        "options",
        initialProductOptions.map((option) => {
          return {
            name: option.name,
            price: currency(option.price) as any,
            description: option.description,
          };
        })
      );
      setOptions(initialProductOptions);
    }
  }, [variant]);

  function handleAddOption() {
    setOptions((prev) => [...prev, emptyOption]);
  }

  function handleDeleteOption(index: number) {
    setOptions((prev) => prev.filter((_, i) => i !== index));
  }

  function onChangesOptions(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    filed: "name" | "price" | "description"
  ) {
    const value = event.target.value;
    const newOptions = options.map((option, i) => {
      if (i === index) {
        if (filed !== "price") {
          return { ...option, price: currency(option.price), [filed]: value };
        }
        return { ...option, [filed]: value };
      }
      return { ...option, price: currency(option.price) };
    }) as any;

    setOptions(newOptions);
    setValue("options", newOptions);
  }

  function cleanValues(data: VariationProductModalForm) {
    setOptions([emptyOption]);
    Object.keys(data).forEach((key) => {
      setValue(key as any, null);
    });
  }

  async function createOption(data: VariationProductModalForm) {
    const { data: newProduct } = await variantService.createVariant(
      data as Omit<ProductVariant, "id">,
      store.id,
      productId
    );
    updateProducts(newProduct);
    success("Variação criada com sucesso");
    onClose();
    cleanValues(data);
  }

  async function updateOption(data: VariationProductModalForm) {
    const { data: newProduct } = await variantService.updateVariant(
      { ...data, id: variant.id } as ProductVariant,
      store.id,
      productId
    );
    updateProducts(newProduct);
    success("Variação atualizada com sucesso");
    onClose();
    cleanValues(data);
  }

  async function onSubmit(data: VariationProductModalForm) {
    startLoader();
    try {
      if (!productId) {
        return await createOption(data);
      }

      await updateOption(data);
    } catch (error) {
      console.error(error);
      errorToast("Erro ao criar variação");
    } finally {
      stopLoader();
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <Dialog.Content className="h-full overflow-y-auto">
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
                {options.map((_option, index, originalOptions) => (
                  <div key={index} className="flex items-end gap-4 w-full">
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
                            {...register(`options.${index}.name`)}
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
                            {...register(`options.${index}.price`)}
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
                          {...register(`options.${index}.description`)}
                          onChange={(event) =>
                            onChangesOptions(event, index, "description")
                          }
                        />
                      </Filed>
                    </div>
                    {originalOptions.length > 1 && (
                      <button
                        onClick={() => handleDeleteOption(index)}
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
                  onClick={() => onClose()}
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
        </Dialog.Content>
      </Dialog>
      <Toast
        open={toast.open}
        message={toast.message}
        type={toast.type}
        setOpen={() => setToast({ open: false, message: "" })}
      />
    </>
  );
}
