"use client";

import { useState } from "react";
import { X, AlertTriangle, Skull, CreditCard, Shield, Zap, ChevronRight } from "lucide-react";

interface AdBannerProps {
  variant?: "sidebar" | "inline" | "banner";
}

const ads = [
  {
    id: 1,
    title: "TRAUMA TEAM",
    subtitle: "PREMIUM MEMBERSHIP",
    description: "3 minutos ou menos. Garantido.",
    type: "trauma",
    color: "from-red-900 to-red-950",
    borderColor: "border-red-500",
  },
  {
    id: 2,
    title: "ARASAKA",
    subtitle: "SECURITY SOLUTIONS",
    description: "Sua família merece proteção corporativa.",
    type: "arasaka",
    color: "from-red-950 to-black",
    borderColor: "border-red-600",
  },
  {
    id: 3,
    title: "MILITECH",
    subtitle: "COMBAT INSURANCE",
    description: "Porque acidentes acontecem.",
    type: "militech",
    color: "from-green-950 to-black",
    borderColor: "border-green-600",
  },
  {
    id: 4,
    title: "BLACK MARKET",
    subtitle: "CYBERWARE PREMIUM",
    description: "Sem perguntas. Sem registros.",
    type: "blackmarket",
    color: "from-purple-950 to-black",
    borderColor: "border-purple-500",
  },
  {
    id: 5,
    title: "GHOST.NET",
    subtitle: "VPN PREMIUM",
    description: "NetWatch não vê o que não existe.",
    type: "ghost",
    color: "from-cyan-950 to-black",
    borderColor: "border-cyan-500",
  },
  {
    id: 6,
    title: "NIGHT CITY",
    subtitle: "BRAINDANCE CLUB",
    description: "Experiências exclusivas. +18",
    type: "bd",
    color: "from-pink-950 to-black",
    borderColor: "border-pink-500",
  },
];

export function AdBanner({ variant = "sidebar" }: AdBannerProps) {
  const [currentAd, setCurrentAd] = useState(() => Math.floor(Math.random() * ads.length));
  const [showPopup, setShowPopup] = useState(false);
  const ad = ads[currentAd];

  const handleClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setCurrentAd(Math.floor(Math.random() * ads.length));
  };

  if (variant === "banner") {
    return (
      <>
        <div
          onClick={handleClick}
          className={`relative overflow-hidden bg-gradient-to-r ${ad.color} border ${ad.borderColor} p-3 cursor-pointer hover:brightness-110 transition-all group`}
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 100 100%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22/%3E%3C/filter%3E%3Crect width=%22100%22 height=%22100%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')] opacity-10" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-xs font-mono text-primary animate-pulse">[AD]</div>
              <div>
                <span className="font-display text-sm text-foreground">{ad.title}</span>
                <span className="mx-2 text-muted-foreground">|</span>
                <span className="text-xs text-muted-foreground">{ad.subtitle}</span>
              </div>
            </div>
            <ChevronRight size={16} className="text-primary group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {showPopup && <AdPopup ad={ad} onClose={closePopup} />}
      </>
    );
  }

  if (variant === "inline") {
    return (
      <>
        <div
          onClick={handleClick}
          className={`relative overflow-hidden bg-gradient-to-b ${ad.color} border ${ad.borderColor} p-4 cursor-pointer hover:brightness-110 transition-all my-4`}
        >
          <div className="absolute top-2 right-2 text-xs font-mono text-primary/50">[ANÚNCIO]</div>
          <div className="text-center">
            <h4 className="font-display text-lg text-foreground neon-text">{ad.title}</h4>
            <p className="text-sm text-primary mt-1">{ad.subtitle}</p>
            <p className="text-xs text-muted-foreground mt-2">{ad.description}</p>
            <button className="mt-3 px-4 py-1 bg-primary/20 border border-primary text-primary text-xs font-mono hover:bg-primary/30 transition-colors">
              SAIBA MAIS
            </button>
          </div>
        </div>

        {showPopup && <AdPopup ad={ad} onClose={closePopup} />}
      </>
    );
  }

  return (
    <>
      <div
        onClick={handleClick}
        className={`relative overflow-hidden bg-gradient-to-b ${ad.color} border ${ad.borderColor} p-3 cursor-pointer hover:brightness-110 transition-all`}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 100 100%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22/%3E%3C/filter%3E%3Crect width=%22100%22 height=%22100%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')] opacity-10" />
        <div className="absolute top-1 right-1 text-[10px] font-mono text-primary/50">[AD]</div>
        <div className="relative">
          <h4 className="font-display text-sm text-foreground">{ad.title}</h4>
          <p className="text-xs text-primary">{ad.subtitle}</p>
          <p className="text-[10px] text-muted-foreground mt-1">{ad.description}</p>
        </div>
      </div>

      {showPopup && <AdPopup ad={ad} onClose={closePopup} />}
    </>
  );
}

interface AdPopupProps {
  ad: (typeof ads)[0];
  onClose: () => void;
}

function AdPopup({ ad, onClose }: AdPopupProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={onClose}>
      <div
        className={`relative w-full max-w-md bg-gradient-to-b ${ad.color} border-2 ${ad.borderColor} shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Scanlines */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.3)_2px,rgba(0,0,0,0.3)_4px)] pointer-events-none" />

        {/* Header */}
        <div className="relative flex items-center justify-between px-4 py-3 border-b border-primary/30 bg-black/50">
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-warning animate-pulse" />
            <span className="font-mono text-sm text-warning">ANÚNCIO CORPORATIVO</span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-primary/20">
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="relative p-6 text-center">
          <h3 className="font-display text-2xl text-foreground neon-text mb-2">{ad.title}</h3>
          <p className="text-lg text-primary mb-4">{ad.subtitle}</p>
          <p className="text-sm text-muted-foreground mb-6">{ad.description}</p>

          <div className="space-y-3">
            {ad.type === "trauma" && (
              <p className="text-xs text-foreground">
                Assine o plano PLATINUM e receba cobertura ilimitada para toda sua família.
                Tempo de resposta garantido ou seu dinheiro de volta!*
              </p>
            )}
            {ad.type === "arasaka" && (
              <p className="text-xs text-foreground">
                Segurança 24/7 com os melhores agentes do mercado.
                Monitoramento constante para sua tranquilidade.
              </p>
            )}
            {ad.type === "militech" && (
              <p className="text-xs text-foreground">
                Cobertura completa para profissionais de segurança.
                Planos corporativos disponíveis.
              </p>
            )}
            {ad.type === "blackmarket" && (
              <p className="text-xs text-foreground">
                Cyberware de última geração. Implantes militares.
                Entrega discreta. Instalação opcional.
              </p>
            )}
            {ad.type === "ghost" && (
              <p className="text-xs text-foreground">
                Criptografia de nível militar. Servidores em território neutro.
                Sua privacidade é nossa prioridade.
              </p>
            )}
            {ad.type === "bd" && (
              <p className="text-xs text-foreground">
                Catálogo exclusivo com milhares de experiências.
                Novos conteúdos toda semana.
              </p>
            )}

            <div className="flex gap-2 mt-4">
              <button
                onClick={onClose}
                className="flex-1 py-2 bg-primary text-primary-foreground font-mono text-sm hover:brightness-110 transition-all"
              >
                ASSINAR AGORA
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2 bg-secondary border border-muted text-muted-foreground font-mono text-sm hover:bg-muted/20 transition-all"
              >
                TALVEZ DEPOIS
              </button>
            </div>

            <p className="text-[10px] text-muted-foreground mt-4">
              *Termos e condições aplicam-se. Oferta válida apenas para residentes de Night City.
              Este anúncio foi aprovado pelo Conselho Corporativo de Night City.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
