import api from "@/api";
import { AxiosResponse } from "axios";
import { CategoryModel } from "../models/product-model";

export class CategoryService {
  async addCategory(category: string, storeId: string): Promise<AxiosResponse> {
    return await api.post(`/admin/stores/${storeId}/products/categories`, {
      name: category,
    });
  }

  async loadCategories(
    storeId: string
  ): Promise<AxiosResponse<CategoryModel[]>> {
    return await api.get(`/admin/stores/${storeId}/products/categories`);
  }

  async updateCategoriesOrder(
    storeId: string,
    categories: Omit<CategoryModel, "status" | "id">[]
  ): Promise<AxiosResponse> {
    return await api.put(`/admin/stores/${storeId}/products/categories/order`, {
      categories,
    });
  }

  async deleteCategory(
    storeId: string,
    categoryId: string
  ): Promise<AxiosResponse> {
    return await api.delete(
      `/admin/stores/${storeId}/products/categories/${categoryId}`
    );
  }
}

export const categoryService = new CategoryService();
