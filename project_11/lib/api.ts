import type { BlogPost, BlogCategory, ApiResponse } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL environment variable is not set');
}

async function fetchWithTimeout(url: string, options: RequestInit = {}) {
  const timeout = 5000;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      next: { revalidate: 3600 },
    });
    clearTimeout(id);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response;
  } catch (error) {
    clearTimeout(id);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch: ${error.message}`);
    }
    throw error;
  }
}

export async function getBlogCategories(): Promise<ApiResponse<BlogCategory>> {
  try {
    const res = await fetchWithTimeout(
      `${API_URL}/items/blog_category?fields=id,blog_category_name`
    );
    return res.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return { data: [] };
  }
}

export async function getBlogPosts(categoryId?: number): Promise<ApiResponse<BlogPost>> {
  const baseUrl = `${API_URL}/items/blog_posts?fields=*,content_type.content_type_name,category.id,category.blog_category_name`;
  const url = categoryId 
    ? `${baseUrl}&filter[category][id][_eq]=${categoryId}`
    : baseUrl;
    
  const res = await fetchWithTimeout(url);
  return res.json();
}