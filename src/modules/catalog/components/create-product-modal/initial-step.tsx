/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { Coffee, PencilSimple, Pizza, X } from "@phosphor-icons/react";
import { tv } from "tailwind-variants";
import { useForm } from "react-hook-form";

import TextFiled from "@/modules/app/components/text-filed";
import { ProductTypeEnum } from "../../enums/product-type.enum";
import { ErrorMessage } from "@/modules/app/components/error-message";
import Filed from "@/modules/app/components/filed";
import TextArea from "@/modules/app/components/text-area";
import { Checkbox } from "@/modules/app/components/check-box";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/modules/app/components/button/button";
import { useLoading, useModal, useToast } from "@/modules/app/hooks";
import Toast from "@/modules/app/components/toast";
import {
  CreateProduct,
  productsService,
} from "../../services/list-product-service";
import { useStore } from "@/modules/app/store/stores";
import Dropzone from "@/modules/app/components/dropzone";
import { DropFiles } from "@/modules/app/components/dropzone/types";
import { ProductModel, ProductVariant } from "../../models/product-model";
import { currency } from "@/formatting";
import { Trash } from "@phosphor-icons/react/dist/ssr";
import Dialog from "@/modules/app/components/dialog/dialog";
import { variantService } from "../../services/variant.service";
import { AxiosError } from "axios";
import { httpErrorsMessages } from "@/utils";
import { useLogger } from "@/modules/app/hooks/use-logger.hook";
import { Copy } from "lucide-react";
import { DuplicateVariationModal } from "../duplicate-variation-modal";

const initialStep = tv({
  slots: {
    cardType: [
      "bg-gray-1000 text-gray-500",
      "flex flex-col items-center justify-center h-16 flex-1 rounded-lg border border-gray-500",
    ],
  },

  variants: {
    selected: {
      true: {
        cardType: "bg-gray-800 text-gray-100",
      },
    },
  },
});

const initialStepSchema = z
  .object({
    name: z.string().min(3, { message: "Nome obrigatório" }),
    description: z.string().optional(),
    type: z.string().min(1, {
      message: "Tipo de produto obrigatório",
    }),
    isPizza: z.boolean().default(false),
    totalFlavors: z.number().optional(),
    price: z.object({
      original: z
        .string()
        .min(1, { message: "Preço original obrigatório" })
        .transform((value) => {
          const number = value.replace(/[^\d.,]/g, "").replace(",", ".");

          return Number(number);
        }),
      promotional: z
        .string()
        .optional()
        .transform((value) => {
          if (!value) return null;
          const number = value.replace(/[^\d.,]/g, "").replace(",", ".");

          return Number(number);
        }),
    }),
    serves: z
      .number({
        invalid_type_error: "Quantidade de pedido máx obrigatório.",
      })
      .min(1, { message: "Quantidade de pedido máx obrigatório." }),
    cooled: z
      .boolean({
        description: "Produto resfriado",
      })
      .describe("Produto resfriado")
      .default(false),
  })
  .refine(
    (value) => {
      return Object.values(ProductTypeEnum).includes(
        value.type as unknown as ProductTypeEnum
      );
    },
    {
      message: "Tipo de produto inválido",
      path: ["type"],
    }
  );

export type InitialStepSchema = z.input<typeof initialStepSchema>;

interface InitialStepProps {
  category: string;
  product?: ProductModel;
  productOder?: number;
  onClose: () => void;
  onUpdateProducts: () => void;
  openVariationProduct?: () => void;
  selectVariationProduct?: (selectedVariation: ProductVariant) => void;
}

export function InitialStep({
  category,
  product,
  productOder,
  onClose,
  onUpdateProducts,
  openVariationProduct,
  selectVariationProduct,
}: InitialStepProps) {
  const { cardType } = initialStep();

  const [type, setType] = useState<ProductTypeEnum>();
  const [promotional, setPromotional] = useState<boolean>(false);
  const [cooled, setCooled] = useState<boolean>(false);
  const { error, success, setToast, toast } = useToast();
  const store = useStore((state) => state.store);
  const [files, setFiles] = useState<DropFiles[]>([]);
  const [originalFiles, setOriginalFiles] = useState<File[]>(null);
  const [variations, setVariations] = useState<ProductVariant[]>(
    product?.variations
  );
  const [shouldShowImage, setShouldShowImage] = useState<boolean>(
    !product?.image
  );
  const [selectedVariation, setSelectedVariation] = useState<ProductVariant>();
  const [isPizza, setIsPizza] = useState(false);

  const {
    open: openDialogDeleteVariation,
    openModal: onOpenDialogDeleteVariation,
    closeModal: onCloseDialogDeleteVariation,
  } = useModal();
  const {
    open: openDuplicateVariation,
    openModal: onOpenDuplicateVariation,
    closeModal: onCloseDuplicateVariation,
  } = useModal();

  const [isProductLoading, startProductLoading, stopProductLoading] =
    useLoading();

  const [
    isLoadingDuplicateVariation,
    startDuplicateVariationLoading,
    stopDuplicateVariationLoading,
  ] = useLoading();
  const [
    isLoadingDeleteVariation,
    startDeleteVariationLoading,
    stopDeleteVariationLoading,
  ] = useLoading();

  const logger = useLogger();

  const isEdit = !!product;

  const {
    formState: { errors },
    register,
    setValue,
    handleSubmit,
  } = useForm<InitialStepSchema>({
    resolver: zodResolver(initialStepSchema),
    mode: "onSubmit",
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: {
        original: currency(product?.price?.original) || "",
        promotional: currency(product?.price?.promotional) || "",
      },
      cooled: product?.cooled || false,
      type: product?.type || "",
      serves: product?.serves,
      isPizza: product?.isPizza,
      totalFlavors: product?.totalFlavors,
    },
  });

  useEffect(() => {
    if (product) {
      setVariations(product.variations);
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      setType(product.type);
      setPromotional(!!product.price.promotional);
      setCooled(product.cooled);
      setIsPizza(product.isPizza);
      setFiles([
        {
          id: product.image,
          name: product.image,
          base64: product.image,
          src: product.image,
          size: 0,
          type: "",
        },
      ]);
    }
  }, [product]);

  async function onSubmit(data: InitialStepSchema) {
    startProductLoading();
    try {
      if (!isEdit) {
        const product = {
          ...data,
          order: productOder,
          category,
        };

        const { data: productResponse } = await productsService.createProduct(
          store.id,
          product as unknown as CreateProduct
        );

        if (originalFiles?.length) {
          const form = new FormData();

          form.append("image", originalFiles[0]);

          await productsService.uploadImage(store.id, productResponse.id, form);
        }

        success("Produto criado com sucesso");
      } else {
        await productsService.updateProduct(
          store.id,
          product?.id,
          data as unknown as CreateProduct
        );

        if (originalFiles?.length) {
          const form = new FormData();
          form.append("image", originalFiles[0]);

          await productsService.uploadImage(store.id, product.id, form);
        }

        success("Produto editado com sucesso");
      }

      onUpdateProducts();
      onClose();
    } catch (catchError) {
      logger.error("Erro ao criar produto", { error: catchError });

      if (catchError instanceof AxiosError) {
        if (catchError.code === "ERR_NETWORK") {
          error("Imagem muito grande");
          return;
        }

        const messageError =
          httpErrorsMessages[catchError.response.data.message];

        if (messageError) {
          error(messageError);
          return;
        }
      }

      error("Erro ao criar produto");
    } finally {
      stopProductLoading();
    }
  }

  function handleSelectedVariant(variant: ProductVariant) {
    setSelectedVariation(variant);
    onOpenDialogDeleteVariation();
  }

  async function handleDeleteVariation() {
    startDeleteVariationLoading();
    try {
      const productNotSaved = !product?.id;

      if (productNotSaved) {
        setVariations((prev) =>
          prev.filter((variation) => variation.id !== selectedVariation.id)
        );
        return;
      }

      await variantService.deleteVariant(
        selectedVariation.id,
        store.id,
        product.id
      );

      success("Variação deletada com sucesso");
      onCloseDialogDeleteVariation();
      setVariations((prev) =>
        prev.filter((variation) => variation.id !== selectedVariation.id)
      );
    } catch (catchError) {
      logger.error("Erro ao deletar variação", { error });

      if (catchError instanceof AxiosError) {
        if (catchError.code === "ERR_NETWORK") {
          error("Imagem muito grande");
          return;
        }

        const messageError =
          httpErrorsMessages[catchError.response.data.message];

        if (messageError) {
          error(messageError);
          return;
        }
      }
      error("Erro ao deletar variação");
    } finally {
      stopDeleteVariationLoading();
    }
  }

  async function duplicateVariation() {
    startDuplicateVariationLoading();
    try {
      const { data: newVariation } = await variantService.duplicateVariant(
        selectedVariation.id,
        store.id,
        product.id
      );
      success("Variação duplicada com sucesso");
      onCloseDuplicateVariation();
      setVariations([...variations, newVariation]);
    } catch (error) {
      logger.error("Erro ao duplicar variação", { error });
      error("Erro ao duplicar variação");
    }
  }

  return (
    <div className="mb-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <Filed label="Image" error={null} htmlFor="image">
            <Dropzone
              files={files}
              onDrop={(files, originalFile) => {
                setFiles(files);
                setOriginalFiles(originalFile);
                setShouldShowImage(false);
              }}
            />
          </Filed>

          <TextFiled
            label="Nome do produto"
            error={errors?.name?.message as string}
            htmlFor="product-name"
          >
            <TextFiled.Input
              id="product-name"
              placeholder="Digite o nome do produto"
              autoComplete="off"
              {...register("name")}
            />
          </TextFiled>

          <Filed
            label="Sobre o produto"
            error={errors?.description?.message as string}
            htmlFor="description"
            className="mt-1"
          >
            <TextArea
              id="description"
              placeholder="Digite sobre o produto"
              autoComplete="off"
              {...register("description")}
            />
          </Filed>

          <hr className="border border-gray-500 border-dashed" />

          <div className="flex items-center gap-2">
            <button
              className={cardType({
                selected: ProductTypeEnum.SIMPLE === type && !isPizza,
              })}
              onClick={() => {
                if (isPizza) setIsPizza(false);

                setType(ProductTypeEnum.SIMPLE);
                setValue("type", ProductTypeEnum.SIMPLE);
              }}
              type="button"
            >
              <Coffee weight="bold" />
              <span>Simples</span>
            </button>

            <button
              className={cardType({
                selected: ProductTypeEnum.COMPLEX === type && !isPizza,
              })}
              onClick={() => {
                if (isPizza) setIsPizza(false);

                setType(ProductTypeEnum.COMPLEX);
                setValue("type", ProductTypeEnum.COMPLEX);
              }}
              type="button"
            >
              <div className="flex items-end gap-1">
                <Coffee weight="bold" size={10} />
                <Coffee weight="bold" size={12} />
                <Coffee weight="bold" size={14} />
              </div>

              <span>Variações</span>
            </button>

            <button
              className={cardType({
                selected: isPizza,
              })}
              onClick={() => {
                setIsPizza(true);
                setType(ProductTypeEnum.COMPLEX);
                setValue("type", ProductTypeEnum.COMPLEX);
                setValue("isPizza", true);
              }}
              type="button"
            >
              <div className="flex items-end gap-1">
                <Pizza weight="bold" size={14} />
              </div>

              <span>Pizza</span>
            </button>
          </div>
          {errors?.type?.message && (
            <ErrorMessage message={errors?.type?.message} />
          )}
          {type && (
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <TextFiled
                  label={
                    type === ProductTypeEnum.SIMPLE ? "Preço" : "A partir de:"
                  }
                  error={errors?.price?.original?.message}
                  htmlFor="price"
                  className="flex-1"
                >
                  <TextFiled.Input
                    id="price"
                    placeholder="Digite o preço do produto"
                    autoComplete="off"
                    defaultValue={currency(0)}
                    currency
                    {...register("price.original")}
                  />
                </TextFiled>

                {promotional && type === ProductTypeEnum.SIMPLE && (
                  <TextFiled
                    label="Preço promocional"
                    error={errors?.price?.promotional?.message}
                    htmlFor="promotional-price"
                    className="flex-1"
                  >
                    <TextFiled.Input
                      id="product-name"
                      placeholder="Digite o preço do produto na promoção"
                      autoComplete="off"
                      currency
                      {...register("price.promotional")}
                    />
                  </TextFiled>
                )}
              </div>
              {type === ProductTypeEnum.SIMPLE && (
                <Checkbox
                  value="promotional"
                  checked={promotional}
                  label="Este produto estar em promoção?"
                  onChange={() => setPromotional(!promotional)}
                  className="mt-1"
                />
              )}

              <Filed
                label="Quantidade de pedido máx"
                error={errors?.serves?.message}
                htmlFor="serves"
              >
                <TextFiled.Input
                  id="serves"
                  placeholder="Digite a quantidade de pedido máx"
                  autoComplete="off"
                  defaultValue={""}
                  mask="99999"
                  {...register("serves")}
                  onChange={(e) => {
                    if (e.target.value === "") return;
                    setValue("serves", parseInt(e.target.value));
                  }}
                />
              </Filed>

              {isPizza && (
                <Filed
                  label="Quantidade de sabores"
                  error={errors?.totalFlavors?.message}
                  htmlFor="totalFlavors"
                >
                  <TextFiled.Input
                    id="totalFlavors"
                    placeholder="Digite a quantidade de sabores da pizza"
                    autoComplete="off"
                    defaultValue={""}
                    {...register("totalFlavors")}
                    onChange={(e) => {
                      if (e.target.value === "") return;
                      setValue("totalFlavors", parseInt(e.target.value));
                    }}
                  />
                </Filed>
              )}

              <Checkbox
                value="cooled"
                checked={cooled}
                label="Produto resfriado"
                onChange={(checked) => {
                  setValue("cooled", checked);
                  setCooled(checked);
                }}
                className="mt-1"
              />

              {errors?.cooled?.message && (
                <ErrorMessage message={errors?.cooled?.message} />
              )}
            </div>
          )}
        </div>

        {product?.type === ProductTypeEnum.COMPLEX && (
          <div className="mt-4">
            {!product?.variations?.length ? (
              <div>
                <span className="text-gray-100">
                  Nenhuma variação adicionada
                </span>
              </div>
            ) : (
              <div>
                <span className="text-gray-100">Variações adicionadas</span>
                <div>
                  {variations.map((variation, index) => (
                    <div
                      key={index}
                      className="mt-1 flex items-center justify-between"
                    >
                      <span className="text-red-default ">
                        {variation.name}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleSelectedVariant(variation)}
                        >
                          <Trash size={16} />
                        </button>

                        <button
                          onClick={() => {
                            setSelectedVariation(variation);
                            onOpenDuplicateVariation();
                          }}
                          type="button"
                        >
                          <Copy size={16} />
                        </button>
                        <button
                          onClick={() =>
                            selectVariationProduct &&
                            selectVariationProduct(variation)
                          }
                          type="button"
                        >
                          <PencilSimple size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button
              type="button"
              variant="secondary"
              onClick={openVariationProduct}
              className="mt-2"
            >
              Adicionar variações
            </Button>
          </div>
        )}

        <div className="flex gap-2 mt-10 mb-20">
          <Button
            disabled={isProductLoading}
            type="button"
            variant="secondary"
            onClick={onClose}
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            isLoading={isProductLoading}
            disabled={isProductLoading}
          >
            Salvar
          </Button>
        </div>

        <Toast
          open={toast.open}
          message={toast.message}
          type={toast.type}
          setOpen={() => setToast({ open: false, message: "" })}
        />
      </form>

      <Dialog
        open={openDialogDeleteVariation}
        onOpenChange={onCloseDialogDeleteVariation}
      >
        <Dialog.Content
          title={`Deletar a variação ${selectedVariation?.name}`}
          position="center"
        >
          <div>
            <p>
              Tem certeza que deseja deletar a variação{" "}
              {selectedVariation?.name}?
            </p>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="secondary" disabled={isLoadingDeleteVariation}>
                Cancelar
              </Button>
              <Button
                variant="error"
                onClick={handleDeleteVariation}
                disabled={isLoadingDeleteVariation}
                isLoading={isLoadingDeleteVariation}
              >
                Deletar
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog>

      <DuplicateVariationModal
        variation={selectedVariation}
        openDuplicateVariation={openDuplicateVariation}
        loadingDuplicateVariation={isLoadingDeleteVariation}
        onCloseDuplicate={onCloseDuplicateVariation}
        handleDuplicateVariation={duplicateVariation}
      />
    </div>
  );
}
