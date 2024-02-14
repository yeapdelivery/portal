"use client";

import { VariantProps, tv } from "tailwind-variants";
import { ReactNode, forwardRef, useState } from "react";
import InputMask from "react-input-mask";

const input = tv({
  slots: {
    container: [
      "border border-gray-700 h-10 rounded-xl w-full",
      "bg-white flex items-center gap-1.5 px-2",
      "font-inter text-sm",
    ],
    inputStyle:
      "w-full min-h-full bg-transparent outline-none placeholder:text-gray-500 placeholder:text-xs",
  },

  variants: {
    isFocus: {
      true: {
        container: ["border-[#7B58FF]"],
      },
    },
  },
});

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof input> {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  mask?: string;
  customHeight?: string;
  onInputFocus?(): void;
  onInputBlur?(): void;
  onInputClick?(): void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      startIcon,
      endIcon,
      mask,
      className,
      onInputFocus,
      onInputBlur,
      onInputClick,
      ...props
    },
    ref
  ) => {
    const [isFocus, setIsFocus] = useState(false);
    const { container, inputStyle } = input({ isFocus });

    function handleFocus() {
      setIsFocus(true);
      onInputFocus && onInputFocus();
    }

    function handleBlur() {
      setIsFocus(false);
      onInputBlur && onInputBlur();
    }

    function handleClick() {
      onInputClick && onInputClick();
    }

    return (
      <div
        data-cy="container-input"
        className={container({ className })}
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {startIcon && startIcon}
        <InputMask
          mask={mask}
          maskPlaceholder=""
          type="text"
          {...props}
          className={inputStyle()}
          ref={ref}
        />
        {endIcon && endIcon}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
