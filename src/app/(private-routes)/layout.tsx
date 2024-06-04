import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import SideBar from "@/modules/app/components/side-bar";
import { PrivateRouterProvider } from "@/modules/app/provider/private-router-provider";
import configureAxiosInterceptors from "@/api/interceptor";

interface PrivateLayoutProps {
  children: ReactNode;
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session = await getServerSession(nextAuthOptions);

  configureAxiosInterceptors(session?.store?.accessToken);

  if (!session) {
    redirect("/");
  }

  return (
    <>
      <SideBar>{children}</SideBar>
      <PrivateRouterProvider
        storeFromLayout={session.store}
        accessToken={session.store.accessToken}
        userFromLayout={session.user}
      />
    </>
  );
}
