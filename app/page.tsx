import { supabase } from "@/lib/supabase";
import ArticleFeed from "./components/ArticleFeed";
import { Github } from "lucide-react";

export const revalidate = 60;

export default async function HomePage() {
  const { data: articles, error } = await supabase
    .from("articles")
    .select("id, title, slug, channel_name, source_url, created_at")
    .order("created_at", { ascending: false });

  return (
    <main className="max-w-3xl mx-auto px-6 pt-10 pb-12">
    

      {/* Hero Section */}
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

      {/* Error State */}
      {error && (
        <div className="py-8 font-mono text-xs text-rose-500 border-t border-stone-200/80">
          Error loading articles. Verify Supabase environment keys and RLS policies.
        </div>
      )}

      {/* Interactive Filterable Feed */}
      {!error && <ArticleFeed articles={articles || []} />}
    </main>
  );
}