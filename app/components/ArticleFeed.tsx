'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export interface Article {
  id: number;
  title: string;
  slug: string;
  channel_name?: string | null;
  source_url: string;
  created_at: string;
}

const normalize = (name: string) => name.trim().toLowerCase();

// Formats date identically on server and client using UTC
const formatDate = (dateStr: string) => {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    });
  } catch {
    return dateStr.split('T')[0];
  }
};

export default function ArticleFeed({ articles = [] }: { articles: Article[] }) {
  // 1. Synchronously initialize state from sessionStorage to eliminate the paint flash
  const [selected, setSelected] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('compendium_channel_filter');
    }
    return null;
  });

  useEffect(() => {
    // Reset filter back to "All" whenever the user clicks the Compendium home logo
    const handleHomeClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href="/"]');
      if (anchor) {
        sessionStorage.removeItem('compendium_channel_filter');
        setSelected(null);
      }
    };

    document.addEventListener('click', handleHomeClick);
    return () => document.removeEventListener('click', handleHomeClick);
  }, []);

  const handleFilterChange = (key: string | null) => {
    setSelected(key);
    if (key) {
      sessionStorage.setItem('compendium_channel_filter', key);
    } else {
      sessionStorage.removeItem('compendium_channel_filter');
    }
  };

  const channels = useMemo(() => {
    const map = new Map<string, string>();
    if (!articles || !Array.isArray(articles)) return [];

    articles.forEach((a) => {
      const raw = a.channel_name?.trim();
      if (!raw) return;
      const key = normalize(raw);
      if (!map.has(key)) map.set(key, raw);
    });

    return Array.from(map, ([key, label]) => ({ key, label }));
  }, [articles]);

  const filtered = useMemo(() => {
    if (!selected || !articles || !Array.isArray(articles)) return articles || [];
    return articles.filter(
      (a) => a.channel_name && normalize(a.channel_name) === selected
    );
  }, [articles, selected]);

  if (!articles || articles.length === 0) {
    return (
      <div className="py-16 text-center border-t border-stone-200/80">
        <p className="font-mono text-sm text-stone-400">No syntheses published yet.</p>
      </div>
    );
  }

  const pillClass = (active: boolean) =>
    `px-3 py-1 rounded-full text-xs font-mono transition-colors duration-150 border cursor-pointer select-none ${
      active
        ? 'bg-stone-900 text-stone-50 border-stone-900 shadow-sm'
        : 'bg-transparent text-stone-600 border-stone-200 hover:border-stone-400 hover:text-stone-900'
    }`;

  return (
    <div suppressHydrationWarning>
      {/* Top Filter Pills */}
      {channels.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pb-6 mb-2">
          <button
            type="button"
            onClick={() => handleFilterChange(null)}
            className={pillClass(selected === null)}
          >
            All
          </button>

          {channels.map(({ key, label }) => {
            const isActive = selected === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleFilterChange(isActive ? null : key)}
                className={pillClass(isActive)}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}

      {/* Article List Stream */}
      <div className="border-t border-stone-200/80">
        {filtered.length === 0 ? (
          <div className="py-12 text-center">
            <p className="font-mono text-xs text-stone-400">
              No playbooks found for this channel.
            </p>
          </div>
        ) : (
          filtered.map((article) => {
            const channel = article.channel_name?.trim();
            const channelKey = channel ? normalize(channel) : null;

            return (
              <article
                key={article.id}
                className="group border-b border-stone-200/80 py-7 transition-colors hover:border-stone-400"
              >
                {/* Meta Header */}
                <div className="flex items-baseline justify-between gap-4 mb-2 font-mono text-xs text-stone-400">
                  <div className="flex items-center gap-2">
                    {channel && channelKey && (
                      <>
                        <a
                          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(channel)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-pointer font-medium text-stone-600 hover:text-stone-900 transition-colors hover:underline underline-offset-2"
                        >
                          {channel}
                        </a>
                        <span>•</span>
                      </>
                    )}
                    <span>{formatDate(article.created_at)}</span>
                  </div>

                  <Link
                    href={`/articles/${article.slug}`}
                    className="inline-flex items-center gap-1 text-red-500 hover:text-red-700 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 font-mono text-xs"
                  >
                    Read Guide <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>

                <h2 className="text-xl font-medium tracking-tight text-stone-900 group-hover:text-stone-600 transition-colors leading-snug">
                  <Link href={`/articles/${article.slug}`} className="block">
                    {article.title}
                  </Link>
                </h2>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}