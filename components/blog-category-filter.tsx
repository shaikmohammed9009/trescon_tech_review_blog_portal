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
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialPosts.length === 6);
  const [currentCategoryId, setCurrentCategoryId] = useState<number | null>(null);

  const handleCategoryChange = async (categoryId: number | null) => {
    setLoading(true);
    setCurrentPage(1); // Reset page number
    setCurrentCategoryId(categoryId);
    
    try {
      const { data } = await getBlogPosts(categoryId || undefined, 1);
      setPosts(data); // Completely replace posts instead of merging
      setHasMore(data.length === 6);
      setSearchQuery(""); // Clear search when changing category
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (loadingMore) return;
    
    setLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const { data } = await getBlogPosts(currentCategoryId || undefined, nextPage);
      
      // Ensure no duplicate posts by checking IDs
      const existingIds = new Set(posts.map(post => post.id));
      const newPosts = data.filter(post => !existingIds.has(post.id));
      
      setPosts(prev => [...prev, ...newPosts]);
      setCurrentPage(nextPage);
      setHasMore(data.length === 6);
    } catch (error) {
      console.error('Error loading more posts:', error);
      setHasMore(false);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleSearch = (searchResults: BlogPost[], query: string) => {
    setPosts(searchResults);
    setSearchQuery(query);
    setHasMore(false); // Disable load more during search
    setCurrentPage(1); // Reset page number
  };

  const handleClearSearch = async () => {
    setLoading(true);
    setCurrentPage(1); // Reset page number
    
    try {
      const { data } = await getBlogPosts(currentCategoryId || undefined, 1);
      setPosts(data);
      setHasMore(data.length === 6);
      setSearchQuery("");
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
      setHasMore(false);
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [...Array(6)].map((_, i) => (
            <div key={`skeleton-${i}`} className="animate-pulse">
              <div className="bg-gray-200 dark:bg-gray-800 rounded-lg aspect-[16/9]"></div>
              <div className="space-y-3 mt-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
              </div>
            </div>
          ))
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <BlogCard key={`${post.id}-${currentCategoryId}`} post={post} />
          ))
        ) : (
          <div className="col-span-full">
            <NoRecords message="No articles match your search" />
          </div>
        )}
      </div>
      
      {hasMore && !searchQuery && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="min-w-[200px] bg-gradient-to-r from-teal-400 to-teal-500 text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:from-teal-500 hover:to-teal-600 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            {loadingMore ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </>
  );
}