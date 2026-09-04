import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function PublicLayout() {
  const getNavLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      isActive ? 'text-primary underline underline-offset-4' : 'text-muted-foreground'
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Public Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="font-bold tracking-tight text-lg hover:opacity-90 transition-opacity">
              SE3090 Hackathon
            </Link>
            <Badge variant="outline" className="hidden sm:inline-flex text-xs">
              Public Foundation
            </Badge>
          </div>

          <nav className="flex items-center gap-4 sm:gap-6">
            <NavLink to="/" className={getNavLinkClass}>
              Home
            </NavLink>
            <NavLink to="/login" className={getNavLinkClass}>
              Login
            </NavLink>
            <NavLink to="/register" className={getNavLinkClass}>
              Register
            </NavLink>
            <Link to="/app">
              <Button size="sm" variant="default">
                Launch App
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Public Content */}
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Public Footer */}
      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        SE3090 Mini Hackathon • Frontend Foundation (React Router + Vite + Tailwind + shadcn/ui)
      </footer>
    </div>
  );
}
