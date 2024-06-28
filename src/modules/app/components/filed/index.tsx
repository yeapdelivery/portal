import { ReactNode } from "react";
import { tv } from "tailwind-variants";
import { ErrorMessage } from "../error-message";

const filed = tv({
  slots: {
    container: "",
    label: "font-outfit font-medium text-sm",
    error: "text-red-default text-xs ml-2",
  },
});

interface FiledProps extends React.HTMLProps<HTMLDivElement> {
  label: string;
  htmlFor?: string;
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
  className,
  ...rest
}: FiledProps) {
  const { container, error: errorStyle, label: labelStyle } = filed();

  return (
    <div {...rest} className={container({ className })}>
      <label htmlFor={htmlFor} className={labelStyle()}>
        {label} {required && <span className="text-error-default">*</span>}
      </label>

      <div>{children}</div>

      {error && <ErrorMessage message={error} />}
    </div>
  );
}
