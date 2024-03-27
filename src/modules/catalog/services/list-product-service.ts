import { env } from "@/env";
import ApiService from "@/modules/app/services/api-service";

const baseUrl = `${env.NEXT_PUBLIC_API_HOST}/admin/stores`;

export class ProductsService extends ApiService {
  constructor() {
    super(baseUrl);
  }

  async loadProducts(storeId: string) {
    const data = await this.GET(`/${storeId}/products`);
    return data;
  }
}

export const productsService = new ProductsService();
