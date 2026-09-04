import React from 'react';
import { Badge } from '@/components/ui/badge';

export default function RootLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="border-b bg-card">
        <div className="container max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold tracking-tight text-lg">SE3090 Mini Hackathon</span>
            <Badge variant="outline" className="text-xs">
              Foundation
            </Badge>
          </div>
          <div className="text-xs text-muted-foreground">
            React + Vite + Tailwind + shadcn/ui
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-5xl mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        SE3090 Mini Hackathon Technical Foundation • MERN Stack (JavaScript)
      </footer>
    </div>
  );
}
