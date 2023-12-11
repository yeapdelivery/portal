import { ButtonHTMLAttributes } from "react";
import { VariantProps, tv } from "tailwind-variants";

const button = tv({
  slots: {
    container: [
      "h-10 w-full rounded-xl",
      "font-outfit font-bold text-sm",
      "transition-all",
    ],
  },

  variants: {
    variant: {
      primary: {
        container: [
          "bg-red-default text-white hover:bg-red-primary-dark ",
          "active:animate-pulse-click",
        ],
      },
      secondary: {
        container: [
          "bg-transparent text-red-default hover:bg-red-default hover:text-white",
          "border border-red-default",
          "active:animate-pulse-click",
        ],
      },
      check: {
        container: [
          "bg-green-default text-white hover:bg-green-primary-dark",
          "active:animate-pulse-click",
        ],
      },
      error: {
        container: [
          "bg-error-default text-white  hover:bg-error-red-dark",
          "active:animate-pulse-click",
        ],
      },
    },

    disabled: {
      true: {
        container: [
          "bg-gray-1000 hover:bg-gray-1000 text-gray-500",
          "cursor-not-allowed select-none active:animate-none",
        ],
      },
    },
  },

  defaultVariants: {
    variant: "primary",
  },
});

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export function Button({ variant, disabled, ...rest }: ButtonProps) {
  const { container } = button();

  return (
    <button
      {...rest}
      disabled={disabled}
      className={container({ variant, disabled })}
    />
  );
}
