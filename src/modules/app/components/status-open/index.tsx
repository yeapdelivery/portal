"use client";

import { checkOpenStore } from "@/utils";
import { CaretDown } from "@phosphor-icons/react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import { tv } from "tailwind-variants";
import { useStore } from "../../store/stores";

enum Status {
  OPEN = "open",
  CLOSE = "close",
}

const statusOpenStyle = tv({
  slots: {
    currentStatus: [
      "flex items-center px-4 py-2 rounded-xl text-xs font-medium w-40",
      "transition-all duration-300 ease-in-out outline-none",
    ],
    ballOpen: ["w-1.5 h-1.5 rounded-full bg-green-primary-dark mr-2"],
    container: [
      "data-[state=open]:animate-fade-in-dropdown",
      "data-[state=closed]:animate-fade-out-dropdown",
      "transition-all",
    ],
  },

  variants: {
    statusOpen: {
      open: {
        currentStatus: ["bg-[#E7F8F7] text-green-primary-dark rounded-b-lg"],
        ballOpen: ["w-1.5 h-1.5 rounded-full bg-green-primary-dark mr-2"],
      },

      close: {
        currentStatus: ["bg-[#FEEAEC] text-red-primary-dark rounded-t-lg"],
        ballOpen: ["w-1.5 h-1.5 rounded-full bg-red-primary-dark mr-2"],
      },
    },
    isUndoingStatus: {
      true: {
        currentStatus: "px-5",
      },
    },
  },

  compoundVariants: [
    {
      openDropDown: true,
      isCurrentStatus: false,
      class: {
        currentStatus: ["rounded-b-xl rounded-t-none "],
      },
    },
    {
      openDropDown: true,
      isCurrentStatus: true,
      class: {
        currentStatus: ["rounded-b-none justify-between rounded-t-xl"],
      },
    },
  ],
});

const INITIAL_TIMER = 30;

let timer: NodeJS.Timeout;

export default function StatusOpen() {
  const store = useStore((state) => state.store);

  const [statusOpen, setStatusOpen] = useState<Status>(Status.CLOSE);
  const { currentStatus, ballOpen } = statusOpenStyle();

  const labelOpen = "Loja aberta";

  const labelClosed = "Loja fechada";

  useEffect(() => {
    if (store) {
      setStatusOpen(checkOpenStore(store) ? Status.OPEN : Status.CLOSE);
    }
  }, [store]);

  return (
    <div className={currentStatus({ statusOpen })} data-cy="current-status">
      <div className={ballOpen({ statusOpen })}></div>
      <div className="w-[5rem] text-center">
        {statusOpen === Status.OPEN ? labelOpen : labelClosed}
      </div>
    </div>
  );
}
