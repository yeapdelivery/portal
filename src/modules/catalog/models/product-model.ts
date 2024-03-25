import StoreModel from "@/modules/app/models/store";
import { CategoryStatusModel } from "../enums/category-status-model";
import { ProductStatusModel } from "../enums/product-status-model";

export interface PriceModel {
  original: number;
  promotional: number;
}

export interface CategoryModel {
  id: string;
  name: string;
  status: CategoryStatusModel;
}

export interface ProductModel {
  id: string;
  name: string;
  server: number;
  category: CategoryModel;
  price: PriceModel;
  store: StoreModel;
  status: ProductStatusModel;
  description: string;
}
