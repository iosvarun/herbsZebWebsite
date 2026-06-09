"use client";

import React, { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/data/blogs";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LeafAnimation } from "@/components/LeafAnimation";
import { Calendar, User, Clock, ArrowLeft, ChevronRight } from "lucide-react";

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const post = blogPosts.find((p) => p.slug === slug);

  // Quick helper to render basic markdown structures in React
  const formatContent = (text: string) => {
    return text
      .split("\n")
      .map((line, i) => {
        const trimmed = line.trim();
        if (trimmed.startsWith("### ")) {
          return (
            <h3 key={i} className="font-serif text-lg md:text-xl font-bold text-[#113E21] mt-6 mb-3">
              {trimmed.replace("### ", "")}
            </h3>
          );
        }
        if (trimmed.startsWith("## ")) {
          return (
            <h2 key={i} className="font-serif text-xl md:text-2xl font-bold text-[#113E21] mt-8 mb-4">
              {trimmed.replace("## ", "")}
            </h2>
          );
        }
        if (trimmed.startsWith("* ")) {
          const content = trimmed.replace("* ", "");
          const parsedHtml = content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
          return (
            <li
              key={i}
              className="text-slate-600 text-sm list-disc list-inside ml-4 mb-2 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: parsedHtml }}
            />
          );
        }
        if (trimmed.match(/^\d+\.\s/)) {
          const content = trimmed.replace(/^\d+\.\s/, "");
          const parsedHtml = content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
          return (
            <li
              key={i}
              className="text-slate-600 text-sm list-decimal list-inside ml-4 mb-2 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: parsedHtml }}
            />
          );
        }
        if (trimmed === "") {
          return null;
        }
        const parsedHtml = trimmed.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        return (
          <p
            key={i}
            className="text-slate-600 text-sm leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: parsedHtml }}
          />
        );
      })
      .filter(Boolean);
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-between">
        <Navbar onOpenQuiz={() => {}} />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <h2 className="font-serif text-2xl font-bold text-[#113E21]">Article Not Found</h2>
          <p className="text-slate-500 mt-2 text-sm">The article you are looking for has been moved or does not exist.</p>
          <Link href="/blog" className="mt-6 bg-[#113E21] text-white py-3 px-8 rounded-full text-xs font-bold shadow-md">
            Go to Blog List
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const otherPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <LeafAnimation />
      <Navbar onOpenQuiz={() => {}} />

      <main className="max-w-4xl mx-auto px-4 md:px-8 py-10 space-y-8 relative z-20">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wide">
          <Link href="/" className="hover:text-[#113E21]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/blog" className="hover:text-[#113E21]">Blog</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#113E21] font-semibold truncate max-w-[200px] md:max-w-none">
            {post.title}
          </span>
        </div>

        {/* Back button */}
        <div>
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3B7A57] hover:text-[#113E21] transition-colors uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" /> Back to Blog List
          </Link>
        </div>

        {/* Article Container */}
        <article className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Cover image */}
          <div className="relative h-[240px] md:h-[420px] w-full bg-slate-50">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="p-6 md:p-10 space-y-6">
            
            {/* Meta Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="bg-[#8FA89B]/10 text-[#113E21] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="font-serif text-2xl md:text-4xl font-extrabold text-[#113E21] leading-tight">
              {post.title}
            </h1>

            {/* Meta data */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 py-4 border-y border-slate-100 text-xs text-slate-400 font-semibold tracking-wide uppercase">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#3B7A57]" /> {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#3B7A57]" /> {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#3B7A57]" /> {post.readTime}
              </span>
            </div>

            {/* Content Body */}
            <div className="prose prose-slate max-w-none pt-2">
              {formatContent(post.content)}
            </div>

          </div>
        </article>

        {/* Read More Section */}
        <section className="space-y-6 pt-6">
          <h3 className="font-serif text-xl font-bold text-[#113E21]">More Wellness Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherPosts.map((other) => (
              <Link
                href={`/blog/${other.slug}`}
                key={other.slug}
                className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
              >
                <div className="relative h-44 w-full bg-slate-50 overflow-hidden">
                  <Image
                    src={other.image}
                    alt={other.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <h4 className="font-serif text-base font-bold text-[#113E21] group-hover:text-[#3B7A57] transition-colors leading-snug">
                    {other.title}
                  </h4>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider pt-2 flex justify-between items-center border-t border-slate-50">
                    <span>{other.date}</span>
                    <span className="text-[#3B7A57]">Read Article &rarr;</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
