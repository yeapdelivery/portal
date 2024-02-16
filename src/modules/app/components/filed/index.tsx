import { ReactNode } from "react";
import { tv } from "tailwind-variants";

const filed = tv({
  slots: {
    label: "font-outfit font-medium text-sm",
    error: "text-red-default text-xs ml-2",
  },
});

interface FiledProps {
  label: string;
  htmlFor: string;
  children: ReactNode;
  error: string | null;
  required?: boolean;
}

export default function Filed({
  label,
  htmlFor,
  required,
  error,
  children,
}: FiledProps) {
  const { error: errorStyle, label: labelStyle } = filed();

  return (
    <div>
      <label htmlFor={htmlFor} className={labelStyle()}>
        {label} {required && <span className="text-error-default">*</span>}
      </label>

      <div>{children}</div>

      {error && (
        <span className={errorStyle()}>
          <strong>Erro:</strong> {error}
        </span>
      )}
    </div>
  );
}
