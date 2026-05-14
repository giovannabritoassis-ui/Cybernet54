"use client";

import Link from "next/link";
import { User } from "lucide-react";
import type { InfoboxData } from "@/lib/types";

interface InfoboxProps {
  data: InfoboxData;
  title: string;
  status?: "public" | "restricted" | "classified";
}

export function Infobox({ data, title, status = "public" }: InfoboxProps) {
  const statusColors = {
    public: "border-primary/50 bg-card",
    restricted: "border-warning/50 bg-warning/5",
    classified: "border-danger/50 bg-danger/5",
  };

  const statusLabels = {
    public: "PÚBLICO",
    restricted: "RESTRITO",
    classified: "CLASSIFICADO",
  };

  return (
    <div className={`border-2 ${statusColors[status]} w-full lg:w-80 shrink-0`}>
      {/* Header */}
      <div className="bg-primary/20 border-b border-primary/30 px-3 py-2">
        <h3 className="font-display text-center text-foreground">{title}</h3>
      </div>

      {/* Image */}
      <div className="relative border-b border-primary/20">
        {data.image ? (
          <div className="aspect-[3/4] bg-secondary flex items-center justify-center relative overflow-hidden">
            {/* Placeholder com efeito CRT */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.2)_2px,rgba(0,0,0,0.2)_4px)]" />
            <User size={80} className="text-muted-foreground/30" />
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-2 py-1">
              <p className="text-[10px] text-muted-foreground text-center font-mono">
                [IMAGEM DO ARQUIVO NC]
              </p>
            </div>
          </div>
        ) : (
          <div className="aspect-[3/4] bg-secondary flex items-center justify-center">
            <User size={80} className="text-muted-foreground/30" />
          </div>
        )}
        {data.caption && (
          <p className="text-xs text-muted-foreground text-center p-2 bg-secondary/50 italic">
            {data.caption}
          </p>
        )}
      </div>

      {/* Status Badge */}
      <div className="px-3 py-2 border-b border-primary/20 bg-secondary/30">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-muted-foreground">STATUS:</span>
          <span className={`text-xs font-mono ${
            status === "public" ? "text-success" : 
            status === "restricted" ? "text-warning" : "text-danger"
          }`}>
            [{statusLabels[status]}]
          </span>
        </div>
      </div>

      {/* Fields */}
      <div className="divide-y divide-primary/10">
        {data.fields.map((field, index) => (
          <div key={index} className="px-3 py-2 flex">
            <span className="text-xs font-mono text-muted-foreground w-28 shrink-0">
              {field.label}:
            </span>
            <span className="text-xs text-foreground flex-1">
              {field.isLink && field.linkHref ? (
                <Link href={field.linkHref} className="text-accent hover:underline">
                  {field.value}
                </Link>
              ) : (
                field.value
              )}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-3 py-2 bg-secondary/30 border-t border-primary/20">
        <p className="text-[10px] text-muted-foreground font-mono text-center">
          NC-ARCHIVE DATABASE ENTRY
        </p>
      </div>
    </div>
  );
}
