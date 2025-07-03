"use client";

import { checkOpenStore } from "@/utils";
import { useEffect, useState } from "react";
import { tv } from "tailwind-variants";
import { useStore } from "../../store/stores";
import { OpeningHoursVariant } from "../../models/store";

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
      [OpeningHoursVariant.OPEN]: {
        currentStatus: ["bg-[#E7F8F7] text-green-primary-dark rounded-b-lg"],
        ballOpen: ["w-1.5 h-1.5 rounded-full bg-green-primary-dark mr-2"],
      },

      [OpeningHoursVariant.CLOSED]: {
        currentStatus: ["bg-[#FEEAEC] text-primary-dark rounded-t-lg"],
        ballOpen: ["w-1.5 h-1.5 rounded-full bg-primary-dark mr-2"],
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

export default function StatusOpen() {
  const store = useStore((state) => state.store);

  const [statusOpen, setStatusOpen] = useState<OpeningHoursVariant>(
    OpeningHoursVariant.CLOSED
  );
  const { currentStatus, ballOpen } = statusOpenStyle();

  const labelOpen = "Loja aberta";

  const labelClosed = "Loja fechada";

  useEffect(() => {
    if (store.id) {
      setStatusOpen(
        checkOpenStore(store)
          ? OpeningHoursVariant.OPEN
          : OpeningHoursVariant.CLOSED
      );

      setInterval(() => {
        setStatusOpen(
          checkOpenStore(store)
            ? OpeningHoursVariant.OPEN
            : OpeningHoursVariant.CLOSED
        );
      }, 1000 * 30); // 30 seconds
    }
  }, [store.id]);

  return (
    <div className={currentStatus({ statusOpen })} data-cy="current-status">
      <div className={ballOpen({ statusOpen })}></div>
      <div className="w-[5rem] text-center">
        {statusOpen === OpeningHoursVariant.OPEN ? labelOpen : labelClosed}
      </div>
    </div>
  );
}
