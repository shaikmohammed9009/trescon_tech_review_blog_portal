"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { BlogSocial } from "@/components/blog-social";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate, truncateText } from "@/lib/utils";
import type { BlogPost } from "@/lib/types";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="group h-full overflow-hidden border border-[#40E0D0]/20 dark:border-[#40E0D0]/10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-xl hover:shadow-[#40E0D0]/10 transition-all duration-300">
        <div className="p-4 flex flex-col h-full">
          <Link href={`/blog/${post.slug_url}`}>
            <div className="aspect-[16/9] relative overflow-hidden rounded-lg mb-4">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/assets/${post.featured_image}`}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Link>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-[#48D1CC]/10 text-[#48D1CC]">
              <span>{post.content_type.content_type_name}</span>
            </div>
            <time className="text-sm text-muted-foreground">
              {formatDate(post.date_created)}
            </time>
          </div>

          <Link href={`/blog/${post.slug_url}`} className="flex-grow">
            <h2 className="text-xl font-semibold leading-tight mb-3 group-hover:text-[#40E0D0] transition-colors">
              {truncateText(post.title, 30)}
            </h2>
            <p className="text-muted-foreground mb-4">
              {truncateText(post.description, 70)}
            </p>
          </Link>

          <div className="border-t border-gray-100 dark:border-gray-800 pt-4 mt-auto">
            <div className="flex items-center justify-between">
              <BlogSocial slug={post.slug_url} title={post.title} />
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-[#40E0D0] hover:bg-[#48D1CC] hover:text-white transition-colors"
              >
                <Link href={`/blog/${post.slug_url}`} className="flex items-center gap-2">
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}