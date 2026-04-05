/**
 * Tools Layout - Shared layout for all tool pages in the (tools) route group.
 * This layout wraps all tool pages with consistent styling and structure.
 */
export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
