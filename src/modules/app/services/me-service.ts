import { env } from "@/env";
import ApiService from "@/modules/app/services/api-service";

const baseUrl = `${env.NEXT_PUBLIC_API_HOST}/admin/stores`;

export class MeService extends ApiService {
  constructor() {
    super(baseUrl);
  }

  async me() {
    const data = await this.GET("/me");
    return data;
  }
}

export const meService = new MeService();
