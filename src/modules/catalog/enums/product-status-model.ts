export enum ProductStatusEnum {
  DRAFT = "Draft",
  ACTIVE = "Active",
  INACTIVE = "Inactive",
}

export const ProductStatusEnumMap: Record<ProductStatusEnum, string> = {
  [ProductStatusEnum.DRAFT]: "Rascunho",
  [ProductStatusEnum.ACTIVE]: "Publicado",
  [ProductStatusEnum.INACTIVE]: "Inactive",
};
