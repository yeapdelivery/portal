/* eslint-disable @next/next/no-img-element */
"use client";

import { CloudArrowUp, TrashSimple } from "@phosphor-icons/react/dist/ssr";
import { MouseEvent, useCallback, useState } from "react";
import { tv } from "tailwind-variants";
import Toast from "../toast";
import { DropFiles } from "./types";
import { fileToBase64 } from "@/utils";
import { useToast } from "../../hooks";
import Spinner from "../spinner/spinner";
import Image from "next/image";

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
        containerDropZone: "border-primary-default bg-purple-100",
      },
    },
    isDragging: {
      true: {
        containerDropZone: "border-blue-default bg-blue-100",
      },
    },

    disabled: {
      true: {
        containerDropZone: "bg-gray-800",
      },
    },
  },
});

interface DropzoneProps {
  accept?: string[];
  multiple?: boolean;
  files: DropFiles[];
  disabled?: boolean;
  isLoading?: boolean;

  onDrop: (files: DropFiles[], file: File[]) => void;
  onDelete?: (file: DropFiles[]) => void;
}

const ACCEPTED_FORMATS = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  // "application/pdf",
];

export default function Dropzone({
  files = [],
  accept = ACCEPTED_FORMATS,
  multiple,
  disabled,
  isLoading,
  onDrop,
  onDelete,
}: DropzoneProps) {
  const [hasError, setHasError] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { toast, setToast, error: toastError } = useToast();
  const { containerDropZone } = dropzone({ isDragging });

  async function addFiles(files: File[]): Promise<void> {
    const newFiles = files.map(async (file) => {
      const imageBase64 = await fileToBase64(file);

      const newFile: DropFiles = {
        id: crypto.randomUUID(),
        name: file.name,
        base64: imageBase64,
        src: URL.createObjectURL(file),
        size: file.size,
        type: file.type,
      };

      return newFile;
    });

    const filesResolved = await Promise.all(newFiles);
    onDrop(filesResolved, files);
  }

  function handleRemoveFile(
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    file: DropFiles
  ): void {
    event.preventDefault();
    const newFiles = files.filter((f) => f.id !== file.id);

    onDelete(newFiles);
  }

  function verifyFiles(files: File[]): boolean {
    if (accept) {
      const isAccepted = files.every((file) => {
        return accept.includes(file.type);
      });

      if (!isAccepted) {
        setHasError(true);
        toastError("Formato de arquivo inválido");
        return true;
      }
    }

    setHasError(false);
    return false;
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>): void {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;

    if (verifyFiles(Array.from(files))) return;

    addFiles(Array.from(files));
  }

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const files = event.target.files;

    if (verifyFiles(Array.from(files))) return;

    addFiles(Array.from(files));
  };

  const getAcceptedFormats = useCallback((): string => {
    return accept.map((format) => format.split("/")[1]).join(", ");
  }, [accept]);

  console.log("files", files);

  return (
    <>
      <div>
        <div
          className={containerDropZone({ error: hasError, disabled })}
          data-test="dropzone"
          onDrop={handleDrop}
          onDragOver={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
        >
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <input
                type="file"
                data-test="input-file"
                multiple={multiple}
                className="absolute z-10 inset-0 opacity-0 cursor-pointer"
                onChange={(event) => {
                  handleInputChange(event);
                }}
                disabled={disabled}
              />

              {files.length === 0 || files.length > 1 ? (
                <div className="flex flex-col items-center gap-2">
                  <CloudArrowUp
                    weight="bold"
                    size={32}
                    className="text-gray-500"
                  />

                  <p className="text-center">
                    <span className="text-primary-default">
                      Clique para carregar
                    </span>{" "}
                    ou arraste e solte <br /> {getAcceptedFormats()}
                  </p>
                </div>
              ) : (
                <img
                  src={files[0]?.src}
                  alt="dropzone"
                  className="w-full h-full object-cover rounded-xl"
                />
              )}
            </>
          )}
        </div>

        {/* <div className="mt-3">
          {files.map((file) => (
            <div key={file.id} className="flex items-center gap-2">
              <p className="text-gray-300 font-medium">{file.name}</p>
              <button
                data-test={`delete-${file.id}`}
                onClick={(event) => handleRemoveFile(event, file)}
              >
                <TrashSimple size={18} />
              </button>
            </div>
          ))}
        </div> */}
      </div>

      <Toast
        open={toast.open}
        type={toast.type}
        message={toast.message}
        setOpen={(open) => {
          if (!open) {
            setHasError(false);
          }
          setToast({ message: "", open });
        }}
      />
    </>
  );
}
