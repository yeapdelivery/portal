import TextFiled from "@/modules/app/components/text-filed";
import { DropFiles } from "@/modules/app/components/dropzone/types";
import { useState } from "react";
import Dropzone from "@/modules/app/components/dropzone";
import Image from "next/image";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { EditStore } from "../../templates";
import { useStore } from "@/modules/app/store/stores";
import { preferencesService } from "../../services";
import Toast from "@/modules/app/components/toast";
import { useLoading, useToast } from "@/modules/app/hooks";
import { EmptyImage } from "@/modules/app/components/empty-image";

interface StoreDataProps {
  errors: FieldErrors<EditStore>;
  register: UseFormRegister<EditStore>;
  setValue: UseFormSetValue<EditStore>;
}

export function StoreData({ errors, register, setValue }: StoreDataProps) {
  const [files, setFiles] = useState<DropFiles[]>([]);
  const [store, setStore] = useStore((state) => [state.store, state.setStore]);
  const [documentNumber, setDocumentNumber] = useState<string>("");
  const { toast, error, success, setToast } = useToast();
  const [isLogoUpdating, startLoaderLogo, stopLoaderLogo] = useLoading();

  async function onDrop(_: DropFiles[], files: File[]) {
    startLoaderLogo();
    try {
      const form = new FormData();
      form.append("logo", files[0]);

      const { data: responseData } = await preferencesService.uploadLogo(
        form,
        store.id
      );

      setStore({
        ...store,
        logo: responseData.logo,
      });

      success("Logo atualizado com sucesso!");
    } catch {
      error("Erro ao atualizar logo");
    } finally {
      stopLoaderLogo();
    }
  }

  function onDelete(files: DropFiles[]) {
    setFiles(files);
  }

  function getMask(value: string) {
    if (value.replace(/\D/g, "").length > 11) {
      return "99.999.999/9999-99";
    } else {
      return "999.999.999-99999";
    }
  }

  return (
    <div className="flex w-full">
      <div className="flex flex-col-reverse md:flex-col w-full">
        <div className="flex flex-col gap-4 md:flex-row">
          <div>
            {store.logo ? (
              <Image
                src={store.logo}
                width={121}
                height={121}
                alt="company logo type"
                className="rounded-full z-50"
              />
            ) : (
              <div className="rounded-full w-[121px] h-[121px]">
                <EmptyImage className="rounded-full" />
              </div>
            )}
          </div>
          <div className="w-full">
            <Dropzone
              files={files}
              onDrop={onDrop}
              multiple
              onDelete={onDelete}
              isLoading={isLogoUpdating}
            />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <TextFiled
            error={errors?.name?.message}
            htmlFor="search"
            label="Nome da loja como aparecerá no app"
            required
          >
            <TextFiled.Input
              {...register("name")}
              placeholder="Digite o nome da loja"
            />
          </TextFiled>

          <div className="flex items-start gap-4">
            <TextFiled
              htmlFor="search"
              label="Telefone ou celular"
              error={errors?.phone?.message}
              className="flex-1"
              required
            >
              <TextFiled.Input
                mask="99 99999-9999"
                {...register("phone")}
                placeholder="Digite seu telefone"
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
                {...register("documentNumber")}
                onChange={(e) => {
                  setDocumentNumber(e.target.value);
                  setValue("documentNumber", e.target.value);
                }}
              />
            </TextFiled>
          </div>

          <TextFiled
            error={errors?.email?.message}
            htmlFor="search"
            label="Endereço de email"
            required
          >
            <TextFiled.Input
              {...register("email")}
              placeholder="Digite seu email"
            />
          </TextFiled>
        </div>
      </div>

      <Toast
        open={toast.open}
        type={toast.type}
        message={toast.message}
        setOpen={() => setToast({ open: false, message: "" })}
      />
    </div>
  );
}
