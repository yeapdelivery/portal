"use client";

import { VariantProps, tv } from "tailwind-variants";
import { forwardRef, useState } from "react";

const input = tv({
  slots: {
    container: [
      "border border-gray-700 rounded-xl w-full h-36",
      "bg-white flex items-center  p-2",
      "font-inter text-sm bg-gray-1000",
      "bg-gray-1000 outline-none",
      "placeholder:text-gray-500 placeholder:text-xs resize-none m-0",
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

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof input> {
  customHeight?: string;
  onInputFocus?(): void;
  onInputBlur?(): void;
  onInputClick?(): void;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, onInputFocus, onInputBlur, onInputClick, ...rest }, ref) => {
    const [isFocus, setIsFocus] = useState(false);
    const { container } = input({ isFocus });

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
      <textarea
        data-test="container-textArea"
        className={container({ className })}
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={ref}
        {...rest}
      ></textarea>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
