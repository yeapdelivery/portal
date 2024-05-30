"use client";
import { useEffect } from "react";
import { setCookie } from "nookies";

import { useStore } from "../store/stores";
import StoreModel from "../models/store";
import configureAxiosInterceptors from "@/api/interceptor";

interface PrivateRouterProviderProps {
  storeFromLayout: StoreModel;
  accessToken: string;
}

export function PrivateRouterProvider({
  storeFromLayout,
  accessToken,
}: PrivateRouterProviderProps) {
  const setStore = useStore((state) => state.setStore);

  useEffect(() => {
    setStore(storeFromLayout);
    configureAxiosInterceptors(accessToken);

    setCookie(null, "storeId", storeFromLayout.id, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
  }, [setStore, storeFromLayout, accessToken]);

  return <></>;
}
