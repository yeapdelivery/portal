export enum CategoryStatusModel {
  ACTIVE = "active",
  INACTIVE = "inactive",
  DRAFT = "draft",
}

export const CategoryStatusModelMap: Record<CategoryStatusModel, string> = {
  [CategoryStatusModel.ACTIVE]: "Ativo",
  [CategoryStatusModel.INACTIVE]: "Inativo",
  [CategoryStatusModel.DRAFT]: "Rascunho",
};
