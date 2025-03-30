import { tv } from "tailwind-variants";

const skeletonStyle = tv({
  base: "bg-gray-800 h-4 w-10 rounded",
});

export function Skelton({ className }: { className?: string }) {
  return <div className={skeletonStyle({ className: className })} />;
}
