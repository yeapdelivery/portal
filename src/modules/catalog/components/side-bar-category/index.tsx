"use client";

import Catalog from "@/app/(private-routes)/cardapio/page";
import { PencilSimple } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import { tv } from "tailwind-variants";

export interface Categories {
  id: string;
  name: string;
}

interface SideBarCategoryProps {
  categories: Categories[];
}

const sideBarCategory = tv({
  slots: {
    container: [
      "w-56 bg-white fixed bottom-0 top-16 px-4 text-xs",
      "hidden lg:block",
    ],
    barPrimary: "w-[2px] absolute bg-gray-800 top-0 bottom-0",
    barSecondary: "h-8 bg-primary-default w-[2px] rounded -left-2 absolute",
    ball: [
      "h-[4px] w-[4px]  bg-primary-default",
      "absolute top-2/4 bottom-2/4 -left-[2px] translate-x-[1px] translate-y-[-2.5px]",
    ],
    item: [
      "px-2 text-left flex items-center justify-between w-full h-7",
      "font-normal font-outfit text-gray-500 hover:text-primary-default rounded",
    ],
  },

  variants: {
    active: {
      true: {
        item: "text-primary-dark bg-[#FEEAEC]",
      },
    },
  },
});

export function SideBarCategory({ categories }: SideBarCategoryProps) {
  const { container, barPrimary, ball, barSecondary, item } = sideBarCategory();
  const [active, setActive] = useState(categories[0]?.id || 0);

  return (
    <div className={container()}>
      <h1 className="mt-8 text-gray-100 font-bold font-outfit text-lg">
        Categorias
      </h1>

      <div className="mt-16 relative">
        <div className={barPrimary()}></div>

        <ul className="ml-2 space-y-4">
          {categories.map((category, index) => (
            <li
              key={category.id + index}
              className="relative flex items-center"
            >
              {category.id === active && (
                <div className={barSecondary()}>
                  <div className={ball()}></div>
                </div>
              )}
              <button
                onClick={() => setActive(category.id)}
                className={item({ active: active === category.id })}
              >
                <span>{category.name}</span>
                {category.id === active && (
                  <PencilSimple weight="bold" size={18} />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
