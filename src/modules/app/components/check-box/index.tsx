"use client";

import * as CheckboxRx from "@radix-ui/react-checkbox";

import { tv } from "tailwind-variants";

interface CheckboxProps {
  checked: boolean;
  value: string;
  label?: string;
  className?: string;
  onChange?: (checked: boolean) => void;
}

const checkbox = tv({
  slots: {
    container: ["flex items-center gap-2"],
    root: [
      "h-4 w-4 data-[state=unchecked]:border",
      "data-[state=unchecked]:border-[#C7C9D9]",
      "data-[state=checked]:bg-white data-[state=checked]:border-4 rounded-full",
      "bg-[#F2F2F5] data-[state=checked]:border-red-default",
    ],
  },
});

export function Checkbox({
  value,
  checked,
  label,
  className,
  onChange,
}: CheckboxProps) {
  const { root, container } = checkbox();

  return (
    <div className={container({ className })}>
      <CheckboxRx.Root
        className={root()}
        checked={checked}
        id={value}
        value={value}
        onCheckedChange={onChange}
      >
        <CheckboxRx.Indicator></CheckboxRx.Indicator>
      </CheckboxRx.Root>
      {label && (
        <label
          data-state
          htmlFor={value}
          className="text-gray-100 text-xs font-semibold"
        >
          {label}
        </label>
      )}
    </div>
  );
}
