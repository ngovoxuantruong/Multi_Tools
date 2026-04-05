"use client";

import Link from "next/link";
import { Menu, Wrench } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { SidebarNav } from "@/components/layout/Sidebar";

/**
 * Header - Main header component displayed at the top of the page.
 * Contains logo, user info, theme toggle, and mobile menu trigger.
 */
export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4 md:px-6">
        {/* Left section: Mobile menu + Logo */}
        <div className="flex items-center gap-3">
          {/* Mobile: Sheet trigger for sidebar */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              {/* Mobile sidebar - show full navigation */}
              <div className="flex h-14 items-center border-b px-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-bold text-lg"
                >
                  <Wrench className="h-5 w-5 text-primary" />
                  <span>Multi Tools</span>
                </Link>
              </div>
              <SidebarNav pathname={pathname} isMobile />
            </SheetContent>
          </Sheet>

          {/* Desktop: Logo */}
          <Link
            href="/"
            className="hidden items-center gap-2 font-bold text-lg lg:flex"
          >
            <Wrench className="h-5 w-5 text-primary" />
            <span>Multi Tools</span>
          </Link>
        </div>

        {/* Right section: User info + Theme toggle */}
        <div className="flex items-center gap-2">
          {/* User placeholder */}
          <div className="hidden items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-sm text-muted-foreground md:flex">
            <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-xs font-medium text-primary">U</span>
            </div>
            <span>Guest User</span>
          </div>

          {/* Theme toggle */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
