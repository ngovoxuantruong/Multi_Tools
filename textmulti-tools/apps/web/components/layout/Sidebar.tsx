"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  ScrollText,
  Keyboard,
  MousePointer,
  Globe,
  ChevronRight,
  FolderOpen,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * Navigation items definition - each tool gets its own route.
 * icon: Lucide icon component
 * label: Display name in sidebar
 * href: Next.js route path
 */
const navItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Infinity Scroll",
    href: "/infinity-scroll",
    icon: ScrollText,
  },
  {
    label: "Keyboard Test",
    href: "/keyboard-test",
    icon: Keyboard,
  },
  {
    label: "Mouse Click Test",
    href: "/mouse-click-test",
    icon: MousePointer,
  },
  {
    label: "What is My IP",
    href: "/whatismyip",
    icon: Globe,
  },
];

/**
 * NavLink - Individual navigation item with active state support.
 * Shows tooltip on collapsed sidebar (desktop).
 */
function NavLink({
  href,
  label,
  icon: Icon,
  isActive,
  isCollapsed,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive: boolean;
  isCollapsed?: boolean;
}) {
  const linkContent = (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        isCollapsed && "justify-center px-2"
      )}
    >
      <Icon
        className={cn(
          "h-4 w-4 shrink-0",
          isActive ? "text-primary" : "text-muted-foreground"
        )}
      />
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );

  // Show tooltip when collapsed
  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
        <TooltipContent side="right" className="flex items-center gap-2">
          {label}
        </TooltipContent>
      </Tooltip>
    );
  }

  return linkContent;
}

/**
 * SidebarNav - Full sidebar navigation component.
 * Renders all navigation items with scroll area.
 */
export function SidebarNav({
  pathname,
  isMobile = false,
}: {
  pathname: string;
  isMobile?: boolean;
}) {
  return (
    <ScrollArea className="flex-1 px-3 py-4">
      <div className="flex flex-col gap-1">
        {/* Navigation items */}
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            isActive={pathname === item.href}
          />
        ))}

        <Separator className="my-3" />

        {/* More Tools section - placeholder for future tools */}
        <div
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground",
            !isMobile && "cursor-not-allowed opacity-60"
          )}
        >
          <FolderOpen className="h-4 w-4 shrink-0" />
          {!isMobile && (
            <>
              <span className="flex-1">More Tools</span>
              <ChevronRight className="h-3 w-3" />
            </>
          )}
        </div>
      </div>
    </ScrollArea>
  );
}

/**
 * Sidebar - Desktop sidebar with collapse functionality.
 * Hidden on mobile (Header handles mobile navigation).
 */
export function Sidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r bg-card lg:flex">
      <SidebarNav pathname="/" isMobile={false} />
    </aside>
  );
}
