import { ReactNode } from "react";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import SideBar from "@/modules/app/components/side-bar";
import { meService } from "@/modules/app/services/me-service";
import { PrivateRouterProvider } from "@/modules/app/provider/private-router-provider";

interface PrivateLayoutProps {
  children: ReactNode;
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const user = await getSession();
  const me = await meService.me();

  if (!user) {
    redirect("/");
  }

  return (
    <>
      <SideBar img={user?.user?.picture} name={user?.user?.nickname}>
        {children}
      </SideBar>
      <PrivateRouterProvider storeFromLayout={me} />
    </>
  );
}
