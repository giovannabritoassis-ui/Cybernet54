"use client";

import { Sidebar } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";
import { Infobox } from "@/components/infobox";
import { Article } from "@/components/article";
import { AdBanner } from "@/components/ad-banner";
import { Footer } from "@/components/footer";
import { PopupSystem } from "@/components/popup-system";
import { marijaNikolic } from "@/lib/data";

export default function MarijaNikolicPage() {
  return (
    <div className="min-h-screen bg-background">
      <PopupSystem />
      <Navbar />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            <AdBanner position="top" />
            
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <Article character={marijaNikolic} />
              </div>
              
              <aside className="lg:w-80">
                <Infobox character={marijaNikolic} />
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
