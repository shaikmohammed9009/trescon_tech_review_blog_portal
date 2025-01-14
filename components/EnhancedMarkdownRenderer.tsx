import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import 'highlight.js/styles/github.css';

interface Props {
  content: string;
}

const customComponents = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-3xl font-bold mt-6 mb-4">{children}</h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl font-semibold mt-5 mb-3">{children}</h2>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-base leading-7 mb-4">{children}</p>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-4">
      {children}
    </blockquote>
  ),
  ul: ({ children }: { children: React.ReactNode }) => <ul className="list-disc list-inside mb-4">{children}</ul>,
  ol: ({ children }: { children: React.ReactNode }) => <ol className="list-decimal list-inside mb-4">{children}</ol>,
  code: ({
    inline,
    children,
    className,
  }: {
    inline?: boolean;
    children: React.ReactNode;
    className?: string;
  }) => {
    if (inline) {
      return <code className="bg-gray-100 rounded px-1 py-0.5">{children}</code>;
    }
    return (
      <pre className={`p-4 overflow-x-auto bg-gray-900 text-white rounded ${className || ''}`}>
        <code>{children}</code>
      </pre>
    );
  },
  img: ({ src, alt }: { src?: string; alt?: string }) => (
    <img src={src} alt={alt} className="rounded-lg shadow-lg my-4 w-full object-cover" />
  ),
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
      {children}
    </a>
  ),
};

const EnhancedMarkdownRenderer: React.FC<Props> = ({ content }) => {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={customComponents as any}
      />
    </div>
  );
};

export default EnhancedMarkdownRenderer;
