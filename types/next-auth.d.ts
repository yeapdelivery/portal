import StoreModel from "@/modules/app/models/store";

interface AuthStore extends StoreModel {
  accessToken: string;
}

declare module "next-auth" {
  interface Session {
    store: AuthStore;
  }
}
