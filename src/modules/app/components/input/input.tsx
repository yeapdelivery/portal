"use client";

import { VariantProps, tv } from "tailwind-variants";
import {
  LegacyRef,
  ReactNode,
  RefObject,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { currencyFormation } from "./masks";
import InputMask, { ReactInputMask } from "react-input-mask";
import { event } from "cypress/types/jquery";

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
  mask?: string | (string | RegExp)[];
  prefix?: string;
  suffix?: string;
  customHeight?: string;
  currency?: boolean;
  alwaysShowMask?: boolean;
  maskChar?: string;
  maskPlaceholder?: string;
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
      maskChar,
      maskPlaceholder,
      alwaysShowMask,
      suffix,
      onInputFocus,
      onInputBlur,
      onInputClick,
      ...props
    },
    ref
  ) => {
    const [isFocus, setIsFocus] = useState(false);
    const { container, inputStyle } = input({ isFocus });
    const inputRef = useRef<HTMLInputElement>(null);

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

    const formation = useCallback(
      (e: React.FormEvent<HTMLInputElement>) => {
        if (currency) {
          currencyFormation(e);
        }

        if (suffix) {
          let value = e.currentTarget.value;
          value = value.replace(/\D/g, "");
          value = value.replace(/^(\d*)$/, `$1${suffix}`);
          e.currentTarget.value = value;

          const cursorStart = e.currentTarget.selectionStart;
          const newCursorPosition = Math.min(
            cursorStart,
            value.length - suffix.length
          );
          e.currentTarget.setSelectionRange(
            newCursorPosition,
            newCursorPosition
          );

          return e;
        }
      },
      [currency, suffix]
    );

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
          id="input-mask"
          maskPlaceholder={maskPlaceholder ? maskPlaceholder : ""}
          alwaysShowMask={alwaysShowMask}
          type="text"
          {...props}
          mask={mask}
          onKeyUp={formation}
          className={inputStyle()}
          onBlur={(event) => {
            const value = event.currentTarget.value;

            if (suffix && value === suffix) {
              event.currentTarget.value = "";
            }

            if (prefix && value.trim() === prefix.trim()) {
              event.currentTarget.value = "";
            }
          }}
          ref={
            (ref as unknown as LegacyRef<ReactInputMask>)
              ? (ref as unknown as LegacyRef<ReactInputMask>)
              : (inputRef as unknown as LegacyRef<ReactInputMask>)
          }
        />
        {endIcon && endIcon}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
