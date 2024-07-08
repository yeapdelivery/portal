import { Icon } from "@phosphor-icons/react";
import { VariantProps, tv } from "tailwind-variants";

const systemPillStyle = tv({
  slots: {
    container: ["text-xs px-2 py-1 rounded-lg flex items-center gap-1"],
  },

  variants: {
    variant: {
      success: {
        container: ["bg-green-200 text-green-600 border-green-500 border"],
      },
      warning: {
        container: ["bg-yellow-200 text-yellow-600 border-yellow-500 border"],
      },
      error: {
        container: ["bg-red-200 text-red-600 border-red-500 border"],
      },
      blue: {
        container: ["bg-blue-200 text-blue-600 border-blue-500 border"],
      },
    },
  },

  defaultVariants: {
    variant: "success",
  },
});

interface SystemPillProps extends VariantProps<typeof systemPillStyle> {
  children: React.ReactNode;
  startIcon?: Icon;
  endIcon?: Icon;
}

export function SystemPill({
  startIcon: StartIcon,
  endIcon: EndIcon,
  children,
  variant,
}: SystemPillProps) {
  const { container } = systemPillStyle({ variant });

  return (
    <div className={container()}>
      {StartIcon && <StartIcon size={14} />}
      {children}
      {EndIcon && <EndIcon size={14} />}
    </div>
  );
}
