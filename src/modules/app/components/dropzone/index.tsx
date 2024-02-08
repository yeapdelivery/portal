"use client";

import { CloudArrowUp } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import { tv } from "tailwind-variants";
import { Toast } from "../toast";

const dropzone = tv({
  slots: {
    containerDropZone: [
      "w-full bg-gray-1000 border border-gray-800",
      "h-44 flex items-center justify-center",
      "relative cursor-pointer rounded-xl transition-all duration-150",
    ],
  },

  variants: {
    error: {
      true: {
        containerDropZone: "border-red-default",
      },
    },
  },
});

interface DropzoneProps {
  accept?: string[];
  multiple?: boolean;
  files: File[];
  onDrop: (files: FileList) => void;
}

const ACCEPTED_FORMATS = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/pdf",
];

export function Dropzone({
  files = [],
  accept = ACCEPTED_FORMATS,
  multiple,
  onDrop,
}: DropzoneProps) {
  const [hasError, setHasError] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const { containerDropZone } = dropzone();

  function verifyFiles(files: File[]): boolean {
    console.log("entrou");

    if (accept) {
      const isAccepted = files.every((file) => {
        return accept.includes(file.type);
      });

      if (!isAccepted) {
        setHasError(true);
        setOpenToast(true);
        return true;
      }
    }

    setHasError(false);
    return false;
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const files = event.dataTransfer.files;

    if (verifyFiles(Array.from(files))) return;

    onDrop(files);
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (verifyFiles(Array.from(files))) return;

    onDrop(files);
  };

  return (
    <>
      <div>
        <div
          className={containerDropZone({ error: hasError })}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple={multiple}
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(event) => {
              console.log("change");
              handleInputChange(event);
            }}
          />

          <div className="flex flex-col items-center gap-2">
            <CloudArrowUp weight="bold" size={32} className="text-gray-500" />

            <p>
              <span className="text-red-default">Clique para carregar</span> ou
              arraste e solte
            </p>
          </div>
        </div>
        {`${hasError}`}

        {files.map((file) => (
          <p key={file.name}>{file.name}</p>
        ))}
      </div>
      <Toast
        open={openToast}
        type="error"
        message="Formato de arquivo não suportado"
        setOpen={(open) => {
          console.log({ open });
          if (!open) {
            setHasError(false);
          }
          setOpenToast(open);
        }}
      />
    </>
  );
}
