import { StoreType } from "../../../app/enums";
import SelectField from "../../../app/components/select-filed/select-filed";
import TextFiled from "../../../app/components/text-filed";
import { Map } from "@/modules/app/components/map";
import { useState } from "react";
import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { EditStore } from "../../templates";

interface AddressContentProps {
  errors: FieldErrors<EditStore>;
  register: UseFormRegister<EditStore>;
  setValue: UseFormSetValue<EditStore>;
}

const optionsStoreType = [
  { id: "1", title: "Restaurantes", value: StoreType.RESTAURANT },
  { id: "2", title: "Mercados", value: StoreType.GROCERY_STORE },
];

const optionsSpecialty = [
  { id: "1", title: "Marmita", value: "Marmita" },
  { id: "2", title: "Açai e Sorvete", value: "Açai e Sorvete" },
  { id: "3", title: "Doces e bolos", value: "Doces e bolos" },
  { id: "4", title: "Hamburgueria", value: "Hamburgueria" },
  { id: "5", title: "Pizzaria", value: "Pizzaria" },
  { id: "6", title: "Cafeteria", value: "Cafeteria" },
  { id: "7", title: "Japonesa", value: "Japonesa" },
  { id: "8", title: "Padarias", value: "Padarias" },
  { id: "9", title: "Salgados", value: "Salgados" },
  { id: "10", title: "Bebidas", value: "Bebidas" },
];

export default function AddressContent({
  errors,
  setValue,
  register,
}: AddressContentProps) {
  async function getByCep(cep: string) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      // TODO: Change state to react-hook-form
      setValue("address.city", data.localidade);
      setValue("address.state", data.uf);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex-1">
          <SelectField
            label="Tipo de Loja"
            htmlFor="category"
            error={errors?.type?.message}
            required
          >
            <SelectField.Select
              options={optionsStoreType}
              {...register("type")}
            />
          </SelectField>
        </div>

        <div className="flex-1">
          <SelectField
            label="Categoria"
            error={errors?.type?.message}
            htmlFor="category"
            required={true}
          >
            <SelectField.Select
              options={optionsSpecialty}
              {...register("category")}
            />
          </SelectField>
        </div>
      </div>
      <h2 className="text-gray-100 font-outfit text-lg font-bold mt-7">
        Endereço da loja
      </h2>

      <div className="flex w-full flex-col md:flex-row items-start gap-4 md:gap-9">
        <div className="md:flex-1 w-full md:w-auto">
          <div className="mt-4 flex items-center justify-between gap-9">
            <TextFiled
              className="flex-1"
              error={errors?.address?.zipCode?.message}
              label="CEP"
              htmlFor="cep"
              required
            >
              <TextFiled.Input
                id="cep"
                placeholder="Digite seu CEP"
                mask="99999-999"
                {...register("address.zipCode")}
                onChange={(e) => {
                  if (e.target.value.length === 9) {
                    getByCep(e.target.value.replace("-", ""));
                  }
                }}
              />
            </TextFiled>

            <TextFiled
              className="flex-1"
              error={errors?.address?.state?.message}
              label="Estado"
              htmlFor="state"
              required
            >
              <TextFiled.Input
                id="state"
                placeholder="Digite seu estado"
                {...register("address.state")}
              />
            </TextFiled>
          </div>

          <TextFiled
            className="mt-6"
            error={errors?.address?.city?.message}
            label="Cidade"
            htmlFor="city"
            required
          >
            <TextFiled.Input
              id="city"
              placeholder="Digite sua cidade"
              {...register("address.city")}
            />
          </TextFiled>

          <TextFiled
            className="mt-6"
            error={errors?.address?.neighborhood?.message}
            label="Bairro"
            htmlFor="neighborhood"
            required
          >
            <TextFiled.Input
              id="neighborhood"
              placeholder="Digite o barrio"
              {...register("address.neighborhood")}
            />
          </TextFiled>

          <div className="mt-6 flex items-center justify-between gap-9">
            <TextFiled
              className="flex-1"
              error={errors?.address?.street?.message}
              label="Endereço"
              htmlFor="street"
              required
            >
              <TextFiled.Input
                id="street"
                {...register("address.street")}
                placeholder="Digite o endereço"
              />
            </TextFiled>

            <TextFiled
              className="flex-1"
              error={errors?.address?.number?.message}
              label="Número"
              htmlFor="number"
              required
            >
              <TextFiled.Input
                id="number"
                {...register("address.number")}
                placeholder="Digite o número"
              />
            </TextFiled>
          </div>
        </div>

        <div className="md:flex-1 w-full md:w-auto">
          <p className="font-normal">
            Revise a localização da sua loja e caso precise, clique no mapa para
            editar.
          </p>
          <div className="mt-5">
            <Map onChangeLocation={(lat, lng) => console.log(lat, lng)} />
          </div>
        </div>
      </div>
    </div>
  );
}
