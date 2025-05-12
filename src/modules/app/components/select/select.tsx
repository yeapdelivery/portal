import { RefObject, forwardRef, useEffect, useRef, useState } from "react";
import { Combobox, ComboboxList, ComboboxProvider } from "@ariakit/react";
import * as RadixPopover from "@radix-ui/react-popover";
import { tv } from "tailwind-variants";
import { SelectOptions } from "./types";
import { CaretDown, Icon } from "@phosphor-icons/react";
import { SelectOption } from "./select-option";

export interface SelectProps {
  startIcon?: Icon;
  options: SelectOptions[];
  disabled?: boolean;
  defaultValue?: string;
  readonly?: boolean;
  onSelected?: (option: SelectOptions) => void;
}

const select = tv({
  slots: {
    content: [
      "data-[state=open]:animate-fade-in-dropdown",
      "data-[state=closed]:animate-fade-out-dropdown",
    ],
    containerInput: [
      "border border-gray-700 h-10 rounded-xl w-full",
      "bg-gray-1000 flex items-center gap-1.5 px-2",
      "font-inter text-sm",
    ],
    inputStyle: [
      "w-full min-h-full bg-transparent outline-none",
      "placeholder:text-gray-500 placeholder:text-xs text-gray-100",
    ],
    containerList: [
      "w-[var(--radix-popover-trigger-width)] -mt-[8px] bg-white",
      "shadow-select border-r border-l border-b border-gray-400",
      "rounded-b-lg border-t-0",
      "max-h-[165px] overflow-y-auto",
    ],
  },

  variants: {
    isOpen: {
      true: {
        containerInput: [
          "border-blue-default bg-gray-1000]",
          "rounded-none rounded-t-xl",
        ],
      },
    },

    disabled: {
      true: {
        containerInput: ["bg-gray-700 text-gray-500"],
      },
    },
  },
});

const Select = forwardRef<HTMLInputElement, SelectProps>(
  (
    {
      startIcon,
      options: optionsProps,
      disabled,
      defaultValue,
      readonly = true,
      onSelected,
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<SelectOptions[]>(optionsProps);
    const [selectedOption, setSelectedOption] = useState<SelectOptions | null>(
      null
    );
    const [value, setValue] = useState<string>(defaultValue || "");
    const [itemFocused, setItemFocused] = useState<string>("");
    const listboxRef = useRef<HTMLDivElement>(null);

    const { containerList, content, containerInput, inputStyle } = select({
      isOpen: open,
    });

    const state = open ? "open" : "closed";

    useEffect(() => {
      if (defaultValue) {
        setValue(defaultValue);
      }
    }, [defaultValue]);

    useEffect(() => {
      if (optionsProps) {
        setOptions(optionsProps);
      }
    }, [optionsProps]);

    useEffect(() => {
      if (disabled) {
        setValue("");
      } else {
        if (selectedOption?.id) {
          setValue(selectedOption.title);
          return;
        }

        if (defaultValue) {
          setValue(defaultValue);
          return;
        }
      }
    }, [disabled]);

    useEffect(() => {
      if (defaultValue && !selectedOption?.id) {
        setValue(defaultValue);
      }
    }, [open, defaultValue, selectedOption]);

    function searchOption(query: string): void {
      setValue(query);

      if (query.trim() === "") {
        setOptions(optionsProps);
        return;
      }

      const newOptions = optionsProps.filter((option) =>
        option.title
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036F]/g, "")
          .includes(
            query
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036F]/g, "")
          )
      );

      setOptions(newOptions);
    }

    function onFocused(option: SelectOptions) {
      if (option.subTitle) {
        setItemFocused(option.value);
        return;
      }

      setItemFocused("");
    }

    function onSelectedOption(option: SelectOptions) {
      setSelectedOption(option);
      setOptions(optionsProps);
      setValue(option.title);
      setOpen(false);
      onSelected && onSelected(option);
    }

    return (
      <RadixPopover.Root
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setValue(selectedOption?.title || "");
          }

          setOpen(isOpen);
        }}
      >
        <ComboboxProvider open={open} setOpen={setOpen}>
          <RadixPopover.Anchor asChild>
            <div className={containerInput({ disabled })}>
              <div className="flex items-center gap-3 flex-1">
                {startIcon && (
                  <button>
                    {/* <Icon icon={startIcon} className="text-gray-400" /> */}
                  </button>
                )}
                <Combobox
                  ref={ref}
                  value={value}
                  placeholder="Selecione uma opção"
                  className={inputStyle()}
                  disabled={disabled}
                  onChange={(event) => searchOption(event.target.value)}
                  readOnly={readonly}
                />
              </div>
              <button
                data-state={state}
                disabled={disabled}
                className="data-[state=open]:rotate-180 transition-all duration-200"
                onClick={() => setOpen((oldValue) => !oldValue)}
              >
                <CaretDown size={16} className="text-gray-500" />
              </button>
            </div>
          </RadixPopover.Anchor>
          <RadixPopover.Content
            asChild
            sideOffset={8}
            className={content()}
            onOpenAutoFocus={(event) => event.preventDefault()}
            onInteractOutside={(event) => {
              const target = event.target as Element | null;
              const combobox = ref as RefObject<HTMLInputElement>;
              const isCombobox = target === combobox?.current;
              const inListbox = target && listboxRef.current?.contains(target);
              if (isCombobox || inListbox) {
                event.preventDefault();
              }
            }}
          >
            <ComboboxList
              ref={listboxRef}
              role="listbox"
              className={containerList()}
            >
              {options.map((option, index, originalArray) => (
                <SelectOption
                  key={option.value}
                  option={option}
                  isLast={index === originalArray.length - 1}
                  selected={selectedOption?.value === option.value}
                  itemFocused={itemFocused}
                  onFocused={onFocused}
                  setItemFocused={setItemFocused}
                  onSelectedOption={onSelectedOption}
                />
              ))}
            </ComboboxList>
          </RadixPopover.Content>
        </ComboboxProvider>
      </RadixPopover.Root>
    );
  }
);

Select.displayName = "Select";

export default Select;
