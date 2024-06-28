import api from "@/api";
import { AxiosResponse } from "axios";
import { ProductModel, ProductVariant } from "../models/product-model";

export class VariantService {
  async createVariant(
    variation: Omit<ProductVariant, "id">,
    storeId: string,
    productId: string
  ): Promise<AxiosResponse<ProductModel>> {
    return await api.post(
      `/admin/stores/${storeId}/products/${productId}/variations`,
      variation
    );
  }
}

export const variantService = new VariantService();
