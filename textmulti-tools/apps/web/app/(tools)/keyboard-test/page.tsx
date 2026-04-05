import { Keyboard } from "lucide-react";

export default function KeyboardTestPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:px-6">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Keyboard className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Keyboard Test</h1>
          <p className="text-sm text-muted-foreground">
            Virtual keyboard testing tool
          </p>
        </div>
      </div>
      <div className="rounded-lg border border-dashed p-12 text-center">
        <p className="text-muted-foreground">
          Tool coming soon...
        </p>
      </div>
    </div>
  );
}
