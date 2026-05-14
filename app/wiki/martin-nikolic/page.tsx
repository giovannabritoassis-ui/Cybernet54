"use client";

import { useState, useEffect, useCallback } from "react";
import { Sidebar } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";
import { Infobox } from "@/components/infobox";
import { Article } from "@/components/article";
import { AdBanner } from "@/components/ad-banner";
import { Footer } from "@/components/footer";
import { PopupSystem } from "@/components/popup-system";
import { martinNikolic } from "@/lib/data";

const CORRECT_PASSWORD = "GHOST_PROTOCOL_7734";

function GlitchText({ text, className }: { text: string; className?: string }) {
  const [glitchedText, setGlitchedText] = useState(text);
  
  useEffect(() => {
    const glitchChars = "!@#$%^&*()_+-=[]{}|;':\",./<>?0123456789";
    const interval = setInterval(() => {
      const newText = text
        .split("")
        .map((char) => {
          if (char === " ") return " ";
          return Math.random() > 0.7
            ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
            : char;
        })
        .join("");
      setGlitchedText(newText);
    }, 100);
    
    return () => clearInterval(interval);
  }, [text]);
  
  return <span className={className}>{glitchedText}</span>;
}

function LockedContent() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.toUpperCase() === CORRECT_PASSWORD) {
      setIsUnlocking(true);
      setError("");
      
      // Efeito de desbloqueio
      setTimeout(() => {
        localStorage.setItem("martin_unlocked", "true");
        window.location.reload();
      }, 2000);
    } else {
      setAttempts((prev) => prev + 1);
      setError("ACESSO NEGADO - Código inválido");
      setPassword("");
      
      if (attempts >= 2) {
        setShowHint(true);
      }
    }
  }, [password, attempts]);
  
  if (isUnlocking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl font-mono text-cyber-green animate-pulse mb-4">
            DESBLOQUEANDO...
          </div>
          <div className="w-64 h-2 bg-cyber-green/20 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-cyber-green animate-[loading_2s_ease-in-out]" 
                 style={{ animation: "loading 2s ease-in-out forwards" }} />
          </div>
          <style jsx>{`
            @keyframes loading {
              from { width: 0%; }
              to { width: 100%; }
            }
          `}</style>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <PopupSystem />
      <Navbar />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Warning Banner */}
            <div className="border-2 border-cyber-red bg-cyber-red/10 p-6 mb-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none" />
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 border-2 border-cyber-red flex items-center justify-center">
                  <svg className="w-8 h-8 text-cyber-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-cyber-red font-mono">
                    <GlitchText text="ARQUIVO CLASSIFICADO" />
                  </h1>
                  <p className="text-cyber-red/70 text-sm">Nível de Segurança: MÁXIMO</p>
                </div>
              </div>
              
              <div className="text-foreground/80 space-y-2 font-mono text-sm">
                <p>{">"} Este arquivo está protegido por protocolo de segurança GHOST_NET.</p>
                <p>{">"} Acesso não autorizado resultará em rastreamento imediato.</p>
                <p>{">"} Todas as tentativas são registradas.</p>
              </div>
            </div>
            
            {/* Locked Article Preview */}
            <div className="border border-border bg-card p-8 relative overflow-hidden mb-8">
              <div className="absolute inset-0 backdrop-blur-md bg-background/80 z-10" />
              <div className="absolute inset-0 bg-scanlines opacity-30 z-20 pointer-events-none" />
              
              {/* Fake blurred content */}
              <div className="relative z-0">
                <h2 className="text-3xl font-bold text-cyber-blue mb-4 blur-sm">Martin Nikolic</h2>
                <div className="space-y-4">
                  <p className="text-foreground/60 blur-sm">
                    Martin Nikolic (2039-2077) foi um dos mais controversos e enigmáticos membros da família Nikolic.
                    Conhecido como "O Fantasma da Net", ele operava nas sombras do submundo digital...
                  </p>
                  <p className="text-foreground/60 blur-sm">
                    Suas operações foram fundamentais para a ascensão da família ao poder, embora seus métodos
                    tenham sempre sido questionados até mesmo pelos próprios membros do clã...
                  </p>
                </div>
              </div>
              
              {/* Lock overlay */}
              <div className="absolute inset-0 z-30 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-24 h-24 text-cyber-red mx-auto mb-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <p className="text-cyber-red font-mono text-lg">CONTEÚDO BLOQUEADO</p>
                </div>
              </div>
            </div>
            
            {/* Password Form */}
            <div className="border border-cyber-green bg-cyber-green/5 p-8">
              <h3 className="text-xl font-bold text-cyber-green font-mono mb-6 flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
                AUTENTICAÇÃO NECESSÁRIA
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-foreground/60 text-sm mb-2 font-mono">
                    {">"} Digite o código de acesso:
                  </label>
                  <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-background border border-cyber-green/50 text-cyber-green font-mono p-4 
                             focus:border-cyber-green focus:outline-none focus:ring-1 focus:ring-cyber-green
                             placeholder:text-cyber-green/30 uppercase tracking-widest"
                    placeholder="CÓDIGO DE ACESSO"
                    autoComplete="off"
                    spellCheck={false}
                  />
                </div>
                
                {error && (
                  <div className="text-cyber-red font-mono text-sm animate-pulse flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {error}
                  </div>
                )}
                
                {showHint && (
                  <div className="text-cyber-yellow font-mono text-sm border border-cyber-yellow/30 bg-cyber-yellow/5 p-4">
                    <p className="mb-2">{">"} DICA DO SISTEMA:</p>
                    <p className="text-cyber-yellow/70">
                      O código está escondido em algum lugar desta enciclopédia. 
                      Procure nos detalhes dos outros membros da família...
                    </p>
                  </div>
                )}
                
                <button
                  type="submit"
                  className="w-full bg-cyber-green/10 border border-cyber-green text-cyber-green font-mono py-4
                           hover:bg-cyber-green hover:text-background transition-all duration-300
                           flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                  DESBLOQUEAR ARQUIVO
                </button>
              </form>
              
              <div className="mt-6 text-foreground/40 text-xs font-mono">
                <p>Tentativas: {attempts}/∞</p>
                <p className="mt-1">ID do Terminal: NKL-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
              </div>
            </div>
            
            <AdBanner position="bottom" />
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}

function UnlockedContent() {
  const [showLockButton, setShowLockButton] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setShowLockButton(true), 3000);
    return () => clearTimeout(timer);
  }, []);
  
  const handleLock = () => {
    localStorage.removeItem("martin_unlocked");
    window.location.reload();
  };
  
  return (
    <div className="min-h-screen bg-background">
      <PopupSystem />
      <Navbar />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {/* Success Banner */}
            <div className="border-2 border-cyber-green bg-cyber-green/10 p-4 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-cyber-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-cyber-green font-mono">ARQUIVO DESBLOQUEADO - Acesso Concedido</span>
              </div>
              
              {showLockButton && (
                <button
                  onClick={handleLock}
                  className="text-xs font-mono text-foreground/40 hover:text-cyber-red transition-colors flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Bloquear novamente
                </button>
              )}
            </div>
            
            <AdBanner position="top" />
            
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <Article character={martinNikolic} />
              </div>
              
              <aside className="lg:w-80">
                <Infobox character={martinNikolic} />
                <div className="mt-6">
                  <AdBanner position="side" />
                </div>
              </aside>
            </div>
            
            <AdBanner position="bottom" />
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}

export default function MartinNikolicPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const unlocked = localStorage.getItem("martin_unlocked") === "true";
    setIsUnlocked(unlocked);
    setIsLoading(false);
  }, []);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-cyber-green font-mono animate-pulse">
          Verificando credenciais...
        </div>
      </div>
    );
  }
  
  return isUnlocked ? <UnlockedContent /> : <LockedContent />;
}
