"use client";

import { Dialog } from "@/modules/app/components";
import { PencilSimple } from "@phosphor-icons/react";

export function ProductModal() {
  return (
    <Dialog>
      <Dialog.Button asChild>
        <button className="w-6 h-6 flex items-center justify-center bg-gray-1000 rounded">
          <PencilSimple weight="bold" size={16} className="text-red-default" />
        </button>
      </Dialog.Button>

      <Dialog.Content>
        <h1>yan cesar</h1>
      </Dialog.Content>
    </Dialog>
  );
}
