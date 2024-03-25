"use client";

import Dialog from "@/modules/app/components/dialog";
import { List, PencilSimple } from "@phosphor-icons/react";
import { tv } from "tailwind-variants";

const categoriesStyle = tv({
  slots: {
    button: [
      "flex px-2 lg:hidden mt-6 justify-between",
      "items-center h-9 text-gray-100 bg-white w-full rounded",
    ],

    items: [
      "w-full text-gray-500 text- rounded h-7",
      "flex items-center justify-center hover:justify-between rounded",
      "px-2 group hover:text-red-primary-dark hover:bg-red-secondary-100",
    ],
  },

  variants: {
    active: {
      true: {
        items: "text-red-primary-dark bg-[#FEEAEC]",
      },
    },
  },
});

export function CategoryModal() {
  const { button, items } = categoriesStyle();

  return (
    <Dialog>
      <Dialog.Button asChild>
        <button className={button()}>
          <span>Hamburgers</span>
          <List size={32} />
        </button>
      </Dialog.Button>

      <Dialog.Content
        titleSlot={
          <div className="flex justify-between items-center relative">
            <h1 className="text-lg font-bold">Categorias</h1>
          </div>
        }
      >
        <hr className="border border-dashed border-gray-700" />
        <ul className="mt-10 space-y-4">
          <li>
            <button className={items()}>
              <span></span>
              <span className="text-gray-500 group-hover:text-red-primary-dark">
                Hamburgueres
              </span>
              <PencilSimple
                weight="bold"
                size={16}
                className="text-red-default hidden group-hover:block"
              />
            </button>
          </li>

          <li>
            <button className={items()}>
              <span></span>
              <span className="text-gray-500 group-hover:text-red-primary-dark">
                Bebidas
              </span>
              <PencilSimple
                weight="bold"
                size={16}
                className="text-red-default hidden group-hover:block"
              />
            </button>
          </li>

          <li>
            <button className={items()}>
              <span></span>
              <span className="text-gray-500 group-hover:text-red-primary-dark">
                Sobremesas
              </span>
              <PencilSimple
                weight="bold"
                size={16}
                className="text-red-default hidden group-hover:block"
              />
            </button>
          </li>

          <li>
            <button className={items()}>
              <span></span>
              <span className="text-gray-500 group-hover:text-red-primary-dark">
                Combos
              </span>
              <PencilSimple
                weight="bold"
                size={16}
                className="text-red-default hidden group-hover:block"
              />
            </button>
          </li>
        </ul>
      </Dialog.Content>
    </Dialog>
  );
}
