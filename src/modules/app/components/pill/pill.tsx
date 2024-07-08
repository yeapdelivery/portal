import { VariantProps, tv } from "tailwind-variants";
import { Plus, X } from "@phosphor-icons/react";

const pill = tv({
  slots: {
    container: [
      "px-2 py-1 rounded border w-fit flex items-center gap-1 text-base",
      "font-semibold bg-transparent border-red-default text-red-default ",
    ],
  },

  variants: {
    hasAction: {
      true: {},
    },
  },

  defaultVariants: {
    hasAction: false,
  },
});

interface VariantsPillProps extends VariantProps<typeof pill> {}

interface PillProps extends Omit<VariantsPillProps, "hasDescription"> {
  closable?: boolean;
  label: string;
  description?: string;
  className?: string;
  onClose?: () => void;
  action?: () => void;
}

function getELementName(
  hasAction: boolean,
  closable: boolean
): "button" | "div" {
  switch (hasAction) {
    case true:
      return !closable ? "button" : "div";
    default:
      return "div";
  }
}

export function Pill({
  label,
  hasAction,
  closable,
  className,
  onClose,
  action,
}: PillProps) {
  const { container } = pill({ hasAction });

  const Element = getELementName(Boolean(hasAction), Boolean(closable));

  return (
    <Element
      className={container({ className })}
      onClick={() => {
        if (action) {
          action();
        }
      }}
    >
      <div>
        <span data-testid="pill-label">{label}</span>
      </div>

      {closable && (
        <button type="button" onClick={onClose} data-testid="pill-close">
          <X size={14} />
        </button>
      )}
    </Element>
  );
}
