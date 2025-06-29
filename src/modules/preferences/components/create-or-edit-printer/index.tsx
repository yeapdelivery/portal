import Button from "@/modules/app/components/button";
import { Checkbox } from "@/modules/app/components/check-box";
import Dialog from "@/modules/app/components/dialog";
import { Select } from "@/modules/app/components/select";
import { SelectOptions } from "@/modules/app/components/select/types";
import TextFiled from "@/modules/app/components/text-filed";
import { useLoading, useToast } from "@/modules/app/hooks";
import { useEffect, useState } from "react";
import { preferencesService } from "../../services";
import { useStore } from "@/modules/app/store/stores";
import Toast from "@/modules/app/components/toast";
import { useLogger } from "@/modules/app/hooks/use-logger.hook";

interface CreateOrEditPrinterProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CreateOrEditPrinter({
  open,
  onOpenChange,
}: CreateOrEditPrinterProps) {
  const [store, setStore] = useStore((state) => [state.store, state.setStore]);

  const [printer, setPrinter] = useState<string | null>();
  const [printersNames, setPrintersNames] = useState<SelectOptions[]>([]);
  const [shouldPrintOnAcceptOrder, setShouldPrintOnAcceptOrder] =
    useState<boolean>(store.shouldPrintOnAcceptOrder || false);

  const [isGettingPrinters, startGetPrintersLoading, stopGetPrintersLoading] =
    useLoading();

  const [
    isUpdatingPrinterName,
    startUpdatePrinterNameLoading,
    stopUpdatePrinterNameLoading,
  ] = useLoading();
  const { toast, error, success, setToast } = useToast();
  const logger = useLogger();

  useEffect(() => {
    if (store.printerName) {
      setPrinter(store.printerName);
      setShouldPrintOnAcceptOrder(store.shouldPrintOnAcceptOrder || false);
    } else {
      setPrinter(null);
    }
  }, [store]);

  useEffect(() => {
    async function fetchPrinters() {
      try {
        if (window.api?.getPrinters) {
          startGetPrintersLoading();
          const printers = await window.api.getPrinters();

          const options = printers.map((name) => ({
            title: name,
            value: name,
          }));

          setPrintersNames(options as SelectOptions[]);
        } else {
          console.warn("API de impressoras não disponível no preload");
        }
      } catch (error) {
        console.error("Erro ao buscar impressoras:", error);
      } finally {
        stopGetPrintersLoading();
      }
    }
    fetchPrinters();
  }, []);
  async function handleUpdatePrinter() {
    startUpdatePrinterNameLoading();

    try {
      await preferencesService.updatePrinter(
        store.id,
        printer as string,
        shouldPrintOnAcceptOrder
      );
      onOpenChange(false);

      setStore({
        ...store,
        printerName: printer,
        shouldPrintOnAcceptOrder,
      });
      success("Impressora atualizada com sucesso!");
    } catch (e) {
      onOpenChange(false);
      logger.error("Erro ao atualizar impressora", e);
      error("Erro ao atualizar impressora. Tente novamente mais tarde.");
    } finally {
      stopUpdatePrinterNameLoading();
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <Dialog.Content title="Cadastrar Impressora" position="right">
          {!isGettingPrinters && printersNames.length > 0 && (
            <TextFiled label="Impressoras detectadas" error={null}>
              <Select
                options={printersNames as SelectOptions[]}
                defaultValue={printer || ""}
                onSelected={(value) => setPrinter(value.value)}
              />
            </TextFiled>
          )}

          {isGettingPrinters && (
            <div className="flex items-center justify-center h-20">
              <p>Buscando impressoras...</p>
            </div>
          )}

          {!isGettingPrinters && printersNames.length === 0 && (
            <div className="flex items-center justify-center h-20">
              <p>
                Nenhuma impressora encontrada. Conecte uma impressora e tente
                novamente.
              </p>
            </div>
          )}

          {printer && (
            <div className="space-y-3 mt-3">
              <Checkbox
                label="Deseja fazer impressão automática quando seu você aceitar o pedido?"
                checked={shouldPrintOnAcceptOrder}
                value="shouldPrintOnAcceptOrder"
                onChange={setShouldPrintOnAcceptOrder}
              />

              <Button variant="secondary" disabled={isUpdatingPrinterName}>
                Testar Impressão
              </Button>
              <Button
                disabled={isUpdatingPrinterName}
                isLoading={isUpdatingPrinterName}
                onClick={handleUpdatePrinter}
              >
                Cadastrar
              </Button>
            </div>
          )}
        </Dialog.Content>
      </Dialog>
      <Toast
        message={toast.message}
        type={toast.type}
        open={toast.open}
        setOpen={(open) => {
          if (!open) {
            setToast({ ...toast, open: false });
          }
        }}
      />
    </>
  );
}
