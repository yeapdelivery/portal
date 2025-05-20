import Button from "@/modules/app/components/button/button";
import Dialog from "@/modules/app/components/dialog/dialog";
import { ProductModel } from "../../models/product-model";

interface DeleteVariationModalProps {
  openDuplicateProduct: boolean;
  product: ProductModel;
  loadingDuplicateProduct: boolean;
  onCloseDuplicate: () => void;
  handleDuplicateProduct: () => void;
}

export function DuplicateProductModal({
  openDuplicateProduct,
  product,
  loadingDuplicateProduct,
  onCloseDuplicate,
  handleDuplicateProduct,
}: DeleteVariationModalProps) {
  return (
    <Dialog open={openDuplicateProduct} onOpenChange={onCloseDuplicate}>
      <Dialog.Content
        title={`Duplicar o produto ${product?.name}`}
        position="center"
      >
        <div>
          <p>Deseja duplicar o {product?.name}?</p>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="secondary"
              disabled={loadingDuplicateProduct}
              onClick={onCloseDuplicate}
            >
              Cancelar
            </Button>
            <Button
              variant="error"
              onClick={handleDuplicateProduct}
              isLoading={loadingDuplicateProduct}
              disabled={loadingDuplicateProduct}
            >
              Duplicar
            </Button>
          </div>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
