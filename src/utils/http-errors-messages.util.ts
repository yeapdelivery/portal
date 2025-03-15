export enum HttpErrors {
  PRODUCT_NOT_DRAFT_MODE = "Product is not in draft mode",
}

export const httpErrorsMessages: Record<HttpErrors, string> = {
  [HttpErrors.PRODUCT_NOT_DRAFT_MODE]: "Produto deve estar em modo de rascunho",
};
