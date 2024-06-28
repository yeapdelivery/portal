import { ReactNode } from "react";
import Filed from "@/modules/app/components/filed";
import Input from "@/modules/app/components/input";

interface TextFiledProps extends React.HTMLProps<HTMLDivElement> {
  htmlFor?: string;
  label?: string;
  error: string | null;
  required?: boolean;
  children: ReactNode;
}

export default function TextFiled({
  error,
  htmlFor,
  label,
  required,
  children,
  ...rest
}: TextFiledProps) {
  return (
    <Filed
      {...rest}
      error={error}
      htmlFor={htmlFor}
      label={label}
      required={required}
    >
      {children}
    </Filed>
  );
}

TextFiled.Input = Input;
