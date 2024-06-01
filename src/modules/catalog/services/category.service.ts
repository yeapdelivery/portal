import api from "@/api";
import { AxiosResponse } from "axios";

export class CategoryService {
  async addCategory(category: string, storeId: string): Promise<AxiosResponse> {
    return await api.post(`/admin/stores/${storeId}/products/categories`, {
      name: category,
    });
  }
}

export const categoryService = new CategoryService();
