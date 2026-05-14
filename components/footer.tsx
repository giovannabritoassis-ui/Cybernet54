"use client";

import { Shield, AlertTriangle, Database } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-primary/30 bg-secondary/50">
      {/* Legal Warnings */}
      <div className="p-4 border-b border-primary/20 bg-danger/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-2">
            <AlertTriangle size={16} className="text-danger shrink-0 mt-0.5" />
            <div className="text-xs text-foreground space-y-2">
              <p>
                <strong className="text-danger">[AVISO LEGAL NC-7741]</strong> Este arquivo é propriedade do
                Conselho Municipal de Night City e está sujeito às leis de Proteção de Dados Corporativos de 2038.
                A reprodução não autorizada pode resultar em penalidades severas, incluindo multas de até
                €$500.000 e/ou prisão de até 10 anos.
              </p>
              <p>
                <strong className="text-warning">[MONITORAMENTO NETWATCH]</strong> Todas as atividades neste
                sistema são monitoradas e registradas pela NetWatch conforme o Ato de Vigilância Digital de
                2041. Ao acessar este arquivo, você concorda com os termos de monitoramento e coleta de dados.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Corporate Banners */}
      <div className="p-4 border-b border-primary/20">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-6 text-xs font-mono text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield size={14} className="text-primary" />
            <span>PROTEGIDO POR ARASAKA DIGITAL SECURITY</span>
          </div>
          <div className="flex items-center gap-2">
            <Database size={14} className="text-accent" />
            <span>HOSPEDADO EM NC-DATAFORT CENTRAL</span>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-muted-foreground">
            {/* About */}
            <div>
              <h4 className="font-display text-sm text-primary mb-2">NC WIKIPEDIA ARCHIVE</h4>
              <p className="leading-relaxed">
                O NC-Archive é o repositório público oficial de informações de Night City,
                mantido pelo Conselho Municipal em parceria com as principais corporações da cidade.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-display text-sm text-primary mb-2">LINKS CORPORATIVOS</h4>
              <ul className="space-y-1">
                <li><a href="#" className="hover:text-accent">Arasaka Corporation</a></li>
                <li><a href="#" className="hover:text-accent">Militech International</a></li>
                <li><a href="#" className="hover:text-accent">Trauma Team International</a></li>
                <li><a href="#" className="hover:text-accent">NetWatch Division</a></li>
              </ul>
            </div>

            {/* System Info */}
            <div>
              <h4 className="font-display text-sm text-primary mb-2">INFO DO SISTEMA</h4>
              <ul className="space-y-1 font-mono">
                <li>Versão: NC-ARCHIVE v2.045.7</li>
                <li>Última Atualização: 2045-03-15</li>
                <li>Servidor: NC-DATAFORT-07</li>
                <li>Status: OPERACIONAL</li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-6 pt-4 border-t border-primary/20 text-center">
            <p className="text-xs font-mono text-muted-foreground">
              © 2045 Night City Municipal Council. Todos os direitos reservados.
            </p>
            <p className="text-[10px] font-mono text-muted-foreground/50 mt-1">
              NC-ARCHIVE é uma marca registrada licenciada para uso pelo Conselho Corporativo de Night City.
              Este sistema é monitorado 24/7 pela NetWatch Digital Security Division.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
