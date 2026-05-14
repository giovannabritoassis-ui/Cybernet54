"use client";

import { useState, useEffect } from "react";
import { Search, Bell, Volume2, VolumeX, AlertTriangle } from "lucide-react";

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleString("pt-BR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setCurrentTime(formatted.replace(",", " |"));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Random NetWatch notification
    const notificationInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 5000);
      }
    }, 30000);

    return () => {
      clearInterval(interval);
      clearInterval(notificationInterval);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`[NC-ARCHIVE] Pesquisa por "${searchQuery}" - Funcionalidade simulada`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 lg:left-64 h-14 bg-card/95 backdrop-blur border-b border-primary/30 z-30">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-xl ml-12 lg:ml-0">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Pesquisar no NC-Archive..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-secondary border border-primary/30 rounded-none py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors font-mono"
            />
          </div>
        </form>

        {/* Right Side */}
        <div className="flex items-center gap-4 ml-4">
          {/* Time */}
          <div className="hidden md:block text-xs font-mono text-muted-foreground">
            <span className="text-primary">NC-TIME:</span> {currentTime}
          </div>

          {/* Notifications */}
          <button
            className="relative p-2 hover:bg-primary/10 transition-colors"
            onClick={() => setShowNotification(!showNotification)}
          >
            <Bell size={18} className={showNotification ? "text-warning animate-pulse" : "text-foreground"} />
            {showNotification && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-warning rounded-full" />
            )}
          </button>

          {/* Audio Toggle */}
          <button
            className="p-2 hover:bg-primary/10 transition-colors"
            onClick={() => setAudioEnabled(!audioEnabled)}
          >
            {audioEnabled ? (
              <Volume2 size={18} className="text-success" />
            ) : (
              <VolumeX size={18} className="text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* NetWatch Notification */}
      {showNotification && (
        <div className="absolute top-full right-4 mt-2 w-80 bg-secondary border border-warning/50 p-3 animate-pulse">
          <div className="flex items-start gap-2">
            <AlertTriangle size={16} className="text-warning shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-mono text-warning font-semibold">
                [NETWATCH ALERT]
              </p>
              <p className="text-xs text-foreground mt-1">
                Atividade de monitoramento detectada. Sua sessão está sendo observada pelo protocolo NC-MONITOR-7.
              </p>
              <button
                onClick={() => setShowNotification(false)}
                className="text-xs text-primary mt-2 hover:underline"
              >
                [FECHAR]
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
