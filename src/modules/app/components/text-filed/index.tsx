import { ReactNode } from "react";
import { Filed, Input } from "@/modules/app/components/";

interface TextFiledProps {
  htmlFor: string;
  label?: string;
  error: string | null;
  children: ReactNode;
}

export function TextFiled({ error, htmlFor, label, children }: TextFiledProps) {
  return (
    <Filed error={error} htmlFor={htmlFor} label={label}>
      {children}
    </Filed>
  );
}

TextFiled.Input = Input;
