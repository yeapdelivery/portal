import { Checkbox } from "@/modules/app/components/check-box";
import { CreateStoreData, SignUpData } from "../services";
import { useState } from "react";
import Button from "@/modules/app/components/button/button";
import { formatDate } from "@/formatting/date";
import { formatPhone } from "@/formatting/phone";

interface ResumeProps {
  user: SignUpData;
  store: CreateStoreData;
  loading: boolean;
  previousStep: () => void;
  submit: () => void;
}

function TitleAndSubtitle({ title, subtitle }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-bold text-gray-100">{title}:</span>
      <span className="text-gray-100">{subtitle}</span>
    </div>
  );
}

export function Resume({
  user,
  store,
  loading,
  previousStep,
  submit,
}: ResumeProps) {
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <div className="mt-10 mb-5">
        <h1 className="font-bold text-3xl text-center font-rubik">Resumo</h1>
      </div>

      <div className="border border-red-default rounded-xl p-7">
        <h2 className="text-gray-100 text-2xl font-bold">
          Dados do responsável
        </h2>

        <div className="mt-7">
          <div className="grid grid-cols-4">
            <TitleAndSubtitle title="Nome" subtitle={user?.name} />
            <TitleAndSubtitle title="E-mail" subtitle={user?.email} />
            <TitleAndSubtitle
              title="phone"
              subtitle={formatPhone(user?.phone || "")}
            />
            <TitleAndSubtitle
              title="Data de nacimento"
              subtitle={formatDate(user?.birthday || "")}
            />
          </div>
        </div>

        <h2 className="text-gray-100 text-2xl font-bold mt-10">
          Dados da loja
        </h2>

        <div className="mt-7">
          <div className="grid grid-cols-4 gap-3">
            <TitleAndSubtitle title="Nome" subtitle={store?.name} />
            <TitleAndSubtitle title="E-mail" subtitle={store?.email} />
            <TitleAndSubtitle title="phone" subtitle={store?.phone} />
            <TitleAndSubtitle title="Tipo de loja" subtitle={store?.type} />
            <TitleAndSubtitle title="Cep" subtitle={store?.zip} />
            <TitleAndSubtitle title="Cidade" subtitle={store?.city} />
            <TitleAndSubtitle title="Barrio" subtitle={store?.neighborhood} />
            <TitleAndSubtitle title="Endereço" subtitle={store?.street} />
          </div>
        </div>

        <div className="flex items-center gap-1 justify-center mt-10">
          <Checkbox
            label="Aceito termos e condições."
            value="checked"
            checked={checked}
            onChange={setChecked}
          />
          <span className="text-red-default text-xs font-semibold">
            Ver termos
          </span>
        </div>

        <div className="flex flex-col items-center gap-4 justify-center mt-5">
          <Button
            variant="secondary"
            className="w-[70%]"
            onClick={previousStep}
          >
            Voltar
          </Button>

          <Button
            className="w-[70%]"
            disabled={!checked || loading}
            isLoading={loading}
            onClick={submit}
          >
            Salvar e finalizar
          </Button>
        </div>
      </div>
    </div>
  );
}
