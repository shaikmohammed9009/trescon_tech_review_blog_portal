import { getBlogPosts } from "@/lib/api";
import { BlogCategoryFilter } from "@/components/blog-category-filter";

export default async function Home() {
  const { data: posts } = await getBlogPosts();

  return (
    <div className="max-w-7xl mx-auto">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 gradient-text">
          Welcome to #TresconTechReview
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover insightful articles and stay updated with the latest news and trends.
        </p>
      </section>

      <BlogCategoryFilter initialPosts={posts} />
    </div>
  );
}