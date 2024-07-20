import Button from "@/modules/app/components/button/button";
import Dialog from "@/modules/app/components/dialog/dialog";
import { ProductModel } from "../../models/product-model";

interface DeleteVariationModalProps {
  openDeleteProduct: boolean;
  product: ProductModel;
  loadingDeleteProduct: boolean;
  onCloseDeleteProduct: () => void;
  handleDeleteProduct: () => void;
}

export function DeleteVariationModal({
  openDeleteProduct,
  product,
  loadingDeleteProduct,
  onCloseDeleteProduct,
  handleDeleteProduct,
}: DeleteVariationModalProps) {
  return (
    <Dialog open={openDeleteProduct} onOpenChange={onCloseDeleteProduct}>
      <Dialog.Content
        title={`Deletar a variação ${product?.name}`}
        position="center"
      >
        <div>
          <p>Tem certeza que deseja deletar a variação {product?.name}?</p>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="secondary" disabled={loadingDeleteProduct}>
              Cancelar
            </Button>
            <Button
              variant="error"
              onClick={handleDeleteProduct}
              isLoading={loadingDeleteProduct}
              disabled={loadingDeleteProduct}
            >
              Deletar
            </Button>
          </div>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
