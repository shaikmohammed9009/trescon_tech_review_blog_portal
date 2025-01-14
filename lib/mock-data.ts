import { BlogPost } from "@/app/types/blog";

export const mockPosts: BlogPost[] = [
  {
    id: 1,
    status: "published",
    title: "The Future of AI in Enterprise",
    description: "Exploring how artificial intelligence is transforming business operations and decision-making.",
    content: "Artificial intelligence is revolutionizing how enterprises operate...",
    featured_image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    slug_url: "future-of-ai-enterprise",
    date_created: "2024-02-10T08:00:00.000Z",
    date_updated: "2024-02-10T08:00:00.000Z",
    category: "ai"
  },
  {
    id: 2,
    status: "published",
    title: "Blockchain in Supply Chain",
    description: "How blockchain technology is revolutionizing supply chain management.",
    featured_image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&h=600&fit=crop",
    slug_url: "blockchain-supply-chain",
    content: "Blockchain technology is transforming supply chain management...",
    date_created: "2024-02-09T10:00:00.000Z",
    date_updated: "2024-02-09T10:00:00.000Z",
    category: "blockchain"
  },
  {
    id: 3,
    status: "published",
    title: "Zero Trust Security Model",
    description: "Understanding the principles of Zero Trust architecture.",
    featured_image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
    slug_url: "zero-trust-security",
    content: "The Zero Trust security model is becoming increasingly important...",
    date_created: "2024-02-08T15:00:00.000Z",
    date_updated: "2024-02-08T15:00:00.000Z",
    category: "security"
  },
  {
    id: 4,
    status: "published",
    title: "Digital Transformation Strategy",
    description: "Key considerations for CIOs leading digital transformation initiatives.",
    featured_image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    slug_url: "digital-transformation-strategy",
    content: "Digital transformation requires a comprehensive strategy...",
    date_created: "2024-02-07T09:00:00.000Z",
    date_updated: "2024-02-07T09:00:00.000Z",
    category: "cio"
  }
];