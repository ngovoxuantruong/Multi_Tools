"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * ThemeProvider - Wraps the app with next-themes to provide theme context.
 * - defaultTheme: "system" - follows system preference initially
 * - enableSystem: true - allows system preference as a choice
 * - disableTransitionOnChange: false - smooth theme transitions
 * - attribute: "class" - uses class-based dark mode detection
 */
export function ThemeProvider({
  children,
  ...props
}: {
  children: React.ReactNode;
  enableSystem?: boolean;
  defaultTheme?: string;
  disableTransitionOnChange?: boolean;
}) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
