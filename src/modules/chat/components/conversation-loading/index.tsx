import { Skelton } from "@/modules/app/components/skeleton-loading";

export function ConversationLoading() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="space-y-4">
          <div className="flex items-center justify-start">
            <Skeleton className="w-[70%] h-10" />
          </div>
          <div className="flex items-center justify-start">
            <Skeleton className="w-[50%] h-20" />
          </div>
          <div className="flex items-center justify-end">
            <Skeleton className="w-[70%] h-10" />
          </div>
        </div>
      ))}
    </div>
  );
}
