"use client";
import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { tv } from "tailwind-variants";
import {
  Ticket,
  BookOpenText,
  ChatDots,
  FadersHorizontal,
} from "@phosphor-icons/react";
import SideBarDesktopLayout from "./SideBarDesktopLayout";
import BottomBar from "./BottomBar";

export enum Menu {
  ORDER = "order",
  CATALOG = "catalog",
  CHAT = "chat",
  PREFERENCES_USER = "preferences-user",
  PREFERENCES_COMPANY = "preferences-company",
  PREFERENCES = "preferences",
}

interface SubMenuProps {
  id: number;
  name: Menu;
  label: string;
  href: string;
}

export interface MenuProps {
  id: number;
  label: string;
  name: Menu;
  icon: any;
  href: string | null;
  subMenu?: SubMenuProps[];
}

interface SideBarProps {
  children: ReactNode;
}

export const menus: MenuProps[] = [
  {
    id: 1,
    label: "Pedidos",
    name: Menu.ORDER,
    icon: <Ticket weight="bold" size={22} />,
    href: "/pedidos",
  },
  {
    id: 2,
    label: "Cardápio",
    name: Menu.CATALOG,
    icon: <BookOpenText weight="bold" size={22} />,
    href: "/catalogo",
  },
  {
    id: 3,
    label: "Chat",
    name: Menu.CHAT,
    icon: <ChatDots weight="bold" size={22} />,
    href: "/chat",
  },
  {
    id: 4,
    label: "Preferencias",
    name: Menu.PREFERENCES,
    icon: <FadersHorizontal weight="bold" size={22} />,
    href: null,
    subMenu: [
      {
        id: 1,
        label: "Dados da empresa",
        name: Menu.PREFERENCES_COMPANY,
        href: "/preferencias/dados-empresa",
      },
      {
        id: 2,
        label: "Usuários",
        name: Menu.PREFERENCES_USER,
        href: "/preferencias/usuarios",
      },
    ],
  },
];

const sideBar = tv({
  slots: {
    container: [
      "fixed top-0 left-0 bottom-0 bg-white",
      "w-56 data-[state=closed]:w-16 border-r-2 border-gray-800",
      "p-2 flex flex-col justify-between font-outfit",
      "data-[state=closed]:animate-menu-animation data-[state=closed]:translate-x-[calc(-100%+60px)]",
      "transition-all duration-400 ease-in-out",
    ],
    itemContainer: ["flex flex-col gap-6 mt-10"],
    menuOpen: ["flex items-center gap-3 px-4", "text-gray-500"],
  },
});

export function SideBar({ children }: SideBarProps) {
  const pathName = usePathname();
  const [activeMenu, setActiveMenu] = useState<Menu>();
  const [open, setOpen] = useState(true);

  const stateMenu = open ? "open" : "closed";

  function handleMenuClick(menu: Menu) {
    const findMenu = menus.find((menuItem) => menuItem.name === menu);
    if (findMenu && findMenu.href) {
      setActiveMenu(menu);
    }
  }

  useEffect(() => {
    const menu = menus.find((menu) => {
      if (menu.subMenu) {
        return (
          menu.subMenu.filter((subMenu) => {
            return subMenu.href === pathName;
          }).length > 0
        );
      }

      return menu.href === pathName;
    });

    if (menu.href && pathName.includes(menu.href)) {
      setActiveMenu(menu.name);
      return;
    }
    const subMenu = menu.subMenu.find((subMenu) => {
      return subMenu.href === pathName;
    });

    if (subMenu) {
      setActiveMenu(subMenu.name);
    }
  }, [pathName]);

  return (
    <div data-cy="side-bar-container">
      <div className="hidden md:block">
        <SideBarDesktopLayout
          menus={menus}
          activeMenu={activeMenu}
          open={open}
          stateMenu={stateMenu}
          setOpen={setOpen}
          handleMenuClick={handleMenuClick}
        />
      </div>

      <div className="md:hidden">
        <BottomBar
          menus={menus}
          activeMenu={activeMenu}
          handleMenuClick={handleMenuClick}
        />
      </div>

      <aside
        data-state={stateMenu}
        className="data-[state=closed]:ml-[4rem] md:ml-[14rem] transition-all duration-400 ease-in-out mb-20 lg:mt-0"
      >
        {children}
      </aside>
    </div>
  );
}
