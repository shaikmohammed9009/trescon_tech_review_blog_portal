"use client";

import { useState, useEffect } from 'react';
import type { BlogPost } from '@/app/types/blog';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<BlogPost[]>([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('bookmarks');
    if (stored) {
      try {
        setBookmarks(JSON.parse(stored));
      } catch (e) {
        console.error('Error parsing bookmarks:', e);
      }
    }
    setInitialized(true);
  }, []);

  const toggleBookmark = (post: BlogPost) => {
    setBookmarks(current => {
      const exists = current.some(b => b.id === post.id);
      const updated = exists
        ? current.filter(b => b.id !== post.id)
        : [...current, post];
      
      localStorage.setItem('bookmarks', JSON.stringify(updated));
      return updated;
    });
  };

  const isBookmarked = (postId: number) => {
    return bookmarks.some(b => b.id === postId);
  };

  return { bookmarks, toggleBookmark, isBookmarked, initialized };
}