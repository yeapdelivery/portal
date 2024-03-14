import { ComboboxItem } from "@ariakit/react";
import { tv } from "tailwind-variants";
import { SelectOptions } from "./types";

interface SelectOptionProps {
  option: SelectOptions;
  isLast: boolean;
  selected: boolean;
  itemFocused: string;
  onFocused: (option: SelectOptions) => void;
  setItemFocused: (value: string) => void;
  onSelectedOption: (option: SelectOptions) => void;
}

const select = tv({
  slots: {
    option: [
      "bg-gray-1000 data-[active-item]:bg-gray-800 border-b border-blue-default",
      "p-2 data-[active-item]:font-semibold text-gray-100",
      "hover:text-gray-100 hover:bg-gray-800 hover:font-semibold",
      "group",
    ],
    subTitle: ["text-gray-500 text-xs", "group-hover:font-semibold"],
  },

  variants: {
    isLast: {
      true: {
        option: "rounded-b-lg border-b",
      },
    },
    selected: {
      true: {
        option: "bg-gray-800 font-semibold",
        subTitle: "font-semibold",
      },
    },
    isSubtitleFocus: {
      true: {
        subTitle: "font-semibold",
      },
    },
  },

  defaultVariants: {
    isFist: false,
    isLast: false,
  },
});

export function SelectOption({
  option,
  isLast,
  selected,
  itemFocused,
  onFocused,
  setItemFocused,
  onSelectedOption,
}: SelectOptionProps) {
  const { option: optionStyle, subTitle } = select();

  return (
    <ComboboxItem
      key={option.value}
      onFocus={() => onFocused(option)}
      onBlur={() => setItemFocused("")}
      className={optionStyle({
        isLast: isLast,
        selected: selected,
      })}
      value={option.value}
      onClick={(event) => {
        event.preventDefault();
        onSelectedOption(option);
      }}
    >
      <div className="flex flex-col">
        <span>{option.title}</span>
        <span
          className={subTitle({
            isSubtitleFocus: itemFocused === option.value,
            selected: selected,
          })}
        >
          {option.subTitle}
        </span>
      </div>
    </ComboboxItem>
  );
}
