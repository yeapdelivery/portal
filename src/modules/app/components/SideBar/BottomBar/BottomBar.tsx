import Link from "next/link";
import * as Collapsible from "@radix-ui/react-collapsible";
import { tv } from "tailwind-variants";
import { SignOut } from "@phosphor-icons/react";

import { Menu, MenuProps } from "..";
import { useState } from "react";

interface BottomBarProps {
  menus: MenuProps[];
  activeMenu: Menu;
  handleMenuClick: (menu: Menu) => void;
}

const bottomBar = tv({
  slots: {
    container: [
      "fixed bottom-0 left-0 w-full h-16 bg-white shadow-bottomBar",
      "flex justify-around items-center",
    ],
    icon: ["text-gray-500 hover:text-red-default"],
    subItemMenu: [
      "text-gray-500 text-sm hover:text-red-default hover:bg-red-primary-lighter",
      "px-2 h-7",
      "flex items-center rounded",
    ],
    subMenuContent: [
      "absolute -top-20 -left-5 min-w-max",
      "data-[state=open]:animate-subMenu-animation-out transition-all",
      "data-[state=closed]:animate-subMenu-animation",
    ],
  },

  variants: {
    active: {
      true: {
        icon: ["bg-red-default text-white rounded-lg p-2 hover:text-white"],
      },
    },
    activeSubMenuItem: {
      true: {
        subItemMenu: ["text-red-default bg-red-primary-lighter"],
      },
    },
  },
});

export default function BottomBar({
  menus,
  activeMenu,
  handleMenuClick,
}: BottomBarProps) {
  const { container, icon, subItemMenu, subMenuContent } = bottomBar();
  const [open, setOpen] = useState(false);

  return (
    <ul className={container()} data-cy="container-bottom">
      {menus.map((menu) => (
        <li
          key={menu.id}
          data-cy={menu.name}
          className={icon({ active: activeMenu === menu.name })}
          onClick={() => handleMenuClick(menu.name)}
        >
          {menu.href ? (
            <Link href={menu.href}>{menu.icon}</Link>
          ) : (
            <Collapsible.Root
              data-cy="sub-menu"
              open={open}
              onOpenChange={setOpen}
              className="relative"
            >
              <Collapsible.Trigger asChild>
                <button
                  className={icon({ active: activeMenu?.includes(menu.name) })}
                >
                  {menu.icon}
                </button>
              </Collapsible.Trigger>

              <Collapsible.Content
                data-cy="sub-menu-content"
                className={subMenuContent()}
              >
                <ul>
                  {menu.subMenu?.map((subMenu) => (
                    <li
                      className={subItemMenu({
                        activeSubMenuItem: activeMenu === subMenu.name,
                      })}
                      data-cy={subMenu.name}
                      key={subMenu.id}
                    >
                      <Link href={subMenu.href}>{subMenu.label}</Link>
                    </li>
                  ))}
                </ul>
              </Collapsible.Content>
            </Collapsible.Root>
          )}
        </li>
      ))}
    </ul>
  );
}
