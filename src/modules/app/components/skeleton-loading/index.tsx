import { tv } from "tailwind-variants";

const skeletonStyle = tv({
  base: "bg-gray-800 h-4 w-10 rounded animate-pulse",
});

export function Skeleton({ className }: { className?: string }) {
  return <div className={skeletonStyle({ className: className })} />;
}
