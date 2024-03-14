import TextFiled from "@/modules/app/components/text-filed";
import { DropFiles } from "@/modules/app/components/dropzone/types";
import { useState } from "react";
import Dropzone from "@/modules/app/components/dropzone";
import Image from "next/image";
import Button from "@/modules/app/components/button/button";
import TextArea from "@/modules/app/components/text-area";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { EditStore } from "../../templates";

interface StoreDataProps {
  register: UseFormRegister<EditStore>;
  errors: FieldErrors<EditStore>;
}

export function StoreData({ errors, register }: StoreDataProps) {
  const [files, setFiles] = useState<DropFiles[]>([]);

  function onDrop(files: DropFiles[]) {
    setFiles((oldValues) => [...oldValues, ...files]);
  }

  function onDelete(files: DropFiles[]) {
    setFiles(files);
  }
  return (
    <div className="flex w-full">
      <div className="flex flex-col-reverse md:flex-col w-full">
        <div className="flex flex-col md:flex-row">
          <div>
            <Image
              src="/Ellipse.svg"
              width={121}
              height={121}
              alt="company logo type"
            />
          </div>
          <div className="w-full">
            <Dropzone
              files={files}
              onDrop={onDrop}
              multiple
              onDelete={onDelete}
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
          <TextFiled
            htmlFor="search"
            label="Telefone ou celular da loja como aparecerá no app"
            error={errors?.phone?.message}
            required
          >
            <TextFiled.Input
              mask="99 99999-9999"
              {...register("phone")}
              placeholder="Digite seu telefone"
            />
          </TextFiled>
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
          <div className="mt-1">
            <TextFiled
              htmlFor="search"
              label="Descrição como aparecerá no app"
              error={errors?.description?.message}
              required
            >
              <TextArea
                {...register("description")}
                placeholder="Digite uma descrição"
              />
            </TextFiled>
          </div>
        </div>
      </div>
    </div>
  );
}
