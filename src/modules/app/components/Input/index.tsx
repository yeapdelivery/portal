import { VariantProps, tv } from "tailwind-variants";
import { Filed } from "../Filed";

const input = tv({
  slots: {
    container: [
      "border border-gray-800 h-10 rounded-xl w-full",
      "bg-gray-1000 px-2",
      "focus:border-[#7B58FF] outline-none",
      "font-inter text-sm",
      "placeholder:text-gray-500 placeholder:text-xs",
    ],
  },
});

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof input> {}

export function Input({ ...rest }: InputProps) {
  const { container } = input();

  return <input type="text" {...rest} className={container()} />;
}
