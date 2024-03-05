"use client";

import { VariantProps, tv } from "tailwind-variants";
import { ReactNode, forwardRef, useCallback, useState } from "react";
import {
  currencyFormatation,
  distanceFormatation,
  timeFormatation,
} from "./masks";
import InputMask from "react-input-mask";

const input = tv({
  slots: {
    container: [
      "border border-gray-700 bg-gray-1000 h-10 rounded-xl w-full",
      "flex items-center gap-1.5 px-2",
      "font-inter text-sm",
    ],
    inputStyle: [
      "w-full min-h-full bg-transparent outline-none",
      "placeholder:text-gray-500 placeholder:text-xs",
    ],
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
  mask?: "currency" | "distance" | "time";
  prefix?: string;
  customHeight?: string;
  currency?: boolean;
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
      prefix,
      className,
      currency,
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

    const Formatation = useCallback((e: React.FormEvent<HTMLInputElement>) => {
      if (mask === "currency") {
        currencyFormatation(e);
      }

      if (mask === "distance") {
        distanceFormatation(e);
      }

      if (mask === "time") {
        timeFormatation(e);
      }
    }, []);

    return (
      <div
        data-cy="container-input"
        className={container({ className })}
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {startIcon && startIcon}
        {prefix && <span>{prefix}</span>}
        <InputMask
          maskPlaceholder=""
          type="text"
          {...props}
          onKeyUp={Formatation}
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
