import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ArrowUpRight } from "lucide-react";

export const revalidate = 60;

interface Article {
  id: number;
  title: string;
  slug: string;
  source_url: string;
  created_at: string;
}

export default async function HomePage() {
  const { data: articles, error } = await supabase
    .from("articles")
    .select("id, title, slug, source_url, created_at")
    .order("created_at", { ascending: false });

  return (
    <main className="max-w-3xl mx-auto px-6 pt-16 pb-12">
      <section className="mb-14 rounded-2xl bg-gradient-to-br from-stone-200/80 via-stone-100 to-transparent p-8 sm:p-10">
        <p className="font-mono text-xs uppercase tracking-widest text-stone-400 mb-3">
          Knowledge Base & Dossiers
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4 bg-gradient-to-r from-stone-900 to-stone-600 bg-clip-text text-transparent">
          Deep tech knowledge, distilled for builders.
        </h1>
        <p className="text-base text-stone-700 leading-relaxed font-normal">
          The best product, engineering, and leadership videos on the web—synthesized into clear mental models, core principles, and strategic frameworks.
        </p>
      </section>

      <div className="border-t border-stone-200/80">
        {error && (
          <div className="py-8 font-mono text-xs text-rose-500">
            Error loading articles. Verify Supabase environment keys and RLS policies.
          </div>
        )}

        {!error && (!articles || articles.length === 0) && (
          <div className="py-16 text-center">
            <p className="font-mono text-sm text-stone-400">No syntheses published yet.</p>
          </div>
        )}

        {articles?.map((article: Article) => {
          const dateFormatted = new Date(article.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });

          return (
            <article
              key={article.id}
              className="group border-b border-stone-200/80 py-7 transition-colors hover:border-stone-400"
            >
              <Link href={`/articles/${article.slug}`} className="block">
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <span className="font-mono text-xs text-stone-400">
                    {dateFormatted}
                  </span>
                  <span className="text-xs text-red-500 group-hover:text-red-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all inline-flex items-center gap-1 font-mono">
                    Read Guide <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
                <h2 className="text-xl font-medium tracking-tight text-stone-900 group-hover:text-stone-600 transition-colors leading-snug">
                  {article.title}
                </h2>
              </Link>
            </article>
          );
        })}
      </div>
    </main>
  );
}