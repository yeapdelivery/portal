import api from "@/api";
import StoreTypeEnum from "@/modules/app/enums/store-type";
import { User } from "@/modules/app/models/user";
import { AxiosResponse } from "axios";

export interface SignUpData extends Omit<User, "id" | "address"> {
  password: string;
}

export interface CreateStoreData {
  name: string;
  email: string;
  phone: string;
  street: string;
  number: string;
  neighborhood: string;
  userId: string;
  city: string;
  state: string;
  zip: string;
  type: StoreTypeEnum;
}

class AuthService {
  async signIn(email: string, password: string) {
    return await api.post("/session", { email, password });
  }

  async signInSupport(email: string, password: string, storeName: string) {
    return await api.post("/session/support", { email, password, storeName });
  }

  async me() {
    return await api.get("/user");
  }

  async userMe() {
    const data = await api.get(`/user`);

    return data;
  }

  async getUserById(id: string) {
    const { data } = await api.get(`/user/${id}`);

    return data;
  }

  async changePassword(data: { currentPassword: string; newPassword: string }) {
    return await api.put("/user/change-password", data);
  }

  async signUp(
    data: SignUpData
  ): Promise<AxiosResponse<Omit<User, "address">>> {
    return await api.post("/user", data);
  }

  async sendEmailReconveyPassword(email: string) {
    return await api.post("/user/forgot-password", { email });
  }

  async verifyToken(token: string, email: string) {
    return await api.get("/user/verify-recovery-token", {
      params: { token, email },
    });
  }

  async verifyTokenInChangePassword(token: string, email: string) {
    return await api.get("/user/verify-token-in-change-password", {
      params: { token, email },
    });
  }

  // async changePassword(token: string, email: string, password: string) {
  //   return await api.put("/user/reset-password", { token, email, password });
  // }

  async createStore(data: CreateStoreData) {
    return await api.post("/admin/stores", data);
  }

  async getStores() {
    return await api.get("/stores/all");
  }
}

export const authService = new AuthService();
