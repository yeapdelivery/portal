import StoreModel from "@/modules/app/models/store";
import { User } from "@/modules/app/models/user";

interface AuthStore extends StoreModel {
  accessToken: string;
}

declare module "next-auth" {
  interface Session {
    store: AuthStore;
    user: User;
  }
}
