"use client";

import { useState, useEffect } from "react";
import { Twitter, Facebook, Linkedin, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BlogSocialProps {
  slug: string;
  title: string;
}

export function BlogSocial({ slug, title }: BlogSocialProps) {
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    setShareUrl(`${window.location.origin}/blog/${slug}`);
  }, [slug]);
  
  const socialLinks = [
    {
      name: "Twitter",
      icon: Twitter,
      href: shareUrl ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}` : undefined,
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: shareUrl ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` : undefined,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: shareUrl ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}` : undefined,
    },
    {
      name: "Copy Link",
      icon: Link2,
      onClick: () => shareUrl && navigator.clipboard.writeText(shareUrl),
    },
  ];

  return (
    <div className="flex items-center gap-2">
      {socialLinks.map((social) => (
        <Tooltip key={social.name}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:bg-[#48D1CC] hover:text-white transition-colors"
              onClick={social.onClick}
              {...(social.href && { as: "a", href: social.href, target: "_blank" })}
              disabled={!shareUrl}
            >
              <social.icon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{social.name}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}