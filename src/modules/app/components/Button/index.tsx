import { ButtonHTMLAttributes } from "react";
import { VariantProps, tv } from "tailwind-variants";
import { Spinner } from "../Spinner";
import { Icon } from "@phosphor-icons/react";

const button = tv({
  slots: {
    container: [
      "h-10 w-full rounded-xl",
      "font-outfit font-bold text-sm",
      "transition-all px-1",
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
      success: {
        container: [
          "bg-transparent text-green-primary-dark hover:bg-success-green-dark",
          "border border-green-primary-dark",
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
    VariantProps<typeof button> {
  isLoading?: boolean;
  startIcon?: Icon;
  endIcon?: Icon;
}

export function Button({
  variant,
  children,
  disabled,
  isLoading,
  startIcon: StartIcon,
  endIcon: EndIcon,
  className,
  ...rest
}: ButtonProps) {
  const { container } = button();

  return (
    <button
      disabled={disabled}
      {...rest}
      className={container({ variant, disabled, className })}
    >
      <div className="flex items-center justify-center gap-2">
        {StartIcon && !isLoading && <StartIcon size={20} />}
        {isLoading && <Spinner />}
        {children}
        {EndIcon && !isLoading && <EndIcon size={20} />}
      </div>
    </button>
  );
}
