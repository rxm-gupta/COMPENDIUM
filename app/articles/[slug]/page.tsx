import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, ExternalLink } from "lucide-react";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;

  const { data: article, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !article) {
    notFound();
  }

  const publishedDate = new Date(article.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="max-w-2xl mx-auto px-6 pt-12 pb-24">
      <nav className="mb-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-stone-400 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Index</span>
        </Link>
      </nav>

      <header className="mb-12 pb-8 border-b border-stone-200/80">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-stone-400 mb-4">
          {article.channel_name && (
            <>
              <span className="text-stone-600 font-medium">
                {article.channel_name.trim()}
              </span>
              <span>•</span>
            </>
          )}
          <time dateTime={article.created_at}>{publishedDate}</time>
          <span>•</span>
          <span>Tactical Synthesis</span>
          {article.source_url && (
            <>
              <span>•</span>
              <a
                href={article.source_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-stone-600 hover:text-stone-900 underline underline-offset-2 transition-colors"
              >
                Source Video <ExternalLink className="w-3 h-3" />
              </a>
            </>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900 leading-tight">
          {article.title}
        </h1>
      </header>

      <div className="prose prose-stone max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-stone-900 prose-h1:text-2xl prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-stone-200/60 prose-h2:pb-2 prose-p:text-stone-700 prose-p:leading-relaxed prose-li:text-stone-700 prose-li:leading-relaxed prose-strong:text-stone-900 prose-strong:font-semibold prose-hr:border-stone-200">
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </div>

      <div className="mt-16 pt-8 border-t border-stone-200/80 flex justify-between items-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-stone-500 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to all masterclasses</span>
        </Link>
        <span className="font-mono text-xs text-stone-400">End of dossier</span>
      </div>
    </main>
  );
}