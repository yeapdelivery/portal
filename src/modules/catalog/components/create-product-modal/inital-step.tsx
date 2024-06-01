import { useEffect, useState } from "react";
import { Coffee, X } from "@phosphor-icons/react";
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
import { useLoading, useToast } from "@/modules/app/hooks";
import Toast from "@/modules/app/components/toast";
import {
  CreateProduct,
  productsService,
} from "../../services/list-product-service";
import { useStore } from "@/modules/app/store/stores";
import Dropzone from "@/modules/app/components/dropzone";
import { DropFiles } from "@/modules/app/components/dropzone/types";
import { ProductModel } from "../../models/product-model";
import { currency } from "@/formatting";

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
    description: z.string().min(3, { message: "Descrição obrigatória" }),
    type: z.string().min(1, {
      message: "Tipo de produto obrigatório",
    }),
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
      .number()
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
      console.log(value.type);

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
  onClose: () => void;
  onUpdateProducts: () => void;
}

export function InitialStep({
  category,
  product,
  onClose,
  onUpdateProducts,
}: InitialStepProps) {
  const { cardType } = initialStep();
  const [type, setType] = useState<ProductTypeEnum>();
  const [promotional, setPromotional] = useState<boolean>(false);
  const [cooled, setCooled] = useState<boolean>(false);
  const [isProductLoading, startProductLoading, stopProductLoading] =
    useLoading();
  const { error, success, setToast, toast } = useToast();
  const store = useStore((state) => state.store);
  const [files, setFiles] = useState<DropFiles[]>([]);
  const [originalFiles, setOriginalFiles] = useState<File[]>(null);
  const [shouldShowImage, setShouldShowImage] = useState<boolean>(
    !product.image
  );

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
      serves: product?.serves || 0,
    },
  });

  useEffect(() => {
    if (product) {
      setType(product.type);
      setPromotional(!!product.price.promotional);
      setCooled(product.cooled);
    }
  }, [product]);

  async function onSubmit(data: InitialStepSchema) {
    startProductLoading();
    try {
      if (!isEdit) {
        const product = {
          ...data,
          category,
        };

        const { data: productResponse } = await productsService.createProduct(
          store.id,
          product as unknown as CreateProduct
        );

        const form = new FormData();

        form.append("image", originalFiles[0]);

        await productsService.uploadImage(store.id, productResponse.id, form);

        success("Produto criado com sucesso");
      } else {
        await productsService.updateProduct(
          store.id,
          product?.id,
          data as unknown as CreateProduct
        );

        if (originalFiles) {
          const form = new FormData();
          form.append("image", originalFiles[0]);

          await productsService.uploadImage(store.id, product.id, form);
        }

        success("Produto editado com sucesso");
      }

      onUpdateProducts();
      onClose();
    } catch (catchError) {
      console.error(catchError);
      error("Erro ao criar produto");
    } finally {
      stopProductLoading();
    }
  }

  return (
    <div className="mb-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          {shouldShowImage ? (
            <Filed label="Image" error={null} htmlFor="image">
              <Dropzone
                files={files}
                onDrop={(files, originalFile) => {
                  setFiles(files);
                  setOriginalFiles(originalFile);
                }}
              />
            </Filed>
          ) : (
            <div className="flex items-center justify-center w-full h-40 bg-gray-800 rounded-lg relative">
              <img
                src={product?.image}
                alt="product"
                className="w-full h-40 object-cover rounded-lg"
              />

              <button
                type="button"
                className="absolute -right-2 -top-2 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center"
                onClick={() => setShouldShowImage(true)}
              >
                <X size={20} className="text-white" />
              </button>
            </div>
          )}

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
                selected: ProductTypeEnum.SIMPLE === type,
              })}
              onClick={() => {
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
                selected: ProductTypeEnum.COMPLEX === type,
              })}
              onClick={() => {
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

              <span>Com variações</span>
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
                  label="Este produto está e promoção?"
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
                  mask="99999"
                  {...register("serves")}
                  onChange={(e) => {
                    if (e.target.value === "") return;
                    setValue("serves", parseInt(e.target.value));
                  }}
                />
              </Filed>

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

        <div className="flex gap-2 mt-10">
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
    </div>
  );
}
