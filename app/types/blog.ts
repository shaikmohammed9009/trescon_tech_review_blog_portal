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
  category?: string;
}

export interface BlogResponse {
  data: BlogPost[];
}