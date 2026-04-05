import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Multi Tools - Collection of Web Utilities",
  description:
    "A collection of useful web tools including infinity scroll, keyboard test, mouse click test, and more.",
};

/**
 * RootLayout - The root layout for the entire application.
 * Provides ThemeProvider, TooltipProvider, Header, and Sidebar to all pages.
 * Server Component by default (no "use client" directive).
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {/* ThemeProvider must be client component but wraps the app */}
        <ThemeProvider
          enableSystem
          defaultTheme="system"
          disableTransitionOnChange={false}
        >
          <TooltipProvider delayDuration={300}>
            {/* Header with logo, user info, and theme toggle */}
            <Header />

            {/* Main layout: Sidebar (desktop) + Content area */}
            <div className="flex min-h-[calc(100vh-3.5rem)]">
              {/* Desktop sidebar - hidden on mobile */}
              <Sidebar />

              {/* Main content area */}
              <main className="flex-1">{children}</main>
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
