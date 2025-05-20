import api from "@/api";
import { AxiosResponse } from "axios";
import {
  ProductModel,
  ProductVariant,
  ProductVariationOption,
} from "../models/product-model";

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

  async updateVariant(
    variation: ProductVariant,
    storeId: string,
    productId: string
  ): Promise<AxiosResponse<ProductModel>> {
    const { id, ...data } = variation;

    return await api.patch(
      `/admin/stores/${storeId}/products/${productId}/variations/${id}`,
      data
    );
  }

  async updateVariantOptions(
    variantId: string,
    storeId: string,
    productId: string,
    option: ProductVariationOption
  ): Promise<AxiosResponse<ProductModel>> {
    const { id, ...data } = option;

    return await api.patch(
      `/admin/stores/${storeId}/products/${productId}/variations/${variantId}/options/${id}`,
      data
    );
  }

  async deleteVariant(
    variantId: string,
    storeId: string,
    productId: string
  ): Promise<AxiosResponse<ProductModel>> {
    return await api.delete(
      `/admin/stores/${storeId}/products/${productId}/variations/${variantId}/`
    );
  }

  async deleteVariantOption(
    variantId: string,
    storeId: string,
    productId: string,
    optionId: string
  ): Promise<AxiosResponse<ProductModel>> {
    return await api.delete(
      `/admin/stores/${storeId}/products/${productId}/variations/${variantId}/options/${optionId}`
    );
  }

  async duplicateVariant(
    variantId: string,
    storeId: string,
    productId: string
  ): Promise<AxiosResponse<ProductVariant>> {
    return await api.post(
      `/admin/stores/${storeId}/products/${productId}/variations/${variantId}/duplicate`
    );
  }
}

export const variantService = new VariantService();
