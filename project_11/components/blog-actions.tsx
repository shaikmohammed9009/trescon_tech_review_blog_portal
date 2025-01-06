"use client";

import { Heart, MessageCircle, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogActionsProps {
  likes: number;
  comments: number;
}

export function BlogActions({ likes, comments }: BlogActionsProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="hover:text-primary">
          <Heart className="h-5 w-5 mr-1" />
          {likes}
        </Button>
        <Button variant="ghost" size="sm" className="hover:text-primary">
          <MessageCircle className="h-5 w-5 mr-1" />
          {comments}
        </Button>
      </div>
      <Button variant="ghost" size="icon" className="hover:text-primary">
        <Bookmark className="h-5 w-5" />
      </Button>
    </div>
  );
}