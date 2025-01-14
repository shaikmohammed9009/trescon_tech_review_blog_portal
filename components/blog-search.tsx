"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "@/lib/types";

interface BlogSearchProps {
  onSearch: (results: BlogPost[], query: string) => void;
}

export function BlogSearch({ onSearch }: BlogSearchProps) {
  const [searchInput, setSearchInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchInput.trim()) {
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/items/blog_posts?fields=*,content_type.content_type_name,category.id,category.blog_category_name&filter[title][_icontains]=${encodeURIComponent(searchInput)}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      
      const { data } = await response.json();
      onSearch(data || [], searchInput.trim());
    } catch (error) {
      console.error('Error searching posts:', error);
      onSearch([], searchInput.trim());
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isSearching) {
      handleSearch();
    }
  };

  return (
    <div className="flex gap-2 max-w-md mx-auto mb-8">
      <div className="relative flex-1">
        <Input
          type="search"
          placeholder="Search articles..."
          className="pl-10"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isSearching}
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>
      <Button 
        onClick={handleSearch}
        disabled={isSearching || !searchInput.trim()}
      >
        {isSearching ? 'Searching...' : 'Search'}
      </Button>
    </div>
  );
}