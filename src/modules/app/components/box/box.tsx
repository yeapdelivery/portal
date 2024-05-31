import { tv } from "tailwind-variants";

interface BoxProps {
  children: React.ReactNode;
  className?: string;
}

const box = tv({
  slots: {
    container: "p-4 border bg-white border-gray-700 rounded-2xl",
  },
});

export function Box({ children, className }: BoxProps) {
  const { container } = box();

  return <div className={container({ className })}>{children}</div>;
}
