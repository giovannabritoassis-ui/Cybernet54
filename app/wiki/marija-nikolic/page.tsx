"use client";

import { Sidebar } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";
import { Article } from "@/components/article";
import { AdBanner } from "@/components/ad-banner";
import { Footer } from "@/components/footer";
import { PopupSystem } from "@/components/popup-system";
import { marijaArticle } from "@/lib/data";

export default function MarijaNikolicPage() {
  return (
    <div className="min-h-screen bg-background">
      <PopupSystem />
      <Navbar />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 lg:ml-64 p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            <AdBanner variant="banner" />
            <Article character={marijaArticle} />
            <AdBanner variant="banner" />
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}
