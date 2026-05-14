"use client";

import { Sidebar } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";
import { Article } from "@/components/article";
import { AdBanner } from "@/components/ad-banner";
import { Footer } from "@/components/footer";
import { PopupSystem } from "@/components/popup-system";
import { chidiArticle } from "@/lib/data";

export default function ChidiNikolicPage() {
  return (
    <div className="min-h-screen bg-background">
      <PopupSystem />
      <Navbar />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 lg:ml-64 p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {/* Ad Banner Top */}
            <AdBanner variant="header" />
            
            {/* Main Content */}
            <Article character={chidiArticle} />
            
            {/* Ad Banner Bottom */}
            <AdBanner variant="header" />
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}
