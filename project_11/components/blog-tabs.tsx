"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Layers } from "lucide-react";
import type { BlogCategory } from "@/lib/types";
import { getBlogCategories } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogTabsProps {
  onCategoryChange: (categoryId: number | null) => void;
}

export function BlogTabs({ onCategoryChange }: BlogTabsProps) {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data } = await getBlogCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  const handleCategoryChange = (categoryId: number | null) => {
    setActiveCategory(categoryId);
    onCategoryChange(categoryId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-24 rounded-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="relative mb-8 overflow-x-auto">
      <div className="flex flex-nowrap md:flex-wrap items-center justify-start md:justify-center gap-2 md:gap-4 px-4 min-w-full pb-4 md:pb-0">
        <button
          onClick={() => handleCategoryChange(null)}
          className={cn(
            "relative flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full transition-all duration-300 whitespace-nowrap",
            activeCategory === null
              ? "bg-[#48D1CC] text-white"
              : "text-gray-900 dark:text-gray-100 hover:bg-[#48D1CC]/10"
          )}
        >
          <Layers className="w-4 h-4" />
          <span className="font-medium">All</span>
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={cn(
              "relative flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full transition-all duration-300 whitespace-nowrap",
              activeCategory === category.id
                ? "bg-[#48D1CC] text-white"
                : "text-gray-900 dark:text-gray-100 hover:bg-[#48D1CC]/10"
            )}
          >
            <span className="font-medium">{category.blog_category_name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}