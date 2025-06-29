import api from "@/api";
import StoreModel from "@/modules/app/models/store";
import { User } from "@/modules/app/models/user";
import { AxiosResponse } from "axios";

class PreferencesService {
  async updateStore(id: string, store: StoreModel) {
    return await api.put(`/admin/stores/${id}`, store);
  }

  async uploadLogo(
    file: FormData,
    id: string
  ): Promise<AxiosResponse<StoreModel>> {
    return await api.patch(`/admin/stores/${id}/logo`, file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async uploadBackgroundImage(
    file: FormData,
    id: string
  ): Promise<AxiosResponse<StoreModel>> {
    return await api.patch(`/admin/stores/${id}/cover`, file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async updateUser(
    data: Omit<User, "id" | "address">
  ): Promise<AxiosResponse<User>> {
    return await api.put("/user", data);
  }

  async updatePrinter(
    storeId: string,
    printerName: string,
    shouldPrintOnAcceptOrder: boolean
  ) {
    return await api.put(`/admin/stores/update/${storeId}/printer-name`, {
      printerName,
      shouldPrintOnAcceptOrder,
    });
  }

  async deletePrinter(storeId: string) {
    return await api.delete(`/admin/stores/delete/${storeId}/printer-name`);
  }
}

export const preferencesService = new PreferencesService();
