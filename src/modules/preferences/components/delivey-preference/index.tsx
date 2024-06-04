import { Checkbox } from "@/modules/app/components/check-box";
import TextFiled from "@/modules/app/components/text-filed";
import { useEffect, useState } from "react";
import CommercialHour from "../commercial-hour";
import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { EditStore } from "../../templates";
import { currency } from "@/formatting";

interface DeliveryContentProps {
  errors: FieldErrors<EditStore>;
  getValues: UseFormGetValues<EditStore>;
  register: UseFormRegister<EditStore>;
  setValue: UseFormSetValue<EditStore>;
}

export function Delivery({
  errors,
  register,
  setValue,
  getValues,
}: DeliveryContentProps) {
  const [freeTaxChecked, setFreeTaxChecked] = useState(false);
  const [minTaxChecked, setMinTaxChecked] = useState(false);
  const [price, setPrice] = useState("");
  const [minOrder, setMinOrder] = useState("");

  useEffect(() => {
    if (freeTaxChecked) {
      setPrice("R$ 0.00");
      setValue("delivery.price", 0);
    }
  }, [freeTaxChecked]);

  useEffect(() => {
    const priceValue = getValues("delivery.price");
    const minOrderValue = getValues("delivery.minOrder");

    if (priceValue || priceValue === 0) {
      setPrice(currency(priceValue));
      setValue("delivery.price", formatNumber(priceValue.toString()));
    }

    if (minOrderValue || minOrderValue === 0) {
      setMinOrder(currency(minOrderValue));
      setValue("delivery.minOrder", formatNumber(minOrderValue.toString()));
    }
  }, [getValues, setValue]);

  function formatNumber(value: string): number {
    return Number(value.replace(/[^\d.,]/g, "").replace(",", "."));
  }

  return (
    <div className="flex flex-col">
      <span className="mb-3 text-gray-100 font-bold font-outfit">Entrega</span>
      <div className="flex flex-col md:flex-row w-full gap-6">
        <div className="flex gap-6 w-full md:w-3/5">
          <div className="flex flex-col w-full gap-6">
            <div className="flex items-end gap-2">
              <div className="w-full">
                <TextFiled error={null} htmlFor="search" label="Valor" required>
                  <TextFiled.Input
                    prefix="R$"
                    disabled={freeTaxChecked}
                    value={price}
                    currency
                    onInputChange={(value) => {
                      const number = value
                        .replace(/[^\d.,]/g, "")
                        .replace(",", ".");

                      setPrice(`R$ ${number}`);

                      setValue("delivery.price", Number(number));
                    }}
                  />
                </TextFiled>
              </div>
            </div>
            <div className="flex items-end gap-2">
              <div className="w-full whitespace-nowrap">
                <TextFiled
                  error={null}
                  htmlFor="search"
                  label="Pedido mínimo"
                  required
                >
                  <TextFiled.Input
                    disabled={minTaxChecked}
                    currency
                    prefix="R$"
                    value={minOrder}
                    onInputChange={(value) => {
                      const number = value
                        .replace(/[^\d.,]/g, "")
                        .replace(",", ".");

                      setMinOrder(`R$ ${number}`);

                      setValue("delivery.minOrder", `${number}` as any);
                    }}
                  />
                </TextFiled>
              </div>
            </div>
          </div>
          <div className="flex flex-col self-end gap-16">
            <div className="pb-3 whitespace-nowrap">
              <Checkbox
                value="free-tax"
                checked={freeTaxChecked}
                onChange={(newValue) => setFreeTaxChecked(newValue)}
                label="Taxa grátis"
              />
            </div>
            <div className="pb-3 whitespace-nowrap">
              <Checkbox
                value="min-checked"
                checked={minTaxChecked}
                onChange={(checked) => setMinTaxChecked(checked)}
                label="S/ Taxa mínima"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-6">
          <TextFiled
            error={null}
            htmlFor="search"
            label="Tempo mínimo de entrega"
            required
          >
            <TextFiled.Input
              placeholder="Exemplo: 10min"
              suffix=" min"
              maxLength={7}
              {...register("delivery.estimatedMinTime")}
            />
          </TextFiled>
          <TextFiled
            error={null}
            htmlFor="search"
            label="Tempo máximo de entrega"
            required
          >
            <TextFiled.Input
              placeholder="Exemplo: 60 min"
              suffix=" min"
              maxLength={7}
              {...register("delivery.estimatedMaxTime")}
            />
          </TextFiled>
        </div>
      </div>

      <CommercialHour
        errors={errors}
        register={register}
        setValue={setValue}
        getValues={getValues}
      />
    </div>
  );
}
