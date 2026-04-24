'use client';
import React from "react";
import ReactMarkdown from "react-markdown";
import { Components } from "react-markdown";

const MarkdownComponents: Components = {
    h1: ({ children }) => <h1 className="text-3xl font-bold mb-2">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-semibold mb-2">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-semibold mb-2">{children}</h3>,
    p: ({ children }) => <p className="text-base mb-2">{children}</p>,
    ul: ({ children }) => <ul className="list-disc list-inside mb-2">{children}</ul>,
    li: ({ children }) => <li className="mb-1">{children}</li>,
    ol: ({ children }) => <ol className="list-decimal list-inside mb-2">{children}</ol>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic">
        {children}
      </blockquote>
    ),
  };

  export default function MarkdownContent({ markdown }: { markdown: string }) {
    return (
      <ReactMarkdown components={MarkdownComponents}>{markdown}</ReactMarkdown>
    );
  }
