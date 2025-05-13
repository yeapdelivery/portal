import api from "@/api";
import { CategoryWithProducts, ProductModel } from "../models/product-model";
import { AxiosResponse } from "axios";
import { ProductStatusEnum } from "../enums/product-status-model";

interface Product {
  items: CategoryWithProducts[];
}

export interface CreateProduct {
  name: string;
  server: number;
  category: string;
  order: number;
  price: {
    original: number;
    promotional: number;
  };
  status: string;
  type: string;
  description: string;
}

export class ProductsService {
  async loadProducts(storeId: string): Promise<AxiosResponse<Product>> {
    return await api.get(`/admin/stores/${storeId}/products`);
  }

  async createProduct(storeId: string, product: CreateProduct) {
    return await api.post(`/admin/stores/${storeId}/products`, product);
  }

  async updateProduct(
    storeId: string,
    productId: string,
    product: CreateProduct
  ) {
    return await api.patch(
      `/admin/stores/${storeId}/products/${productId}`,
      product
    );
  }

  async updateStatusProduct(
    storeId: string,
    productId: string,
    status: ProductStatusEnum
  ) {
    return await api.patch(
      `/admin/stores/${storeId}/products/${productId}/status`,
      { status }
    );
  }

  async uploadImage(storeId: string, productId: string, form: FormData) {
    return await api.post(
      `/admin/stores/${storeId}/products/${productId}/image`,
      form
    );
  }

  async deleteProduct(storeId: string, productId: string) {
    return await api.delete(`/admin/stores/${storeId}/products/${productId}`);
  }

  async updateProductOrder(
    storeId: string,
    categoryId: string,
    productUpdate: { id: string; order: number }[]
  ) {
    return await api.patch(
      `/admin/stores/${storeId}/category/${categoryId}/update-order/`,
      productUpdate
    );
  }
}

export const productsService = new ProductsService();
