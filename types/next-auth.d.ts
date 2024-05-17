import StoreModel from "@/modules/app/models/store";

declare module "next-auth" {
  interface Session {
    store: StoreModel;
  }
}
