import { Sidebar } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PopupSystem } from "@/components/popup-system";

export default function WikiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Sidebar />
      <Navbar />
      <PopupSystem />

      <main className="lg:ml-64 pt-14 min-h-screen">
        <div className="p-4 lg:p-8">
          {children}
        </div>
        <Footer />
      </main>
    </div>
  );
}
