import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-muted/20 text-foreground">
      {/* Application Shell Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-card">
        <div className="container max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/app" className="font-bold tracking-tight text-lg text-primary">
              App Shell
            </Link>
            <Badge variant="secondary" className="text-xs">
              Protected Layout Template
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground hidden sm:inline-block">
              Session: Placeholder Auth
            </span>
            <Link to="/">
              <Button size="sm" variant="outline">
                Exit to Public Site
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main App Content Area */}
      <main className="flex-1 container max-w-6xl mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Minimal App Footer */}
      <footer className="border-t py-4 text-center text-xs text-muted-foreground bg-card">
        Application Shell • Ready for domain page modules
      </footer>
    </div>
  );
}
