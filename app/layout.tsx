import type { Metadata, Viewport } from "next";
import { Orbitron, Rajdhani, Share_Tech_Mono } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const shareTechMono = Share_Tech_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NC WIKIPEDIA ARCHIVE | Night City Public Database",
  description: "Night City Public Encyclopedia Archive - NetWatch Monitored Database System 2045",
};

export const viewport: Viewport = {
  themeColor: "#ff0033",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${orbitron.variable} ${rajdhani.variable} ${shareTechMono.variable} bg-background`}>
      <body className="antialiased crt-scanlines noise-overlay">
        {children}
      </body>
    </html>
  );
}
