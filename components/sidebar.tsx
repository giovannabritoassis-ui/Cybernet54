"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Home,
  Search,
  Users,
  FileText,
  Shield,
  AlertTriangle,
  Database,
  Menu,
  X,
  Wifi,
  WifiOff,
} from "lucide-react";

const navItems = [
  { label: "Página Principal", href: "/", icon: Home },
  { label: "Pesquisar", href: "#search", icon: Search },
  { label: "Pessoas", href: "#", icon: Users },
  { label: "Corporações", href: "#", icon: FileText },
  { label: "NetWatch", href: "#", icon: Shield },
  { label: "Alertas", href: "#", icon: AlertTriangle },
  { label: "Database", href: "#", icon: Database },
];

const familyLinks = [
  { label: "Chidi Nikolic", href: "/wiki/chidi-nikolic", status: "public" },
  { label: "Eleanor Moreau Nikolic", href: "/wiki/eleanor-nikolic", status: "public" },
  { label: "Daniela Nikolic", href: "/wiki/daniela-nikolic", status: "public" },
  { label: "Sophia Nikolic", href: "/wiki/sophia-nikolic", status: "public" },
  { label: "Marija Nikolic", href: "/wiki/marija-nikolic", status: "public" },
  { label: "Martin Nikolic", href: "/wiki/martin-nikolic", status: "restricted" },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [networkStatus, setNetworkStatus] = useState(true);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-secondary border border-primary/50 text-primary lg:hidden"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-card border-r border-primary/30 z-40 transform transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-primary/30">
          <Link href="/" className="block">
            <h1 className="font-display text-lg text-primary crt-glow">NC ARCHIVE</h1>
            <p className="text-xs text-muted-foreground font-mono">WIKIPEDIA v2.045</p>
          </Link>
        </div>

        {/* Network Status */}
        <div className="p-3 border-b border-primary/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {networkStatus ? (
              <Wifi size={14} className="text-success animate-pulse" />
            ) : (
              <WifiOff size={14} className="text-danger" />
            )}
            <span className="text-xs font-mono text-muted-foreground">
              {networkStatus ? "CONECTADO" : "OFFLINE"}
            </span>
          </div>
          <button
            onClick={() => setNetworkStatus(!networkStatus)}
            className="text-xs text-primary/70 hover:text-primary"
          >
            [SIM]
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-2">
          <p className="text-xs text-muted-foreground px-2 py-1 font-mono">// NAVEGAÇÃO</p>
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <item.icon size={16} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Family Links */}
        <div className="p-2 border-t border-primary/20">
          <p className="text-xs text-muted-foreground px-2 py-1 font-mono">// FAMÍLIA NIKOLIC</p>
          {familyLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`flex items-center gap-2 px-3 py-1.5 text-sm transition-colors ${
                link.status === "restricted"
                  ? "text-danger/70 hover:text-danger"
                  : "text-accent/70 hover:text-accent"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.status === "restricted" && <AlertTriangle size={12} />}
              <span>{link.label}</span>
              {link.status === "restricted" && (
                <span className="text-xs ml-auto">[RESTRITO]</span>
              )}
            </Link>
          ))}
        </div>

        {/* Online Users */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-primary/20 bg-secondary/50">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-muted-foreground">Usuários Online:</span>
            <span className="text-success">{Math.floor(Math.random() * 1000 + 500)}</span>
          </div>
          <div className="flex items-center justify-between text-xs font-mono mt-1">
            <span className="text-muted-foreground">NetWatch Ativo:</span>
            <span className="text-warning animate-pulse">MONITORANDO</span>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
