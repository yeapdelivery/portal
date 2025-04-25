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
import StoreModel from "@/modules/app/models/store";

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

  useEffect(() => {
    if (freeTaxChecked) {
      setValue("delivery.price", 0);
    }
  }, [freeTaxChecked]);

  console.log(errors);

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
                    disabled={freeTaxChecked}
                    {...register("delivery.price")}
                    onChange={(value) => {
                      const number = value.currentTarget.value
                        .replace(/[^\d.,]/g, "")
                        .replace(",", ".");

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
                    currency
                    {...register("delivery.minOrder")}
                    onChange={(value) => {
                      const number = value.currentTarget.value
                        .replace(/[^\d.,]/g, "")
                        .replace(",", ".");

                      setValue("delivery.minOrder", Number(number));
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
            label="Tempo mínimo de entrega (min)"
            required
          >
            <TextFiled.Input
              placeholder="Exemplo: 10min"
              maxLength={7}
              {...register("delivery.estimatedMinTime")}
              type="number"
              onChange={(value) => {
                const number = value.currentTarget.value
                  .replace(/[^\d.,]/g, "")
                  .replace(",", ".");

                setValue("delivery.estimatedMinTime", Number(number));
              }}
            />
          </TextFiled>
          <TextFiled
            error={null}
            htmlFor="search"
            label="Tempo máximo de entrega (min)"
            required
          >
            <TextFiled.Input
              placeholder="Exemplo: 60 min"
              maxLength={7}
              {...register("delivery.estimatedMaxTime")}
              type="number"
              onChange={(value) => {
                const number = value.currentTarget.value
                  .replace(/[^\d.,]/g, "")
                  .replace(",", ".");

                setValue("delivery.estimatedMaxTime", Number(number));
              }}
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
