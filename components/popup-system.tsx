"use client";

import { useState, useEffect, useCallback } from "react";
import { X, AlertTriangle, Skull, CreditCard, Shield, Zap } from "lucide-react";

interface Popup {
  id: string;
  type: "ad" | "warning" | "malware" | "subscription";
  title: string;
  content: string;
  x: number;
  y: number;
}

const popupTemplates = [
  {
    type: "ad" as const,
    title: "TRAUMA TEAM PREMIUM",
    content: "Assine AGORA e ganhe 10% de desconto na sua próxima extração de emergência! Tempo de resposta garantido de 3 minutos ou seu dinheiro de volta (termos e condições aplicam-se).",
  },
  {
    type: "ad" as const,
    title: "ARASAKA SECURITY PLUS",
    content: "Proteção familiar 24/7. Nossos agentes estão sempre observando. Sempre. Para sua segurança.",
  },
  {
    type: "malware" as const,
    title: "ALERTA DE SEGURANÇA",
    content: "SEU SISTEMA FOI COMPROMETIDO! 47 VÍRUS DETECTADOS! Clique AQUI para proteção instantânea! (Este é um anúncio)",
  },
  {
    type: "warning" as const,
    title: "NETWATCH MONITORING",
    content: "Sua atividade de rede foi registrada. ID de sessão: NC-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
  },
  {
    type: "subscription" as const,
    title: "MILITECH COMBAT INSURANCE",
    content: "Porque em Night City, você nunca sabe quando vai precisar de cobertura para 'acidentes de trabalho'. Planos a partir de €$99/mês.",
  },
  {
    type: "ad" as const,
    title: "CYBERWARE BLACK MARKET",
    content: "Implantes de QUALIDADE MILITAR. Sem perguntas. Sem registros. Contato via NET somente. Código: CHROME2045",
  },
  {
    type: "ad" as const,
    title: "BRAINDANCE PREMIUM",
    content: "Experiências que você não encontra em lugar nenhum. Catálogo exclusivo. Acesso VIP disponível. +18 apenas.",
  },
  {
    type: "warning" as const,
    title: "AVISO LEGAL",
    content: "Este site é monitorado pela Arasaka Digital Security Division. Todas as atividades são registradas conforme o Ato de Vigilância Corporativa de 2038.",
  },
  {
    type: "malware" as const,
    title: "PARABÉNS! VOCÊ GANHOU!",
    content: "Você é o visitante número 1.000.000! Clique para receber €$10.000 em créditos! (Oferta expira em 00:03:27)",
  },
  {
    type: "subscription" as const,
    title: "GHOST.NET VPN",
    content: "NetWatch não pode ver o que não existe. Navegue invisível. Plano anual com 70% OFF apenas HOJE!",
  },
];

export function PopupSystem() {
  const [popups, setPopups] = useState<Popup[]>([]);
  const [draggedPopup, setDraggedPopup] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const createRandomPopup = useCallback(() => {
    const template = popupTemplates[Math.floor(Math.random() * popupTemplates.length)];
    const newPopup: Popup = {
      id: Math.random().toString(36).substr(2, 9),
      ...template,
      x: Math.random() * (window.innerWidth - 350) + 50,
      y: Math.random() * (window.innerHeight - 250) + 100,
    };
    setPopups((prev) => [...prev.slice(-4), newPopup]);
  }, []);

  useEffect(() => {
    // Initial popup after 5 seconds
    const initialTimeout = setTimeout(createRandomPopup, 5000);

    // Random popups every 20-40 seconds
    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        createRandomPopup();
      }
    }, 25000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [createRandomPopup]);

  const closePopup = (id: string) => {
    setPopups((prev) => prev.filter((p) => p.id !== id));
  };

  const handleMouseDown = (e: React.MouseEvent, popupId: string, popup: Popup) => {
    setDraggedPopup(popupId);
    setDragOffset({
      x: e.clientX - popup.x,
      y: e.clientY - popup.y,
    });
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (draggedPopup) {
        setPopups((prev) =>
          prev.map((p) =>
            p.id === draggedPopup
              ? { ...p, x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y }
              : p
          )
        );
      }
    },
    [draggedPopup, dragOffset]
  );

  const handleMouseUp = useCallback(() => {
    setDraggedPopup(null);
  }, []);

  useEffect(() => {
    if (draggedPopup) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [draggedPopup, handleMouseMove, handleMouseUp]);

  const getPopupStyles = (type: Popup["type"]) => {
    switch (type) {
      case "malware":
        return "border-danger bg-danger/10";
      case "warning":
        return "border-warning bg-warning/10";
      case "subscription":
        return "border-accent bg-accent/10";
      default:
        return "border-primary bg-primary/10";
    }
  };

  const getIcon = (type: Popup["type"]) => {
    switch (type) {
      case "malware":
        return <Skull className="text-danger" size={18} />;
      case "warning":
        return <AlertTriangle className="text-warning" size={18} />;
      case "subscription":
        return <CreditCard className="text-accent" size={18} />;
      default:
        return <Zap className="text-primary" size={18} />;
    }
  };

  return (
    <>
      {popups.map((popup) => (
        <div
          key={popup.id}
          className={`fixed z-50 w-80 border-2 ${getPopupStyles(popup.type)} backdrop-blur-sm shadow-lg`}
          style={{ left: popup.x, top: popup.y }}
        >
          {/* Title Bar */}
          <div
            className="flex items-center justify-between px-3 py-2 bg-secondary/80 cursor-move"
            onMouseDown={(e) => handleMouseDown(e, popup.id, popup)}
          >
            <div className="flex items-center gap-2">
              {getIcon(popup.type)}
              <span className="text-sm font-mono font-semibold truncate">
                {popup.title}
              </span>
            </div>
            <button
              onClick={() => closePopup(popup.id)}
              className="p-1 hover:bg-primary/20 transition-colors"
            >
              <X size={14} />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 bg-card/90">
            <p className="text-sm text-foreground mb-4">{popup.content}</p>
            <div className="flex gap-2">
              <button
                onClick={() => closePopup(popup.id)}
                className="flex-1 py-2 bg-primary/20 border border-primary/50 text-primary text-xs font-mono hover:bg-primary/30 transition-colors"
              >
                ACEITAR
              </button>
              <button
                onClick={() => closePopup(popup.id)}
                className="flex-1 py-2 bg-secondary border border-muted text-muted-foreground text-xs font-mono hover:bg-muted/20 transition-colors"
              >
                IGNORAR
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

// Exportar função para criar popup manualmente
export function triggerPopup(setter: React.Dispatch<React.SetStateAction<Popup[]>>) {
  const template = popupTemplates[Math.floor(Math.random() * popupTemplates.length)];
  const newPopup: Popup = {
    id: Math.random().toString(36).substr(2, 9),
    ...template,
    x: Math.random() * (window.innerWidth - 350) + 50,
    y: Math.random() * (window.innerHeight - 250) + 100,
  };
  setter((prev) => [...prev.slice(-4), newPopup]);
}
