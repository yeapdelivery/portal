"use client";

import Button from "@/modules/app/components/button";
import { CreateOrEditPrinter } from "../../components/create-or-edit-printer";
import { useModal } from "@/modules/app/hooks";
import { useStore } from "@/modules/app/store/stores";
import { Printer, Trash } from "@phosphor-icons/react";
import { Pencil } from "@phosphor-icons/react/dist/ssr";
import { DeletePrinter } from "../../components/delete-printer";

export function PrinterTemplate() {
  const store = useStore((state) => state.store);
  const { open, onOpenChange } = useModal();
  const { open: openDeleteModal, onOpenChange: onOpenChangeDeleteModal } =
    useModal();

  if (!store.id) return null;

  return (
    <div>
      {!store.printerName ? (
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <h2>Você ainda não tem impressora cadastrada</h2>

          <Button className="w-[300px]" onClick={() => onOpenChange(true)}>
            Cadastrar Impressora
          </Button>

          <CreateOrEditPrinter open={open} onOpenChange={onOpenChange} />
        </div>
      ) : (
        <div className="px-5">
          <div className="border border-gray-600 p-4 rounded-lg flex flex-row items-center gap-10 w-fit">
            <div className="flex items-center gap-2">
              <Printer size={24} className="text-red-default" />
              <h2 className="text-lg   text-red-default">
                Impressora: {store.printerName}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => onOpenChange(true)}>
                <Pencil size={20} className="text-red-default" />
              </button>

              <button onClick={() => onOpenChangeDeleteModal(true)}>
                <Trash size={20} className="text-red-default" />
              </button>
            </div>
          </div>

          <CreateOrEditPrinter open={open} onOpenChange={onOpenChange} />
        </div>
      )}

      <DeletePrinter
        open={openDeleteModal}
        onOpenChange={onOpenChangeDeleteModal}
      />
    </div>
  );
}
