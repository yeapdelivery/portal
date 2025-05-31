import Button from "@/modules/app/components/button/button";
import { Pill } from "@/modules/app/components/pill/pill";
import SelectField from "@/modules/app/components/select-filed/select-filed";
import { SelectOptions } from "@/modules/app/components/select/types";
import TextFiled from "@/modules/app/components/text-filed";
import Toast from "@/modules/app/components/toast";
import { StoreType } from "@/modules/app/enums";
import { useToast } from "@/modules/app/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const optionsStoreType = [
  { id: "1", title: "Restaurantes", value: StoreType.RESTAURANT },
  { id: "2", title: "Mercados", value: StoreType.GROCERY_STORE },
];

const optionsSpecialty = [
  { id: "1", title: "Restaurantes", value: "Restaurantes" },
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

const storeSchema = z
  .object({
    name: z.string().min(1, { message: "Nome da loja é obrigatório" }),
    email: z.string().min(1, { message: "Email é obrigatório" }),
    phone: z
      .string()
      .min(1, { message: "Telefone é obrigatório" })
      .transform((value) => value.replace(/\D/g, ""))
      .refine((value) => value.length === 10 || value.length === 11, {
        message: "Telefone inválido. Deve conter 10 ou 11 dígitos",
      }),
    documentNumber: z
      .string()
      .min(1, { message: "Cpf ou Cnpj é obrigatório" })
      .max(18, { message: "Cpf ou Cnpj inválido" })
      .transform((value) => value.replace(/\D/g, "")),
    type: z.string().min(1, { message: "Tipo de loja é obrigatório" }),
    specialties: z.array(z.string()),
  })
  .refine(
    (data) => {
      return data.type === StoreType.RESTAURANT
        ? data.specialties.length > 0
        : true;
    },
    {
      message: "Especialidade é obrigatório",
      path: ["specialties"],
    }
  );
type StoreSchema = z.infer<typeof storeSchema>;

interface RegisterStoreInfoProps {
  previousStep: () => void;
  onUpdateStore: (store: StoreSchema) => void;
}

export function RegisterStoreInfo({
  onUpdateStore,
  previousStep,
}: RegisterStoreInfoProps) {
  const [storeType, setStoreType] = useState<StoreType>();
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [documentNumber, setDocumentNumber] = useState<string>("");
  const toast = useToast();

  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
    getValues,
  } = useForm<StoreSchema>({
    resolver: zodResolver(storeSchema),
  });

  function submit(data: StoreSchema) {
    onUpdateStore(data);
  }

  function getMask(value: string) {
    if (value.replace(/\D/g, "").length > 11) {
      return "99.999.999/9999-99";
    } else {
      return "999.999.999-99999";
    }
  }

  return (
    <div>
      <div className="mt-10">
        <h1 className="font-bold text-3xl text-center font-rubik">
          Informações da loja
        </h1>
      </div>

      <form
        className="mt-4 flex flex-col gap-8"
        onSubmit={handleSubmit(submit)}
      >
        <TextFiled
          label="Nome da loja (como aparecerá no app)"
          htmlFor="store-name"
          error={errors.name?.message}
          required
        >
          <TextFiled.Input
            id="store-name"
            placeholder="Exemplo: Lanchonete de João"
            {...register("name")}
          />
        </TextFiled>

        <TextFiled
          label="E-mail"
          htmlFor="store-email"
          error={errors.email?.message}
          required
        >
          <TextFiled.Input
            id="store-email"
            placeholder="Digite o e-mail da loja"
            {...register("email")}
          />
        </TextFiled>

        <div className="flex items-start gap-4">
          <TextFiled
            label="Telefone ou celular da loja"
            htmlFor="store-phone"
            error={errors.phone?.message}
            required
            className="flex-1"
          >
            <TextFiled.Input
              id="store-phone"
              placeholder="(00) 00000-0000"
              mask="(99) 99999-9999"
              {...register("phone")}
            />
          </TextFiled>

          <TextFiled
            label="Cpf ou Cnpj"
            htmlFor="store-phone"
            error={errors.documentNumber?.message}
            required
            className="flex-1"
          >
            <TextFiled.Input
              id="store-name"
              placeholder="000.000.000-00"
              mask={getMask(documentNumber)}
              value={documentNumber}
              onChange={(e) => {
                setDocumentNumber(e.target.value);
                setValue("documentNumber", e.target.value);
              }}
            />
          </TextFiled>
        </div>

        <div className="flex items-end gap-4">
          <div className="flex-1">
            <SelectField
              label="Tipo de Loja"
              htmlFor="category"
              error={errors.type?.message}
              required
            >
              <SelectField.Select
                options={optionsStoreType}
                onSelected={(option: SelectOptions) => {
                  setStoreType(option.value as unknown as StoreType);
                  setValue("type", option.value);
                }}
              />
            </SelectField>
          </div>

          {storeType === StoreType.RESTAURANT && (
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                {specialties.map((specialty, index) => (
                  <Pill
                    key={index}
                    label={specialty}
                    closable
                    onClose={() => {
                      const values = specialties.filter(
                        (value) => value !== specialty
                      );

                      setValue("specialties", values);
                      setSpecialties(values);
                    }}
                  />
                ))}
              </div>

              <SelectField
                label="Categorias"
                error={errors.specialties?.message}
                htmlFor="category"
                required={true}
              >
                <SelectField.Select
                  options={optionsSpecialty}
                  onSelected={(option: SelectOptions) => {
                    const values = getValues("specialties");

                    if (!values) {
                      setValue("specialties", [option.value]);
                      setSpecialties([option.value]);
                      return;
                    }

                    if (specialties.length >= 2) {
                      toast.error(
                        "Você só pode selecionar até 2 especialidades"
                      );
                      return;
                    }

                    if (specialties.includes(option.value)) {
                      return;
                    }

                    setValue("specialties", [option.value]);
                    setSpecialties([...specialties, option.value]);
                  }}
                />
              </SelectField>
            </div>
          )}
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

      <Toast
        message={toast.toast.message}
        type={toast.toast.type}
        open={toast.toast.open}
        setOpen={(open) => {
          toast.setToast({ message: "", open });
        }}
      />
    </div>
  );
}
