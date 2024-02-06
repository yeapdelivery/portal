"use client";

import { Dialog } from "@/modules/app/components";
import { List } from "@phosphor-icons/react";

export function CategoryModal() {
  return (
    <Dialog>
      <Dialog.Button asChild>
        <button className="flex px-2 lg:hidden mt-6 justify-between items-center h-9 text-gray-100 bg-white w-full rounded">
          <span>Hamburgers</span>
          <List size={32} />
        </button>
      </Dialog.Button>

      <Dialog.Content title="Categorias">testes</Dialog.Content>
    </Dialog>
  );
}
