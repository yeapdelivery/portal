"use client";
import Image from "next/image";
import { tv } from "tailwind-variants";
import { List, SignOut } from "@phosphor-icons/react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { MenuItem } from "./menu-item";
import { Menu, MenuProps } from "..";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@/modules/app/store/user";
import { useStore } from "@/modules/app/store/stores";

interface SideBarDesktopLayout {
  menus: MenuProps[];
  activeMenu: Menu;
  open: boolean;
  stateMenu: "open" | "closed";
  setOpen: (open: boolean) => void;
  handleMenuClick: (menu: Menu) => void;
}

const sideBar = tv({
  slots: {
    container: [
      "fixed top-0 left-0 bottom-0 bg-white",
      "w-56 data-[state=closed]:w-16 border-r-2 border-gray-800",
      "p-2 flex flex-col justify-between font-outfit",
      "data-[state=closed]:animate-menu-animation data-[state=closed]:translate-x-[calc(-100%+64px)]",
      "transition-all duration-400 ease-in-out",
    ],
    itemContainer: ["flex flex-col gap-4 mt-10"],
    menuOpen: ["flex items-center gap-3 px-4", "text-gray-500"],
  },
});

export default function SideBarDesktopLayout({
  menus,
  activeMenu,
  open,
  stateMenu,
  setOpen,
  handleMenuClick,
}: SideBarDesktopLayout) {
  const { container, itemContainer, menuOpen } = sideBar();
  const route = useRouter();
  const setUser = useUser((state) => state.setUser);
  const setStore = useStore((state) => state.setStore);

  async function handleSighOut() {
    try {
      await signOut({
        redirect: false,
      });

      route.push("/");
      // setUser(null);
      // setStore(null);
    } catch (error) {
      console.log("Error ao loging out", error);
    }
  }

  return (
    <div>
      <Collapsible.Root
        open={open}
        onOpenChange={setOpen}
        className={container()}
        data-cy="container-side-bar-desktop"
      >
        <div>
          <div className="flex justify-center">
            <Link href="/pedidos">
              <Image
                src="/logo.png"
                alt="Logo"
                width={103}
                height={51}
                className="ml-2"
              />
            </Link>
          </div>
          <nav>
            <ul className={itemContainer()}>
              <li>
                <Collapsible.Trigger asChild>
                  <button className={menuOpen()}>
                    <div className="text-red-default">
                      <List size={22} weight="bold" />
                    </div>
                    <span
                      data-state={stateMenu}
                      className="data-[state=closed]:opacity-0 transition-all duration-400 ease-in-out"
                    >
                      Menu
                    </span>
                  </button>
                </Collapsible.Trigger>
              </li>

              <div className="px-4">
                <hr className="border border-gray-800 " />
              </div>

              {menus.map((menu) => (
                <MenuItem
                  key={menu.id}
                  menu={menu}
                  activeMenu={activeMenu}
                  stateMenu={stateMenu}
                  handleMenuClick={handleMenuClick}
                />
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-7 py-4">
          <div className="px-4">
            <hr className="border border-gray-800 " />
          </div>

          <button
            data-cy="sign-out"
            className="px-4 flex items-center gap-4"
            onClick={handleSighOut}
          >
            <SignOut size={22} weight="bold" className="text-red-default" />
            <span
              data-state={stateMenu}
              className="data-[state=closed]:opacity-0 transition-all duration-400 ease-in-out text-gray-500"
            >
              Sair
            </span>
          </button>
        </div>
      </Collapsible.Root>
    </div>
  );
}
