"use client";

import Link from "next/link";
import { Sidebar } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PopupSystem } from "@/components/popup-system";
import { AdBanner } from "@/components/ad-banner";
import { AlertTriangle, Database, FileText, Users, Shield, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Sidebar />
      <Navbar />
      <PopupSystem />

      <main className="lg:ml-64 pt-14 min-h-screen">
        <div className="p-4 lg:p-8">
          {/* Header Banner */}
          <div className="relative overflow-hidden border-2 border-primary bg-gradient-to-r from-primary/10 to-transparent mb-8">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,0,51,0.1)_2px,rgba(255,0,51,0.1)_4px)]" />
            <div className="relative p-6 lg:p-8">
              <h1 className="font-display text-3xl lg:text-5xl text-primary neon-text mb-2">
                NC WIKIPEDIA ARCHIVE
              </h1>
              <p className="text-lg text-foreground mb-4">
                Enciclopédia Pública de Night City - Sistema de Database Monitorado
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Database size={12} className="text-primary" />
                  2.847.293 ARTIGOS
                </span>
                <span className="flex items-center gap-1">
                  <Users size={12} className="text-accent" />
                  847 USUÁRIOS ONLINE
                </span>
                <span className="flex items-center gap-1">
                  <Shield size={12} className="text-warning" />
                  NETWATCH ATIVO
                </span>
              </div>
            </div>
          </div>

          {/* Ad Banner */}
          <AdBanner variant="banner" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Featured Article */}
              <section className="border border-primary/30 bg-card">
                <div className="bg-primary/20 border-b border-primary/30 px-4 py-2 flex items-center gap-2">
                  <Zap size={16} className="text-primary" />
                  <h2 className="font-display text-foreground">ARTIGO EM DESTAQUE</h2>
                </div>
                <div className="p-4">
                  <Link href="/wiki/chidi-nikolic" className="group">
                    <h3 className="font-display text-xl text-accent group-hover:text-accent group-hover:underline mb-2">
                      Chidi Nikolic
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground mb-4">
                    <strong>Chidi Aleksandar Nikolic</strong> é um jornalista investigativo aposentado, 
                    amplamente reconhecido como uma das figuras mais respeitadas na história do jornalismo 
                    de Night City. Ao longo de sua carreira de mais de quatro décadas, Nikolic ficou 
                    famoso por expor escândalos de corrupção envolvendo megacorporações e políticos de 
                    alto escalão. Seu trabalho resultou em múltiplos processos criminais e reformas 
                    legislativas significativas.
                  </p>
                  <Link 
                    href="/wiki/chidi-nikolic" 
                    className="text-sm text-primary hover:underline"
                  >
                    [CONTINUAR LENDO]
                  </Link>
                </div>
              </section>

              {/* Family Section */}
              <section className="border border-primary/30 bg-card">
                <div className="bg-primary/20 border-b border-primary/30 px-4 py-2 flex items-center gap-2">
                  <Users size={16} className="text-primary" />
                  <h2 className="font-display text-foreground">FAMÍLIA NIKOLIC</h2>
                </div>
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "Eleanor Moreau Nikolic", desc: "Artista e Pianista", href: "/wiki/eleanor-nikolic", status: "public" },
                    { name: "Daniela Nikolic", desc: "Médica Chefe - Trauma Team", href: "/wiki/daniela-nikolic", status: "public" },
                    { name: "Sophia Nikolic", desc: "Empresária - Velvet Room", href: "/wiki/sophia-nikolic", status: "public" },
                    { name: "Marija Nikolic", desc: "Cidadã de Night City", href: "/wiki/marija-nikolic", status: "public" },
                    { name: "Martin Nikolic", desc: "[ACESSO RESTRITO]", href: "/wiki/martin-nikolic", status: "restricted" },
                  ].map((member) => (
                    <Link
                      key={member.name}
                      href={member.href}
                      className={`p-3 border transition-colors ${
                        member.status === "restricted"
                          ? "border-danger/30 bg-danger/5 hover:bg-danger/10"
                          : "border-primary/20 hover:bg-primary/5"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {member.status === "restricted" && (
                          <AlertTriangle size={14} className="text-danger shrink-0 mt-0.5" />
                        )}
                        <div>
                          <h4 className={`font-display text-sm ${
                            member.status === "restricted" ? "text-danger" : "text-accent"
                          }`}>
                            {member.name}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">{member.desc}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Recent Activity */}
              <section className="border border-primary/30 bg-card">
                <div className="bg-primary/20 border-b border-primary/30 px-4 py-2 flex items-center gap-2">
                  <FileText size={16} className="text-primary" />
                  <h2 className="font-display text-foreground">ATIVIDADE RECENTE</h2>
                </div>
                <div className="divide-y divide-primary/10">
                  {[
                    { action: "Artigo editado", article: "Chidi Nikolic", time: "há 2 horas", user: "NC-ADMIN" },
                    { action: "Novo comentário", article: "Eleanor Moreau Nikolic", time: "há 5 horas", user: "ANON-7741" },
                    { action: "Artigo visualizado", article: "Daniela Nikolic", time: "há 8 horas", user: "NETWATCH" },
                    { action: "Alerta de segurança", article: "Martin Nikolic", time: "há 12 horas", user: "SYSTEM" },
                  ].map((activity, i) => (
                    <div key={i} className="p-3 flex items-center justify-between text-sm">
                      <div>
                        <span className="text-muted-foreground">{activity.action}:</span>
                        <span className="text-accent ml-2">{activity.article}</span>
                      </div>
                      <div className="text-xs font-mono text-muted-foreground">
                        <span>{activity.time}</span>
                        <span className="ml-2 text-primary">@{activity.user}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* System Status */}
              <div className="border border-primary/30 bg-card">
                <div className="bg-primary/20 border-b border-primary/30 px-4 py-2">
                  <h3 className="font-display text-sm text-foreground">STATUS DO SISTEMA</h3>
                </div>
                <div className="p-4 space-y-3 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Servidor:</span>
                    <span className="text-success">ONLINE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">NetWatch:</span>
                    <span className="text-warning animate-pulse">MONITORANDO</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Database:</span>
                    <span className="text-success">SINCRONIZADO</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Segurança:</span>
                    <span className="text-success">NIVEL-7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ameaças:</span>
                    <span className="text-danger">3 DETECTADAS</span>
                  </div>
                </div>
              </div>

              {/* Ads */}
              <AdBanner variant="sidebar" />
              <AdBanner variant="sidebar" />

              {/* NetWatch Warning */}
              <div className="border border-warning/50 bg-warning/10 p-4">
                <div className="flex items-start gap-2">
                  <Shield size={16} className="text-warning shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-mono text-warning font-semibold mb-1">
                      [NETWATCH ALERT]
                    </p>
                    <p className="text-xs text-foreground">
                      Sua sessão está sendo monitorada. ID: NC-{Math.random().toString(36).substr(2, 8).toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="border border-primary/30 bg-card">
                <div className="bg-primary/20 border-b border-primary/30 px-4 py-2">
                  <h3 className="font-display text-sm text-foreground">LINKS RÁPIDOS</h3>
                </div>
                <div className="p-2">
                  {[
                    "Arasaka Corporation",
                    "Militech International",
                    "Trauma Team",
                    "NCPD",
                    "NetWatch",
                    "Maelstrom",
                  ].map((link) => (
                    <a
                      key={link}
                      href="#"
                      className="block px-3 py-2 text-sm text-accent hover:bg-primary/5 transition-colors"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
}
