"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Collapsible from "@radix-ui/react-collapsible";
import { tv } from "tailwind-variants";
import { CaretDown } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { MenuProps, Menu } from "..";

interface MenuItemProps {
  menu: MenuProps;
  activeMenu: Menu;
  stateMenu: "open" | "closed";
  handleMenuClick: (name: Menu) => void;
}

const menuItem = tv({
  slots: {
    itemMenu: [
      "flex items-center gap-3 px-4",
      "text-gray-500 hover:text-red-default rounded",
      "h-8 transition-all duration-400 ease-in-out",
    ],
    barPrimary: ["w-[3px] absolute bg-gray-800 left-4 top-0 bottom-0"],
    barSecondary: ["h-8 bg-red-default w-[3px] rounded", "absolute -left-3"],
    ball: [
      "h-[5px] w-[5px] rounded-full bg-red-default",
      "absolute top-2/4 bottom-2/4 -left-[2px] translate-x-[1px] translate-y-[-2.5px]",
    ],
    subItemMenu: [
      "text-gray-500 hover:text-red-default hover:bg-red-primary-lighter",
      "px-2 h-7",
      "flex items-center rounded",
    ],
    subMenuContent: [
      "relative mt-2 ",
      "data-[state=open]:animate-subMenu-animation transition-all",
      "data-[state=closed]:animate-subMenu-animation-out",
    ],
  },
  variants: {
    active: {
      true: {
        itemMenu: ["text-white bg-red-default h-8 rounded hover:text-white"],
      },
    },
    activeSubMenuItem: {
      true: {
        subItemMenu: ["text-red-default bg-red-primary-lighter"],
      },
    },
    stateMenu: {
      closed: {
        itemMenu: "w-fit ml-1 px-0 p-2",
        subMenuContent: ["absolute -right-48 -top-3"],
        ball: "-left-[2px]",
      },
      open: {
        itemMenu: "w-full",
      },
    },
    hasSubmenu: {
      true: {
        itemMenu: "flex items-center justify-between",
      },
    },
  },
});

export function MenuItem({
  menu,
  activeMenu,
  stateMenu,
  handleMenuClick,
}: MenuItemProps) {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const {
    itemMenu,
    ball,
    barPrimary,
    barSecondary,
    subItemMenu,
    subMenuContent,
  } = menuItem();

  const stateSubMenu = open ? "open" : "closed";

  useEffect(() => {
    const findMenu = menu.subMenu?.find(
      (subMenu) => subMenu.name === activeMenu
    );

    if (pathname !== "/preferencias") {
      setOpen(false);
    }

    if (menu.subMenu && findMenu && activeMenu.includes(findMenu.name)) {
      setOpen(true);
    }
  }, [activeMenu, menu, pathname]);

  return (
    <li data-cy={menu.name} onClick={() => handleMenuClick(menu.name)}>
      {menu.href ? (
        <Link
          href={menu.href}
          className={itemMenu({
            active: activeMenu === menu.name,
            stateMenu,
          })}
        >
          <div>{menu.icon}</div>
          <span data-state={stateMenu} className="data-[state=closed]:hidden">
            {menu.label}
          </span>
        </Link>
      ) : (
        <Collapsible.Root
          className="relative"
          data-cy="sub-item"
          open={open}
          onOpenChange={setOpen}
        >
          <Collapsible.Trigger
            className={itemMenu({
              active: activeMenu?.includes(menu.name),
              stateMenu,
              hasSubmenu: !!menu.subMenu,
            })}
          >
            <div className="flex items-center gap-3">
              <div>{menu.icon}</div>
              <span
                data-state={stateMenu}
                className="data-[state=closed]:hidden"
              >
                {menu.label}
              </span>
            </div>

            {stateMenu === "open" && (
              <CaretDown
                data-state={stateSubMenu}
                size={16}
                className="data-[state=open]:rotate-180 data-[state=closed]:rotate-0  transition-all duration-300 ease-in-out"
              />
            )}
          </Collapsible.Trigger>

          <Collapsible.Content
            data-cy="sub-items-content"
            className={subMenuContent({ stateMenu })}
          >
            <div className={barPrimary()}></div>

            <ul className="ml-7 flex flex-col gap-4 pt-[9px]">
              {menu.subMenu?.map((subMenu) => (
                <div key={subMenu.id} className="flex items-center relative">
                  {activeMenu?.includes(subMenu.name) && (
                    <div className={barSecondary()}>
                      <div className={ball({ stateMenu })}></div>
                    </div>
                  )}
                  <Link
                    data-cy={subMenu.name}
                    href={subMenu.href}
                    className={subItemMenu({
                      activeSubMenuItem: activeMenu?.includes(subMenu.name),
                    })}
                  >
                    {subMenu.label}
                  </Link>
                </div>
              ))}
            </ul>
          </Collapsible.Content>
        </Collapsible.Root>
      )}
    </li>
  );
}
