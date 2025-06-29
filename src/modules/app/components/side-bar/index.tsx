"use client";
import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Ticket,
  BookOpenText,
  ChatDots,
  FadersHorizontal,
  Wallet,
  ChartLine,
} from "@phosphor-icons/react";
import SideBarDesktopLayout from "./side-bar-desktop-layout";
import BottomBar from "./bottom-bar";
import Header from "../header";
import { useWindowSize } from "../../hooks";
import { getScreenSize } from "@/utils";
import { tv } from "tailwind-variants";
import { useStore } from "../../store/stores";
import { Package, ShoppingCart } from "@phosphor-icons/react/dist/ssr";

export enum Menu {
  DASHBOARD = "dashboard",
  ORDER = "order",
  CATALOG = "catalog",
  CHAT = "chat",
  COUPONS = "coupons",
  PREFERENCES_USER = "preferences-user",
  PREFERENCES_COMPANY = "preferences-company",
  PREFERENCES_PRINTER = "printer",
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

const sidebar = tv({
  slots: {
    content: [
      "data-[state=closed]:ml-[4rem] md:ml-[14rem] mt-[8.2rem] md:mt-24",
      "transition-all duration-400 ease-in-out mb-20 lg:mb-0",
    ],
  },
});

export const menus: MenuProps[] = [
  {
    id: 0,
    label: "Visão geral",
    name: Menu.DASHBOARD,
    icon: <ChartLine weight="bold" size={22} />,
    href: "/dashboard",
  },
  {
    id: 1,
    label: "Pedidos",
    name: Menu.ORDER,
    icon: <Package weight="bold" size={22} />,
    href: "/pedidos",
  },
  {
    id: 2,
    label: "Cardápio",
    name: Menu.CATALOG,
    icon: <BookOpenText weight="bold" size={22} />,
    href: "/cardapio",
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
    label: "Cupons",
    name: Menu.COUPONS,
    icon: <Ticket weight="bold" size={22} />,
    href: "/cupons",
  },
  {
    id: 5,
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
      {
        id: 3,
        label: "Impressora",
        name: Menu.PREFERENCES_PRINTER,
        href: "/preferencias/impressora",
      },
    ],
  },
];

export default function SideBar({ children }: SideBarProps) {
  const pathName = usePathname();
  const [activeMenu, setActiveMenu] = useState<Menu>();
  const [open, setOpen] = useState(true);
  const windowSize = useWindowSize();
  const { content } = sidebar();
  const { name } = useStore((state) => state.store);

  const stateMenu = open ? "open" : "closed";

  function handleMenuClick(menu: Menu) {
    const findMenu = menus.find((menuItem) => menuItem.name === menu);
    if (findMenu && findMenu.href) {
      setActiveMenu(menu);
    }
  }

  useEffect(() => {
    if (windowSize.width < getScreenSize("md")) {
      setOpen(true);
    }
  }, [windowSize]);

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

    if (menu?.href && pathName.includes(menu.href)) {
      setActiveMenu(menu.name);
      return;
    }
    const subMenu = menu?.subMenu.find((subMenu) => {
      return subMenu.href === pathName;
    });

    if (subMenu) {
      setActiveMenu(subMenu.name);
    }
  }, [pathName]);

  return (
    <div data-cy="side-bar-container">
      <div className="hidden md:block text-xs">
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

      <div
        data-state={stateMenu}
        className="fixed top-0 left-0 right-0 data-[state=closed]:ml-[4rem] md:ml-[14rem] "
      >
        <Header name={name} />
      </div>

      <aside data-state={stateMenu} className={content()}>
        {children}
      </aside>
    </div>
  );
}
