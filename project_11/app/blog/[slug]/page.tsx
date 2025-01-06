import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { ShareButton } from "@/components/share-button";
import { Button } from "@/components/ui/button";
import { getBlogPosts } from "@/lib/api";
import type { BlogPost } from "@/lib/types";

interface Props {
  params: { slug: string }
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const { data: posts } = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug_url,
  }));
}

async function getBlogPost(slug: string): Promise<BlogPost> {
  const { data } = await getBlogPosts();
  const post = data.find(post => post.slug_url === slug);
  
  if (!post) {
    throw new Error("Blog post not found");
  }

  return post;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPost({ params }: Props) {
  const post = await getBlogPost(params.slug);

  return (
    <article className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/" className="flex items-center space-x-2">
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </Button>
      </div>

      <div className="aspect-video relative rounded-lg overflow-hidden">
        <Image
          src={post.featured_image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <header className="space-y-4">
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <div className="flex items-center justify-between">
          <time className="text-sm text-muted-foreground">
            {new Date(post.date_created).toLocaleDateString()}
          </time>
          <ShareButton title={post.title} url={`/blog/${post.slug_url}`} />
        </div>
      </header>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        {post.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}