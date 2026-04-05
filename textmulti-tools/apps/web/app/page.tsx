import Link from "next/link";
import {
  ScrollText,
  Keyboard,
  MousePointer,
  Globe,
  ArrowRight,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

/**
 * Tool cards data - defines the tools that will be available.
 * Each card links to its respective route.
 */
const toolCards = [
  {
    title: "Infinity Scroll",
    description:
      "Test and experience smooth infinite scrolling with various content types and performance monitoring.",
    href: "/infinity-scroll",
    icon: ScrollText,
    comingSoon: false,
  },
  {
    title: "Keyboard Test",
    description:
      "Virtual keyboard for testing key presses, detecting stuck keys, and checking keyboard layouts.",
    href: "/keyboard-test",
    icon: Keyboard,
    comingSoon: false,
  },
  {
    title: "Mouse Click Test",
    description:
      "Test your mouse click speed, accuracy, and performance with various challenge modes.",
    href: "/mouse-click-test",
    icon: MousePointer,
    comingSoon: false,
  },
  {
    title: "What is My IP",
    description:
      "Quickly display your public IP address and location information.",
    href: "/whatismyip",
    icon: Globe,
    comingSoon: false,
  },
];

/**
 * Dashboard - The home page of the Multi Tools application.
 * Displays a welcome message and grid of available tools.
 * Server Component - fetches no client data.
 */
export default function Dashboard() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 md:px-6">
      {/* Hero section */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Welcome to Multi Tools
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          A collection of useful web utilities. Choose a tool from the sidebar
          or explore the options below.
        </p>
      </div>

      <Separator className="mb-10" />

      {/* Available tools section */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Available Tools
          </h2>
          <p className="text-sm text-muted-foreground">
            Click on any tool to start using it
          </p>
        </div>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {toolCards.length} Tools
        </span>
      </div>

      {/* Tools grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {toolCards.map((tool) => {
          const Icon = tool.icon;
          return (
            <Card
              key={tool.href}
              className="group relative overflow-hidden transition-all hover:border-primary/50 hover:shadow-md"
            >
              {/* Hover indicator line */}
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 transition-opacity group-hover:opacity-100" />

              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{tool.title}</CardTitle>
                    {tool.comingSoon && (
                      <span className="text-xs text-muted-foreground">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <CardDescription className="mb-4 line-clamp-3">
                  {tool.description}
                </CardDescription>

                <Button
                  variant="secondary"
                  size="sm"
                  className="group/btn w-full gap-1.5"
                  asChild
                  disabled={tool.comingSoon}
                >
                  <Link href={tool.href}>
                    Open Tool
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Call to action for future tools */}
      <div className="mt-10 rounded-lg border border-dashed p-6 text-center">
        <p className="text-sm text-muted-foreground">
          More tools are coming soon. Stay tuned for regular updates!
        </p>
      </div>
    </div>
  );
}
