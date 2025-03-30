import Button from "@/modules/app/components/button/button";
import TextFiled from "@/modules/app/components/text-filed";
import StoreModel from "@/modules/app/models/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const addressSchema = z.object({
  zip: z
    .string()
    .min(8, { message: "CEP é obrigatório" })
    .transform((v) => v.replace(/\D/g, "")),
  state: z.string().min(1, { message: "Estado é obrigatório" }),
  city: z.string().min(1, { message: "Cidade é obrigatório" }),
  neighborhood: z.string().min(1, { message: "Bairro é obrigatório" }),
  street: z.string().min(1, { message: "Endereço é obrigatório" }),
  number: z.string().min(1, { message: "Número é obrigatório" }),
});

type AddressSchema = z.infer<typeof addressSchema>;

interface RegisterAddressProps {
  onUpdateAddress: (address: AddressSchema) => void;
  previousStep: () => void;
}

export function RegisterAddress({
  onUpdateAddress,
  previousStep,
}: RegisterAddressProps) {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<AddressSchema>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      zip: "46200000",
      state: "BA",
      city: "Condeúba",
    },
  });

  // async function getByCep(cep: string) {
  //   try {
  //     const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  //     const data = await response.json();

  //     setValue("city", data.localidade);
  //     setValue("state", data.uf);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  function submit(data: AddressSchema) {
    onUpdateAddress(data);
  }

  return (
    <div className="md:flex-1 w-full md:w-auto">
      <div className="mt-10">
        <h1 className="font-bold text-3xl text-center font-rubik">
          Endereço da loja
        </h1>
      </div>

      <form onSubmit={handleSubmit(submit)}>
        <div className="mt-4 flex items-center justify-between gap-9">
          {/* <TextFiled
            className="flex-1"
            error={errors.zip?.message}
            label="CEP"
            htmlFor="cep"
            required
          >
            <TextFiled.Input
              id="cep"
              placeholder="Digite seu CEP"
              mask="99999-999"
              {...register("zip")}
              //   onBlur={(e) => {
              //     if (e.target.value.length === 9) {
              //       getByCep(e.target.value.replace("-", ""));
              //     }
              //   }}
            />
          </TextFiled> */}

          {/* <TextFiled
            className="flex-1"
            error={errors?.state?.message}
            label="Estado"
            htmlFor="state"
            required
          >
            <TextFiled.Input
              id="state"
              placeholder="Digite seu estado"
              {...register("state")}
            />
          </TextFiled> */}
        </div>
        {/* 
        <TextFiled
          className="mt-6"
          error={errors?.city?.message}
          label="Cidade"
          htmlFor="city"
          required
        >
          <TextFiled.Input
            id="city"
            placeholder="Digite sua cidade"
            {...register("city")}
          />
        </TextFiled> */}

        <TextFiled
          className="mt-6"
          error={errors?.neighborhood?.message}
          label="Bairro"
          htmlFor="neighborhood"
          required
        >
          <TextFiled.Input
            id="neighborhood"
            placeholder="Digite o barrio"
            {...register("neighborhood")}
          />
        </TextFiled>

        <div className="mt-6 flex items-center justify-between gap-9">
          <TextFiled
            className="flex-1"
            error={errors?.street?.message}
            label="Endereço"
            htmlFor="street"
            required
          >
            <TextFiled.Input
              id="street"
              {...register("street")}
              placeholder="Digite o endereço"
            />
          </TextFiled>

          <TextFiled
            className="flex-1"
            error={errors?.number?.message}
            label="Número"
            htmlFor="number"
            required
          >
            <TextFiled.Input
              id="number"
              {...register("number")}
              placeholder="Digite o número"
            />
          </TextFiled>
        </div>

        <div className="flex items-center gap-4 mt-8">
          <Button
            onClick={previousStep}
            type="button"
            variant="secondary"
            className="flex-1"
          >
            Voltar
          </Button>
          <Button type="submit" className="flex-1">
            Próximos
          </Button>
        </div>
      </form>
    </div>
  );
}
