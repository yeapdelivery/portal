import { StoreType } from "../../../app/enums";
import SelectField from "../../../app/components/select-filed/select-filed";
import TextFiled from "../../../app/components/text-filed";
import { Map } from "@/modules/app/components/map";
import { useState } from "react";

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

export default function AddressContent() {
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");

  async function getByCep(cep: string) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      // TODO: Change state to react-hook-form
      setCity(data.localidade);
      setUf(data.uf);
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
            error={null}
            htmlFor="category"
            required
          >
            <SelectField.Select
              options={optionsStoreType}
              onChange={(option) => {
                console.log(option);
              }}
            />
          </SelectField>
        </div>

        <div className="flex-1">
          <SelectField
            label="Categoria"
            error={null}
            htmlFor="category"
            required={true}
          >
            <SelectField.Select
              options={optionsSpecialty}
              onChange={(option) => {
                console.log(option);
              }}
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
              error={null}
              label="CEP"
              htmlFor="cep"
              required
            >
              <TextFiled.Input
                id="cep"
                placeholder="Digite seu CEP"
                mask="99999-999"
                onChange={(e) => {
                  if (e.target.value.length === 9) {
                    getByCep(e.target.value.replace("-", ""));
                  }
                }}
              />
            </TextFiled>

            <TextFiled
              className="flex-1"
              error={null}
              label="Estado"
              htmlFor="state"
              required
            >
              <TextFiled.Input
                id="cep"
                value={uf}
                onChange={(e) => setUf(e.currentTarget.value)}
              />
            </TextFiled>
          </div>

          <TextFiled
            className="mt-6"
            error={null}
            label="Cidade"
            htmlFor="city"
            required
          >
            <TextFiled.Input
              id="city"
              value={city}
              onChange={(e) => setCity(e.currentTarget.value)}
            />
          </TextFiled>

          <TextFiled
            className="mt-6"
            error={null}
            label="Bairro"
            htmlFor="neighborhood"
            required
          >
            <TextFiled.Input id="neighborhood" />
          </TextFiled>

          <div className="mt-6 flex items-center justify-between gap-9">
            <TextFiled
              className="flex-1"
              error={null}
              label="Endereço"
              htmlFor="street"
              required
            >
              <TextFiled.Input id="street" />
            </TextFiled>

            <TextFiled
              className="flex-1"
              error={null}
              label="Número"
              htmlFor="number"
              required
            >
              <TextFiled.Input id="number" />
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
