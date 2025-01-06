"use client";

import { FileQuestion } from "lucide-react";

interface NoRecordsProps {
  message?: string;
}

export function NoRecords({ message = "No records found" }: NoRecordsProps) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-[#48D1CC]/10 p-6 rounded-full mb-4">
        <FileQuestion className="h-12 w-12 text-[#48D1CC]" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{message}</h3>
      <p className="text-muted-foreground text-center max-w-md">
        We couldn't find any articles matching your criteria. Try adjusting your search or filters.
      </p>
    </div>
  );
}