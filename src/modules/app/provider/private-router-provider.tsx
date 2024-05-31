"use client";
import { useEffect } from "react";
import { setCookie } from "nookies";

import { useStore } from "../store/stores";
import StoreModel from "../models/store";
import configureAxiosInterceptors from "@/api/interceptor";
import { User } from "../models/user";
import { useUser } from "../store/user";

interface PrivateRouterProviderProps {
  storeFromLayout: StoreModel;
  userFromLayout: User;
  accessToken: string;
}

export function PrivateRouterProvider({
  storeFromLayout,
  userFromLayout,
  accessToken,
}: PrivateRouterProviderProps) {
  const setStore = useStore((state) => state.setStore);
  const setUser = useUser((state) => state.setUser);

  useEffect(() => {
    setStore(storeFromLayout);
    configureAxiosInterceptors(accessToken);

    setCookie(null, "storeId", storeFromLayout.id, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
  }, [setStore, storeFromLayout, accessToken]);

  useEffect(() => {
    setUser(userFromLayout);
  }, [setUser, userFromLayout]);

  return <></>;
}
