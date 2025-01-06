"use client";

import { useState } from "react";
import { BlogTabs } from "./blog-tabs";
import { BlogCard } from "./blog-card";
import { BlogSearch } from "./blog-search";
import { NoRecords } from "./no-records";
import { getBlogPosts } from "@/lib/api";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "@/lib/types";

interface BlogCategoryFilterProps {
  initialPosts: BlogPost[];
}

export function BlogCategoryFilter({ initialPosts }: BlogCategoryFilterProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryChange = async (categoryId: number | null) => {
    setLoading(true);
    try {
      const { data } = await getBlogPosts(categoryId || undefined);
      setPosts(data);
      setSearchQuery(""); // Clear search when changing category
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchResults: BlogPost[], query: string) => {
    setPosts(searchResults);
    setSearchQuery(query);
  };

  const handleClearSearch = async () => {
    setLoading(true);
    try {
      const { data } = await getBlogPosts();
      setPosts(data);
      setSearchQuery("");
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BlogSearch onSearch={handleSearch} />
      {searchQuery && (
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-sm text-muted-foreground">
            Showing results for: <span className="font-medium text-foreground">{searchQuery}</span>
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={handleClearSearch}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        </div>
      )}
      <BlogTabs onCategoryChange={handleCategoryChange} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
        {loading ? (
          [...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 dark:bg-gray-800 rounded-lg h-64"></div>
            </div>
          ))
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))
        ) : (
          <NoRecords message="No articles match your search" />
        )}
      </div>
    </>
  );
}