import { ReactNode } from "react";
import Filed from "@/modules/app/components/filed";
import Input from "@/modules/app/components/input";

interface TextFiledProps {
  htmlFor: string;
  label?: string;
  error: string | null;
  children: ReactNode;
}

export default function TextFiled({
  error,
  htmlFor,
  label,
  children,
}: TextFiledProps) {
  return (
    <Filed error={error} htmlFor={htmlFor} label={label}>
      {children}
    </Filed>
  );
}

TextFiled.Input = Input;
