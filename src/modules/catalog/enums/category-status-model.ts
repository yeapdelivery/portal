export enum CategoryStatusModel {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export const CategoryStatusModelMap: Record<CategoryStatusModel, string> = {
  [CategoryStatusModel.ACTIVE]: "Ativo",
  [CategoryStatusModel.INACTIVE]: "Inativo",
};
