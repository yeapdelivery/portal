import Dialog from "@/modules/app/components/dialog/dialog";
import { ProductModel } from "../../models/product-model";
import Button from "@/modules/app/components/button/button";
import { ProductStatusEnum } from "../../enums/product-status-model";
import { useLoading } from "@/modules/app/hooks";
import { productsService } from "../../services/list-product-service";
import { useStore } from "@/modules/app/store/stores";
import { useLogger } from "@/modules/app/hooks/use-logger.hook";

interface ChangeProductStatusModalProps {
  product: ProductModel;
  open: boolean;
  onClose: (open: boolean) => void;
  updateProduct: () => void;
}

export function ChangeProductStatusModal({
  open,
  product,
  onClose,
  updateProduct,
}: ChangeProductStatusModalProps) {
  const [loading, startLoader, stopLoader] = useLoading();
  const store = useStore((state) => state.store);

  const logger = useLogger();

  async function updateStatusProduct() {
    startLoader();
    try {
      const status =
        product?.status === ProductStatusEnum.ACTIVE
          ? ProductStatusEnum.DRAFT
          : ProductStatusEnum.ACTIVE;

      await productsService.updateStatusProduct(store.id, product.id, status);
      updateProduct();
    } catch (error) {
      logger.error("Erro ao atualizar status do produto", { error });
    } finally {
      onClose(false);
      stopLoader();
    }
  }

  function getDialogContent() {
    if (product?.status === ProductStatusEnum.ACTIVE) {
      return (
        <div>
          <p>Tem certeza que deseja desativar o produto {product?.name}?</p>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="secondary"
              disabled={loading}
              onClick={() => onClose(!open)}
            >
              Cancelar
            </Button>
            <Button
              variant="error"
              onClick={updateStatusProduct}
              disabled={loading}
              isLoading={loading}
            >
              Desativar
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <p>Tem certeza que deseja ativar o produto {product?.name}?</p>
        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="secondary"
            disabled={loading}
            onClick={() => onClose(!open)}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={updateStatusProduct}
            disabled={loading}
            isLoading={loading}
          >
            Ativar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <Dialog.Content
        title={`Publicar produto ${product?.name}`}
        position="center"
      >
        <div>{getDialogContent()}</div>
      </Dialog.Content>
    </Dialog>
  );
}
