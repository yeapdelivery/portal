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
  const [statusOpen, setStatusOpen] = useState<Status>(Status.CLOSE);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [count, setCount] = useState(INITIAL_TIMER);
  const { currentStatus, ballOpen, container } = statusOpenStyle();

  const inverseStatus = statusOpen === Status.OPEN ? Status.CLOSE : Status.OPEN;
  const stateMenu = openDropDown ? "open" : "closed";

  const isCounting = count > 0 && count !== INITIAL_TIMER;

  const labelOpen = isCounting ? `Abrindo loja em (${count})` : "Loja aberta";

  const labelClosed = isCounting
    ? `Fechando loja em (${count})`
    : "Loja fechada";

  function startTimer() {
    setCount(29);
    timer = setInterval(() => {
      if (count <= 0) {
        clearInterval(timer);
        setCount(INITIAL_TIMER);
        return;
      }

      setCount((oldValue) => oldValue - 1);
    }, 1000);
  }

  function handleChangeStatus() {
    startTimer();
    setStatusOpen(inverseStatus);
    setOpenDropDown(false);
  }

  function handleBackStatus() {
    setStatusOpen(inverseStatus);
    setCount(INITIAL_TIMER);
    clearInterval(timer);
  }

  return (
    <DropdownMenu.Root
      data-cy="status-open"
      open={openDropDown}
      onOpenChange={setOpenDropDown}
    >
      {!isCounting ? (
        <DropdownMenu.Trigger asChild>
          <button
            className={currentStatus({ statusOpen })}
            data-cy="current-status"
          >
            <div className={ballOpen({ statusOpen })}></div>
            <div className="w-[5rem]">
              {statusOpen === Status.OPEN ? labelOpen : labelClosed}
            </div>
            <CaretDown
              size={16}
              data-cy="arrow"
              className="ml-3 data-[state=open]:rotate-180 transition-all duration-100 w-fit"
              data-state={stateMenu}
            />
          </button>
        </DropdownMenu.Trigger>
      ) : (
        <button
          className={currentStatus({
            statusOpen: statusOpen,
            isUndoingStatus: true,
          })}
          onClick={handleBackStatus}
        >
          <div className="">
            {statusOpen === Status.OPEN ? labelOpen : labelClosed}
          </div>
        </button>
      )}

      <DropdownMenu.Content className={container()}>
        <button
          data-cy="choice-status"
          className={currentStatus({
            statusOpen: inverseStatus,
          })}
          onClick={handleChangeStatus}
        >
          <div className={ballOpen({ statusOpen: inverseStatus })}></div>
          {inverseStatus === Status.OPEN ? "Loja aberta" : "Loja fechada"}
        </button>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
