"use client";

import { Twitter, Facebook, Linkedin, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface BlogSocialFooterProps {
  title: string;
  url: string;
}

export function BlogSocialFooter({ title, url }: BlogSocialFooterProps) {
  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}${url}` : url;

  const socialLinks = [
    {
      name: "Twitter",
      icon: Twitter,
      color: "hover:bg-[#1DA1F2] hover:border-[#1DA1F2] hover:text-white",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "hover:bg-[#4267B2] hover:border-[#4267B2] hover:text-white",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "hover:bg-[#0077B5] hover:border-[#0077B5] hover:text-white",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "Copy Link",
      icon: Link2,
      color: "hover:bg-[#0ea5e9] hover:border-[#0ea5e9] hover:text-white",
      onClick: () => {
        navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied to clipboard!");
      },
    },
  ];

  return (
    <div className="border-t border-b py-6 my-8">
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-lg font-semibold">Share this article</h3>
        <div className="flex items-center gap-3">
          {socialLinks.map((social) => (
            <Button
              key={social.name}
              variant="outline"
              size="lg"
              className={`h-12  rounded-full border-2 ${social.color} transition-all duration-300`}
              onClick={social.onClick}
              {...(social.href && {
                as: "a",
                href: social.href,
                target: "_blank",
                rel: "noopener noreferrer",
              })}
            >
              <social.icon className="h-5 w-5 text-black" />
              <span className="sr-only">Share on {social.name}</span>
            </Button>
          ))}

        </div>
      </div>
    </div>
  );
}