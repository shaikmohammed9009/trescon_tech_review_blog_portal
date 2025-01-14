import type { BlogPost, BlogCategory, ApiResponse, FAQ } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL environment variable is not set');
}

export async function getBlogPosts(categoryId?: number, page: number = 1, limit: number = 20): Promise<ApiResponse<BlogPost>> {
  const offset = (page - 1) * limit;
  let baseUrl = `${API_URL}/items/blog_posts?fields=*,content_type.content_type_name,category.id,category.blog_category_name&limit=${limit}&offset=${offset}`;
  
  if (categoryId) {
    baseUrl += `&filter[category][id][_eq]=${categoryId}`;
  }
    
  const res = await fetch(baseUrl, { cache: 'no-store' });
  
  if (!res.ok) {
    throw new Error('Failed to fetch blog posts');
  }
  
  return res.json();
}

export async function getSingleBlogPost(slug: string): Promise<BlogPost> {
  const url = `${API_URL}/items/blog_posts?fields=*,content_type.content_type_name,category.id,category.blog_category_name&filter[slug_url][_eq]=${slug}&limit=1`;
  
  const res = await fetch(url, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch blog post');
  }

  const { data } = await res.json();
  
  if (!data || data.length === 0) {
    throw new Error('Blog post not found');
  }

  return data[0];
}

export async function getRelatedPosts(categoryId: number, currentPostId: number): Promise<BlogPost[]> {
  const url = `${API_URL}/items/blog_posts?fields=*,content_type.content_type_name,category.id,category.blog_category_name&filter[category][id][_eq]=${categoryId}&filter[id][_neq]=${currentPostId}&limit=3`;
  
  const res = await fetch(url, { cache: 'no-store' });
  
  if (!res.ok) {
    throw new Error('Failed to fetch related posts');
  }
  
  const { data } = await res.json();
  return data;
}

export async function getBlogCategories(): Promise<ApiResponse<BlogCategory>> {
  const url = `${API_URL}/items/blog_category?fields=id,blog_category_name`;
  const res = await fetch(url, { cache: 'no-store' });
  
  if (!res.ok) {
    throw new Error('Failed to fetch blog categories');
  }
  
  return res.json();
}

export async function getFAQs(): Promise<FAQ[]> {
  const url = `${API_URL}/items/faqs_list?fields=faq_question,faq_answer`;
  
  const res = await fetch(url, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch FAQs');
  }

  const { data } = await res.json();
  return data;
}