import TextFiled from "@/modules/app/components/text-filed";
import { DropFiles } from "@/modules/app/components/dropzone/types";
import { useState } from "react";
import Dropzone from "@/modules/app/components/dropzone";
import Image from "next/image";
import Button from "@/modules/app/components/button/button";

interface StoreDataProps {
  cancel: () => void;
  save: () => void;
}

export function StoreData({ cancel, save }: StoreDataProps) {
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
          <div className="flex w-full gap-5 mt-1 md:hidden justify-end">
            <div className="w-28">
              <Button
                data-test="cancel-button"
                variant="error"
                onClick={() => cancel()}
              >
                Cancelar
              </Button>
            </div>
            <div className="w-28">
              <Button
                data-test="save-button"
                variant="check"
                onClick={() => save()}
              >
                Salvar
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <TextFiled
            error={null}
            htmlFor="search"
            label="Nome da loja como aparecerá no app"
            required
          >
            <TextFiled.Input id="search" className="bg-gray-1000" />
          </TextFiled>
          <TextFiled
            error={null}
            htmlFor="search"
            label="Telefone ou celular da loja como aparecerá no app"
            required
          >
            <TextFiled.Input id="search" className="bg-gray-1000" />
          </TextFiled>
          <TextFiled
            error={null}
            htmlFor="search"
            label="Endereço de email"
            required
          >
            <TextFiled.Input id="search" className="bg-gray-1000" />
          </TextFiled>
          <div className="mt-1">
            <TextFiled
              error={null}
              htmlFor="search"
              label="Descrição como aparecerá no app"
              required
            >
              <TextFiled.Input id="search" className="bg-gray-1000 h-36" />
            </TextFiled>
          </div>
        </div>
      </div>
    </div>
  );
}
