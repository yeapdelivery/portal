"use client";

import { CaretDown } from "@phosphor-icons/react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { tv } from "tailwind-variants";

enum Status {
  OPEN = "open",
  CLOSE = "close",
}

const statusOpenStyle = tv({
  slots: {
    currentStatus: [
      "flex items-center px-4 py-2 rounded-xl text-xs font-medium w-40 outline-none ",
      "transition-all duration-300 ease-in-out",
    ],
    ballOpen: ["w-1.5 h-1.5 rounded-full bg-green-primary-dark mr-2"],
    container: [
      "data-[state=open]:animate-fade-in-dropdown data-[state=closed]:animate-fade-out-dropdown",
      "transition-all",
    ],
  },

  variants: {
    openDropDown: {
      true: {},
    },

    statusOpen: {
      open: {
        currentStatus: ["bg-[#E7F8F7] text-green-primary-dark"],
        ballOpen: ["w-1.5 h-1.5 rounded-full bg-green-primary-dark mr-2"],
      },
      close: {
        currentStatus: ["bg-[#FEEAEC] text-red-primary-dark"],
        ballOpen: ["w-1.5 h-1.5 rounded-full bg-red-primary-dark mr-2"],
      },
    },

    isCurrentStatus: {
      false: {},
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

export function StatusOpen() {
  const [statusOpen, setStatusOpen] = useState<Status>(Status.CLOSE);
  const [openDropDown, setOpenDropDown] = useState(false);
  const { currentStatus, ballOpen, container } = statusOpenStyle({
    openDropDown,
  });

  const inverseStatus = statusOpen === Status.OPEN ? Status.CLOSE : Status.OPEN;
  const stateMenu = openDropDown ? "open" : "closed";

  function handleChangeStatus() {
    setStatusOpen(inverseStatus);
    setOpenDropDown(false);
  }

  return (
    <DropdownMenu.Root
      data-cy="status-open"
      open={openDropDown}
      onOpenChange={setOpenDropDown}
    >
      <DropdownMenu.Trigger asChild>
        <button
          className={currentStatus({ statusOpen, isCurrentStatus: true })}
          data-cy="current-status"
        >
          <div className={ballOpen({ statusOpen })}></div>
          <div className="w-[5rem]">
            {statusOpen === Status.OPEN ? "Loja aberta" : "Loja fechada"}
          </div>
          <CaretDown
            size={16}
            data-cy="arrow"
            className="ml-3 data-[state=open]:rotate-180 transition-all duration-100 w-fit "
            data-state={stateMenu}
          />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className={container()}>
        <button
          data-cy="choice-status"
          className={currentStatus({
            statusOpen: inverseStatus,
            isCurrentStatus: false,
          })}
          onClick={handleChangeStatus}
        >
          <div className={ballOpen({ statusOpen: inverseStatus })}></div>
          {statusOpen === Status.OPEN ? "Loja aberta" : "Loja fechada"}
        </button>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
