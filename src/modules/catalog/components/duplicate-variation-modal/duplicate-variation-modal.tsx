/* eslint-disable react/no-unescaped-entities */
import Button from "@/modules/app/components/button/button";
import Dialog from "@/modules/app/components/dialog/dialog";
import { Variation } from "@/modules/order/models";
import { ProductVariant } from "../../models/product-model";

interface DeleteVariationModalProps {
  openDuplicateVariation: boolean;
  variation: ProductVariant;
  loadingDuplicateVariation: boolean;
  onCloseDuplicate: () => void;
  handleDuplicateVariation: () => void;
}

export function DuplicateVariationModal({
  openDuplicateVariation,
  variation,
  loadingDuplicateVariation,
  onCloseDuplicate,
  handleDuplicateVariation,
}: DeleteVariationModalProps) {
  return (
    <Dialog open={openDuplicateVariation} onOpenChange={onCloseDuplicate}>
      <Dialog.Content
        title={`Duplicar a variação ${variation?.name}`}
        position="center"
      >
        <div>
          <p>Deseja duplicar a varaição "{variation?.name}"?</p>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="secondary"
              disabled={loadingDuplicateVariation}
              onClick={onCloseDuplicate}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleDuplicateVariation}
              isLoading={loadingDuplicateVariation}
              disabled={loadingDuplicateVariation}
            >
              Duplicar
            </Button>
          </div>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
