"use client";

import { useEffect } from "react";
import StoreModel from "../models/store";
import { useStore } from "../store/stores";
import { setCookie } from "nookies";

interface PrivateRouterProviderProps {
  storeFromLayout: StoreModel;
}

export function PrivateRouterProvider({
  storeFromLayout,
}: PrivateRouterProviderProps) {
  const setStore = useStore((state) => state.setStore);

  useEffect(() => {
    setStore(storeFromLayout);

    setCookie(null, "storeId", storeFromLayout.id, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
  }, [setStore, storeFromLayout]);

  return <></>;
}
