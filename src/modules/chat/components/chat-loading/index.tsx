import { Skelton } from "@/modules/app/components/skeleton-loading";

export function ChatLoading() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between pb-4 border-b border-gray-700"
        >
          <div className="space-y-2">
            <Skelton className="w-20" />
            <Skelton />
          </div>

          <div>
            <Skelton className="w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}
