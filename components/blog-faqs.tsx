"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FAQ } from "@/lib/types";

interface BlogFAQsProps {
  faqs: FAQ[];
}

export function BlogFAQs({ faqs }: BlogFAQsProps) {
  if (!faqs.length) return null;

  return (
    <section className="mt-12 border-t pt-8">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`faq-${index}`}
            className="border rounded-lg px-4"
          >
            <AccordionTrigger className="text-left hover:text-[var(--tab-active)] transition-colors">
              {faq.faq_question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.faq_answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}