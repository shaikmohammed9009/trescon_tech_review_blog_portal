import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Skeleton className="h-8 w-32" />
      <Skeleton className="aspect-video w-full rounded-lg" />
      <div className="space-y-4">
        <Skeleton className="h-12 w-3/4" />
        <div className="flex justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}