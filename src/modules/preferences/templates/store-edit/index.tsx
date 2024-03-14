"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { ContainerPreference } from "../../components/container-preference";
import { HeaderPreference } from "../../components/header-preference";
import { StoreData } from "../../components/store-data";
import { AddressContent } from "@/modules/preferences/components/address-content";
import { Delivey } from "../../components/delivey-preference";
import Button from "@/modules/app/components/button/button";

const editStoreSchema = z.object({
  name: z
    .string()
    .min(3, "O nome precisa ter menos mais de 3 caracteres")
    .max(255),

  description: z.string().min(10, "Descrição obrigatória").max(255),
  phone: z
    .string()
    .min(14, "Telefone inválido")
    .transform((value) => value.replace(/\D/g, "")),
  email: z.string().email("Email inválido"),
  cnpj: z.string().transform((value) => value.replace(/\D/g, "")),
  type: z.string().min(3, "Tipo de loja obrigatório"),
  category: z.string().min(3, "Categoria obrigatória"),
  cep: z
    .string()
    .min(9, "CEP obrigatório")
    .transform((value) => value.replace(/\D/g, "")),
  address: z.object({
    street: z.string().min(3, "Rua obrigatória"),
    number: z.string().min(1, "Número obrigatório"),
    neighborhood: z.string().min(3, "Bairro obrigatório"),
    city: z.string().min(3, "Cidade obrigatória"),
    state: z.string().min(2, "Estado obrigatório"),
    zipCode: z
      .string()
      .min(9, "Cep obrigatório")
      .transform((value) => value.replace(/\D/g, "")),
  }),
  delivery: z.object({
    start: z.string(),
    end: z.string(),
    freeTax: z.boolean(),
    minTax: z.boolean(),
    minTaxValue: z.number(),
    freeTaxValue: z.number(),
    minTaxDistance: z.number(),
    freeTaxDistance: z.number(),
  }),
});

export type EditStore = z.infer<typeof editStoreSchema>;

export function ScreenStore() {
  const {
    formState: { errors },
    setValue,
    handleSubmit,
    register,
  } = useForm<EditStore>({
    resolver: zodResolver(editStoreSchema),
  });

  console.log({ errors });

  function onSubmit(data: EditStore) {
    console.log("entrou");
    console.log({ data });
  }

  return (
    <div>
      <section>
        <HeaderPreference
          backgroundImage="/Rectangle.svg"
          name="Insano Burguer"
          profileImage="/Ellipse.svg"
          cancel={() => {}}
          save={() => {}}
        />
      </section>

      <section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full mb-10 space-y-5">
            <ContainerPreference
              title="Dados da loja"
              description="Atualize o perfil da sua loja aqui"
            >
              <StoreData register={register} errors={errors} />
            </ContainerPreference>

            <hr className="border border-gray-700" />

            <ContainerPreference
              title="Informações da Loja"
              description="Atualize as informações da sua loja aqui."
            >
              <AddressContent
                errors={errors}
                register={register}
                setValue={setValue}
              />
            </ContainerPreference>

            <hr className="border border-gray-700" />

            <ContainerPreference
              title="Delivey da loja"
              description="Atualize as informações da sua loja aqui"
            >
              <Delivey />
            </ContainerPreference>
          </div>

          <Button type="submit">salvar</Button>
        </form>
      </section>
    </div>
  );
}
