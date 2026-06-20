/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Carbon Aware | Environmental Tracking",
  description: "A comprehensive carbon footprint tracker designed to help individuals calculate, monitor, and reduce their environmental impact to support global biodiversity and climate action.",
  keywords: "carbon footprint tracker, biodiversity, climate action, environmental sustainability, ESG software, Hack2Skill, emissions calculator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Inter:wght@400;500;600&family=Hanken+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning className="bg-background text-on-background font-body-md overflow-x-hidden antialiased flex flex-col min-h-screen">
        {/* Navigation Bar */}
        <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-sm h-20 flex items-center">
          <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop w-full flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 font-headline-md text-headline-md font-bold text-primary hover:opacity-80 transition-opacity">
              <span className="material-symbols-outlined text-3xl">eco</span>
              <span>CarbonAware</span>
            </Link>
            <div className="hidden md:flex items-center gap-8 font-body-md font-medium">
              <Link href="/dashboard" className="text-on-surface-variant hover:text-primary transition-colors">Live Dashboard</Link>
              <Link href="/activity" className="text-on-surface-variant hover:text-primary transition-colors">Calculate Impact</Link>
              <Link href="/insights" className="text-on-surface-variant hover:text-primary transition-colors">Global Insights</Link>
              <Link href="/leaderboard" className="text-on-surface-variant hover:text-primary transition-colors">Leaderboard</Link>
            </div>
            <div className="flex items-center gap-4">
               <Link href="/activity" className="bg-primary hover:bg-secondary text-white px-6 py-2 rounded-xl font-bold shadow-sm hover:shadow-primary/20 transition-all hidden md:block">
                  Log Activity
               </Link>
            </div>
          </div>
        </nav>
        
        {/* Main Content */}
        <main className="flex-grow pt-20">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-surface-container-low w-full mt-auto border-t border-outline-variant/30">
          <div className="flex flex-col md:flex-row justify-between items-center max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-12 gap-8">
            <div className="flex items-center gap-2 font-headline-sm text-headline-md font-bold text-primary">
              <span className="material-symbols-outlined text-3xl">eco</span>
              <span>CarbonAware</span>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-body-sm font-body-sm">
              <a className="text-on-surface-variant hover:text-secondary hover:underline decoration-secondary/30 transition-colors" href="#">Privacy Policy</a>
              <a className="text-on-surface-variant hover:text-secondary hover:underline decoration-secondary/30 transition-colors" href="#">Terms of Service</a>
              <a className="text-on-surface-variant hover:text-secondary hover:underline decoration-secondary/30 transition-colors" href="#">Contact Us</a>
              <a className="text-on-surface-variant hover:text-secondary hover:underline decoration-secondary/30 transition-colors" href="#">Resources</a>
            </div>
            <div className="text-body-sm text-on-surface-variant opacity-80">
                2026 CarbonAware. Together for a Low-Carbon Future.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
