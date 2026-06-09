"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/data/blogs";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LeafAnimation } from "@/components/LeafAnimation";
import { Calendar, User, Clock, ArrowRight, Search } from "lucide-react";

export default function BlogListPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      <LeafAnimation />
      <Navbar onOpenQuiz={() => {}} />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-12 relative z-20">
        
        {/* Page Header */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs font-extrabold uppercase text-[#8FA89B] tracking-[0.2em] block">
            Ayurvedic Insights
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-extrabold text-[#113E21]">
            HerbsZen Health Portal
          </h1>
          <p className="text-sm text-slate-500">
            SEO-optimized guides, clinical facts, and wellness logs written by our certified Ayurvedic doctors.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search articles by title, tag, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-full py-3 px-5 pr-11 text-xs focus:outline-none focus:border-[#3B7A57] font-medium"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-4 top-3.5" />
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm">
            No articles match your search parameters. Try searching "Moringa" or "Joint".
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                {/* Post Image */}
                <Link href={`/blog/${post.slug}`} className="relative h-52 w-full block overflow-hidden bg-slate-50">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                {/* Post Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span key={tag} className="bg-[#8FA89B]/10 text-[#113E21] text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="font-serif text-lg font-bold text-[#113E21] group-hover:text-[#3B7A57] transition-colors leading-snug">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>

                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Metadata */}
                  <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-[10px] text-slate-400 font-bold tracking-wide uppercase">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {post.readTime}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

      </main>

      <Footer />
    </>
  );
}
