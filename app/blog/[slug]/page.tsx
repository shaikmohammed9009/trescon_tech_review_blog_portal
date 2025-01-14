import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { ShareButton } from "@/components/share-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getBlogPosts, getSingleBlogPost, getRelatedPosts, getFAQs } from "@/lib/api";
import { BlogFAQs } from "@/components/blog-faqs";
import { BlogSocialFooter } from "@/components/blog-social-footer";
import EnhancedMarkdownRenderer from "@/components/EnhancedMarkdownRenderer";
import type { BlogPost } from "@/lib/types";

type Props = {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}

// This will pre-render all known blog posts at build time
export async function generateStaticParams() {
  try {
    // Fetch all posts without pagination to get all slugs
    const { data } = await getBlogPosts(undefined, 1, 1000);
    return data.map((post) => ({
      slug: post.slug_url,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getSingleBlogPost(slug);
  
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [`${process.env.NEXT_PUBLIC_API_URL}/assets/${post.featured_image}`],
    },
  };
}

export default async function BlogPost({ params, searchParams }: { params: { slug: string }, searchParams: Record<string, string | string[] | undefined> }) {
  const { slug } = await params;
  const post = await getSingleBlogPost(slug);
  const relatedPosts = await getRelatedPosts(post.category.id, post.id);
  const faqs = await getFAQs();

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <article className="flex-1 max-w-3xl">
          <div className="mb-8">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/" className="flex items-center space-x-2 border border-[#40E0D0] shadow-sm shadow-[#40E0D0] hover:bg-[#40E0D0]">
                <ChevronLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Link>
            </Button>
          </div>

          <div className="aspect-video relative rounded-lg overflow-hidden mb-8">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/assets/${post.featured_image}`}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <header className="space-y-4 mb-8">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-[var(--tab-active)]/10 text-[var(--tab-active)]">
                {post.content_type.content_type_name}
              </span>
              <time className="text-sm text-muted-foreground">
                {new Date(post.date_created).toLocaleDateString()}
              </time>
                <ShareButton title={post.title} url={`/blog/${post.slug_url}`} />
            </div>
            <h1 className="text-4xl font-bold">{post.title}</h1>
            {/* <div className="flex items-center justify-between"> */}
              {/* <p className="text-lg text-muted-foreground">{post.description}</p> */}
              {/* <ShareButton title={post.title} url={`/blog/${post.slug_url}`} /> */}
            {/* </div> */}
          </header>

          <EnhancedMarkdownRenderer content={post.content} />
          
          {/* Social Share Footer */}
          <BlogSocialFooter title={post.title} url={`/blog/${post.slug_url}`} />
        </article>

        {/* Right Sidebar with Related Posts */}
        {relatedPosts.length > 0 && (
          <aside className="lg:w-96  px-2">
            <div className="sticky top-12 space-y-6">
              <h2 className="text-xl font-bold">More from {post.category.blog_category_name}</h2>
              <div className="h-[35rem] overflow-y-auto space-y-4">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <Link href={`/blog/${relatedPost.slug_url}`}>
                      <div className="aspect-[16/9] relative">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_API_URL}/assets/${relatedPost.featured_image}`}
                          alt={relatedPost.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                            {relatedPost.content_type.content_type_name}
                          </span>
                          <time className="text-xs text-muted-foreground">
                            {new Date(relatedPost.date_created).toLocaleDateString()}
                          </time>
                        </div>
                        <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                          {relatedPost.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                          {relatedPost.description}
                        </p>
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* FAQs Section */}
      <div className="mx-auto mt-12">
        <BlogFAQs faqs={faqs} />
      </div>
    </div>
  );
}