import React, { useState } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function PublicLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getNavLinkClass = ({ isActive }) =>
    `text-sm transition-colors hover:text-primary ${
      isActive
        ? 'text-primary font-semibold border-b-2 border-primary pb-1'
        : 'text-secondary-foreground hover:text-foreground font-medium'
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-secondary selection:text-primary">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <aside className="bg-surface-container-high border-b border-border py-2 px-4 sm:px-6 text-xs transition-all">
        <div className="max-w-[76rem] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-warning animate-pulse" />
            <p className="text-secondary-foreground">
              <strong className="font-semibold text-primary">Next Hearth Drop:</strong> Friday Nov 15 ·{' '}
              <span className="font-mono font-semibold text-foreground">78%</span> pre-reserved · Porchside pickup at 42 Orchard Lane
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#drop-status"
              className="text-xs text-primary hover:underline font-semibold hidden sm:inline-flex items-center gap-1"
            >
              <span>View Batch Status</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </aside>

      {/* 2. STICKY CUSTOMER TOP APP BAR */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="max-w-[76rem] mx-auto px-4 sm:px-6 md:px-8 h-16 flex items-center justify-between">
          {/* Brand Anchor */}
          <Link to="/" className="flex flex-col group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
            <span className="font-serif text-2xl font-semibold tracking-tight text-primary group-hover:opacity-90 transition-opacity">
              Crumb &amp; Bloom
            </span>
            <span className="text-[10px] tracking-widest uppercase text-muted-foreground font-medium -mt-1">
              Micro-Bakery &amp; Hearth
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7">
            <NavLink to="/" className={getNavLinkClass}>
              Home
            </NavLink>
            <NavLink to="/login" className={getNavLinkClass}>
              Order Online
            </NavLink>
            <a href="#about" className="text-sm font-medium text-secondary-foreground hover:text-foreground transition-colors">
              About the Mill
            </a>
            <a href="#bakers-note" className="text-sm font-medium text-secondary-foreground hover:text-foreground transition-colors">
              Bakehouse Note
            </a>
          </nav>

          {/* Trailing Action Cluster */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger Placeholder */}
            <button
              type="button"
              aria-label="Search bakehouse offerings"
              className="p-2 text-secondary-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors duration-150"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account / Login Trigger */}
            <Link
              to="/login"
              aria-label="Customer account portal"
              className="p-2 text-secondary-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors duration-150"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart Primary Trigger Button */}
            <button
              type="button"
              aria-label="Shopping Cart with 2 items totaling $24.50"
              className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-3.5 py-2 rounded-xl text-sm font-medium shadow-sm transition-all duration-150 active:scale-[0.98] border border-primary/20"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden xs:inline">Cart</span>
              <span className="inline-flex items-center bg-[#54220B] text-primary-foreground text-xs font-mono px-2 py-0.5 rounded-full font-semibold">
                2 · $24.50
              </span>
            </button>

            {/* Quick Switch to Back of House (App Shell) */}
            <Link to="/app" className="hidden lg:inline-block">
              <Button size="sm" variant="outline" className="text-xs">
                Bakehouse Hub
              </Button>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-foreground hover:bg-muted rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-border bg-background px-4 pt-2 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-150">
            <nav className="flex flex-col space-y-1">
              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-muted transition-colors min-h-[44px] flex items-center"
              >
                Home
              </NavLink>
              <NavLink
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-muted transition-colors min-h-[44px] flex items-center"
              >
                Order Online
              </NavLink>
              <NavLink
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-muted transition-colors min-h-[44px] flex items-center"
              >
                Customer Sign In
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-muted transition-colors min-h-[44px] flex items-center"
              >
                Create Account
              </NavLink>
              <Link
                to="/app"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-semibold text-primary hover:bg-muted transition-colors min-h-[44px] flex items-center justify-between"
              >
                <span>Bakehouse Staff Hub</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* 3. MAIN STOREFRONT CONTENT */}
      <main className="flex-1 w-full max-w-[76rem] mx-auto px-4 sm:px-6 md:px-8 py-8">
        <Outlet />
      </main>

      {/* 4. TACTILE STOREFRONT FOOTER */}
      <footer className="border-t border-border bg-card/50 py-8 text-center text-xs text-muted-foreground">
        <div className="max-w-[76rem] mx-auto px-4 space-y-2">
          <p className="font-serif text-sm font-semibold text-foreground">
            Crumb &amp; Bloom Micro-Bakery &amp; Hearth
          </p>
          <p>
            Naturally Leavened Bread &amp; Heritage Grain Confections • 36-Hour Wild Fermentation • 42 Orchard Lane
          </p>
          <p className="text-[11px] text-muted-foreground pt-2">
            SE3090 Mini Hackathon Frontend Foundation • React 18 + Tailwind CSS + shadcn/ui
          </p>
        </div>
      </footer>
    </div>
  );
}
