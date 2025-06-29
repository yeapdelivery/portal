import Button from "@/modules/app/components/button";
import Dialog from "@/modules/app/components/dialog";
import { useLoading, useToast } from "@/modules/app/hooks";
import { preferencesService } from "../../services";
import { useStore } from "@/modules/app/store/stores";
import Toast from "@/modules/app/components/toast";
import { useLogger } from "@/modules/app/hooks/use-logger.hook";

interface DeletePrinterProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DeletePrinter({ open, onOpenChange }: DeletePrinterProps) {
  const [isDeleteLoading, startDeleteLoading, stopDeleteLoading] = useLoading();
  const [store, setStore] = useStore((state) => [state.store, state.setStore]);
  const { toast, error, success, setToast } = useToast();
  const logger = useLogger();

  async function handleDeletePrinter() {
    startDeleteLoading();
    try {
      await preferencesService.deletePrinter(store.id);

      setStore({
        ...store,
        printerName: null,
        shouldPrintOnAcceptOrder: false,
      });
      success("Impressora deletada com sucesso");
    } catch (e) {
      logger.error("Error deleting printer:", e);
      error("Erro ao deletar impressora");
    } finally {
      stopDeleteLoading();
      onOpenChange(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content title="Deletar Impressora" position="center">
        <div>
          <p className="text-red-default">
            Tem certeza que deseja deletar a impressora? Essa ação não pode ser
            desfeita.
          </p>
          <div className="space-y-4 mt-4">
            <Button
              disabled={isDeleteLoading}
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="secondary"
              disabled={isDeleteLoading}
              isLoading={isDeleteLoading}
              onClick={handleDeletePrinter}
            >
              Deletar Impressora
            </Button>
          </div>
        </div>
      </Dialog.Content>

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
    </Dialog>
  );
}
