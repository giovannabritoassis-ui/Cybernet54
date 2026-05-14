"use client";

import Link from "next/link";
import { AlertTriangle, ExternalLink, Clock, Eye, Database, FileText } from "lucide-react";
import type { ArticleData } from "@/lib/types";
import { Infobox } from "./infobox";
import { AdBanner } from "./ad-banner";

interface ArticleProps {
  data: ArticleData;
}

export function Article({ data }: ArticleProps) {
  return (
    <article className="max-w-5xl">
      {/* Article Header */}
      <header className="mb-6">
        {/* Database Info */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Database size={12} />
            <span>ID: {data.databaseId}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>Editado: {data.lastEdited}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye size={12} />
            <span>{data.views.toLocaleString("pt-BR")} visualizações</span>
          </div>
          <div className={`flex items-center gap-1 ${
            data.status === "public" ? "text-success" : 
            data.status === "restricted" ? "text-warning" : "text-danger"
          }`}>
            <FileText size={12} />
            <span>[{data.status.toUpperCase()}]</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl lg:text-4xl text-foreground crt-glow mb-2">
          {data.title}
        </h1>
        {data.subtitle && (
          <p className="text-lg text-muted-foreground">{data.subtitle}</p>
        )}

        {/* NetWatch Warning */}
        <div className="mt-4 p-3 bg-warning/10 border border-warning/30 flex items-start gap-2">
          <AlertTriangle size={16} className="text-warning shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-mono text-warning">
              [NETWATCH MONITORING ACTIVE]
            </p>
            <p className="text-xs text-foreground mt-1">
              Esta página está sendo monitorada conforme o Protocolo NC-7741. Todas as visualizações são registradas.
            </p>
          </div>
        </div>
      </header>

      {/* Content Grid */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Table of Contents */}
          <nav className="mb-6 p-4 bg-secondary/50 border border-primary/20">
            <h2 className="font-display text-sm text-primary mb-3">ÍNDICE</h2>
            <ol className="space-y-1">
              {data.sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-sm text-accent hover:text-accent hover:underline flex items-center gap-2"
                  >
                    <span className="text-muted-foreground font-mono">{index + 1}.</span>
                    {section.title}
                  </a>
                  {section.subsections && (
                    <ol className="ml-6 mt-1 space-y-1">
                      {section.subsections.map((sub, subIndex) => (
                        <li key={sub.id}>
                          <a
                            href={`#${sub.id}`}
                            className="text-xs text-accent/70 hover:text-accent hover:underline flex items-center gap-2"
                          >
                            <span className="text-muted-foreground font-mono">
                              {index + 1}.{subIndex + 1}
                            </span>
                            {sub.title}
                          </a>
                        </li>
                      ))}
                    </ol>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {/* Sections */}
          {data.sections.map((section, index) => (
            <section key={section.id} id={section.id} className="mb-8">
              <h2 className="font-display text-xl text-primary border-b border-primary/30 pb-2 mb-4">
                {section.title}
              </h2>
              <div
                className="prose prose-invert prose-sm max-w-none 
                  prose-p:text-foreground prose-p:leading-relaxed
                  prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-primary
                  prose-li:text-foreground
                  prose-ul:list-disc prose-ul:pl-4
                  [&_.warning-box]:bg-warning/10 [&_.warning-box]:border [&_.warning-box]:border-warning/30 [&_.warning-box]:p-4 [&_.warning-box]:my-4
                  [&_.danger-box]:bg-danger/10 [&_.danger-box]:border [&_.danger-box]:border-danger/30 [&_.danger-box]:p-4 [&_.danger-box]:my-4"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />

              {section.subsections?.map((sub) => (
                <div key={sub.id} id={sub.id} className="ml-4 mt-6">
                  <h3 className="font-display text-lg text-foreground border-b border-primary/20 pb-1 mb-3">
                    {sub.title}
                  </h3>
                  <div
                    className="prose prose-invert prose-sm max-w-none 
                      prose-p:text-foreground prose-p:leading-relaxed
                      prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                      prose-strong:text-primary
                      prose-li:text-foreground
                      prose-ul:list-disc prose-ul:pl-4"
                    dangerouslySetInnerHTML={{ __html: sub.content }}
                  />
                </div>
              ))}

              {/* Ad after some sections */}
              {index === 1 && <AdBanner variant="inline" />}
            </section>
          ))}

          {/* References */}
          <section className="mt-8 pt-6 border-t border-primary/30">
            <h2 className="font-display text-xl text-primary mb-4">REFERÊNCIAS</h2>
            <ol className="space-y-2">
              {data.references.map((ref) => (
                <li key={ref.id} className="text-sm text-muted-foreground flex gap-2">
                  <span className="font-mono text-primary">[{ref.id}]</span>
                  <div>
                    <span className="text-foreground">{ref.text}</span>
                    <span className="mx-2">-</span>
                    <span className="italic">{ref.source}</span>
                    <span className="text-xs ml-2">(Acessado: {ref.accessDate})</span>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Categories */}
          <section className="mt-6 pt-4 border-t border-primary/20">
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-mono text-muted-foreground">CATEGORIAS:</span>
              {data.categories.map((cat) => (
                <span
                  key={cat}
                  className="text-xs px-2 py-0.5 bg-primary/10 border border-primary/30 text-primary"
                >
                  {cat}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="lg:w-80 shrink-0 space-y-4">
          {/* Infobox */}
          <Infobox data={data.infobox} title={data.title} status={data.status} />

          {/* Related Articles */}
          <div className="border border-primary/30 bg-card">
            <div className="bg-primary/20 border-b border-primary/30 px-3 py-2">
              <h3 className="font-display text-sm text-foreground">ARTIGOS RELACIONADOS</h3>
            </div>
            <ul className="divide-y divide-primary/10">
              {data.relatedArticles.map((article) => (
                <li key={article.title}>
                  <Link
                    href={article.href}
                    className={`flex items-center gap-2 px-3 py-2 text-sm hover:bg-primary/5 transition-colors ${
                      article.status === "restricted"
                        ? "text-warning/70 hover:text-warning"
                        : "text-accent hover:text-accent"
                    }`}
                  >
                    {article.status === "restricted" && <AlertTriangle size={12} />}
                    <span className="flex-1">{article.title}</span>
                    <ExternalLink size={12} className="opacity-50" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ad */}
          <AdBanner variant="sidebar" />
          <AdBanner variant="sidebar" />
        </aside>
      </div>
    </article>
  );
}
