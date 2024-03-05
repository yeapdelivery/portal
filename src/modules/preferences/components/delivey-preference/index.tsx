import { Checkbox } from "@/modules/app/components/check-box";
import TextFiled from "@/modules/app/components/text-filed";
import { useState } from "react";

export function Delivey() {
  const [freeTaxChecked, setFreeTaxChecked] = useState(false);
  const [minTaxChecked, setMinTaxChecked] = useState(false);

  return (
    <div className="flex flex-col">
      <span className="mb-3 text-gray-100 font-bold font-outfit">Entrega</span>
      <div className="flex flex-col md:flex-row w-full md:w-3/12 mb-6">
        <div className="whitespace-nowrap">
          <TextFiled error={null} htmlFor="search" label="De(km)" required>
            <TextFiled.Input mask="distance" />
          </TextFiled>
        </div>

        <span className="hidden md:flex self-end pb-2 text-[#C7C9D9] mx-1">
          -
        </span>
        <div className="whitespace-nowrap">
          <TextFiled error={null} htmlFor="search" label="Até(km)" required>
            <TextFiled.Input mask="distance" />
          </TextFiled>
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full gap-6">
        <div className="flex gap-6 w-full md:w-3/5">
          <div className="flex flex-col w-full gap-6">
            <div className="flex items-end gap-2">
              <div className="w-full">
                <TextFiled error={null} htmlFor="search" label="Valor" required>
                  <TextFiled.Input
                    prefix="R$"
                    disabled={freeTaxChecked}
                    mask="currency"
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
                    mask="currency"
                    prefix="R$"
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
            <TextFiled.Input placeholder="Exemplo: 10min" mask="time" />
          </TextFiled>
          <TextFiled
            error={null}
            htmlFor="search"
            label="Tempo máximo de entrega"
            required
          >
            <TextFiled.Input placeholder="Exemplo: 60 min" mask="time" />
          </TextFiled>
        </div>
      </div>
    </div>
  );
}
