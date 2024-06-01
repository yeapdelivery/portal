import { ImageSquare } from "@phosphor-icons/react";
import { tv } from "tailwind-variants";

interface EmptyImageProps {
  className?: string;
}

const emptyImage = tv({
  slots: {
    container: [
      "w-full h-full text-gray-500 bg-gray-800",
      "flex items-center justify-center rounded-xl",
    ],
  },
});

export function EmptyImage({ className }: EmptyImageProps) {
  const { container } = emptyImage();

  return (
    <div className={container({ className })}>
      <ImageSquare size={32} />
    </div>
  );
}
