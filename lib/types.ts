export interface BlogCategory {
  id: number;
  blog_category_name: string;
}

export interface BlogContentType {
  content_type_name: string;
}

export interface BlogPost {
  id: number;
  status: string;
  title: string;
  description: string;
  content: string;
  featured_image: string;
  slug_url: string;
  date_created: string;
  date_updated: string;
  content_type: BlogContentType;
  category: BlogCategory;
}

export interface ApiResponse<T> {
  data: T[];
}

export interface FAQ {
  faq_question: string;
  faq_answer: string;
}

export interface ChartPayloadItem {
  name?: string;
  dataKey?: string;
  color?: string;
  payload?: {
    fill?: string;
  };
}