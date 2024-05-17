import api from "@/api";
import ApiService from "@/modules/app/services/api-service";

const baseUrl = `${process.env.NEXT_PUBLIC_API_HOST}/admin/stores`;

export class MeService extends ApiService {
  constructor() {
    super(baseUrl);
  }

  async me() {
    const data = await api.get(`/admin/stores/me`);
    return data;
  }
}

export const meService = new MeService();
