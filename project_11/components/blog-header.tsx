"use client";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

interface BlogHeaderProps {
  category: string;
  author: string;
  date: string;
}

export function BlogHeader({ category, author, date }: BlogHeaderProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-4">
      <Badge 
        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all"
      >
        {category}
      </Badge>
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8 border-2 border-blue-200 dark:border-blue-800">
          <img
            src="https://github.com/shadcn.png"
            alt={author}
            className="object-cover"
          />
        </Avatar>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{author}</span>
          <span>•</span>
          <time>{formatDate(date)}</time>
        </div>
      </div>
    </div>
  );
}