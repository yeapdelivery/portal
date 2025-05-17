import StoreModel from "@/modules/app/models/store";
import { CategoryStatusModel } from "../enums/category-status-model";
import { ProductStatusEnum } from "../enums/product-status-model";
import { ProductTypeEnum } from "../enums/product-type.enum";

export interface PriceModel {
  original: number;
  promotional: number;
}

export interface CategoryModel {
  id: string;
  name: string;
  status: CategoryStatusModel;
  order: number;
}

export interface CategoryWithProducts {
  category: CategoryModel;
  products: ProductModel[];
}

export interface ProductVariationOption {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  isRequired: boolean;
  description: string;
  min: number;
  max: number;
  isPizza: boolean;
  options: ProductVariationOption[];
}

export interface ProductModel {
  id: string;
  name: string;
  serves: number;
  category: CategoryModel;
  price: PriceModel;
  store: StoreModel;
  status: ProductStatusEnum;
  type: ProductTypeEnum;
  description: string;
  image: string;
  cooled: boolean;
  isPizza: boolean;
  totalFlavors: number;
  variations: ProductVariant[];
}
