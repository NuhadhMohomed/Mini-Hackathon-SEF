import React, { useState } from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import {
  Flame,
  LayoutDashboard,
  Store,
  Receipt,
  Package,
  Calendar,
  Sliders,
  ArrowUpRight,
  Menu,
  X,
  Plus
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function AppLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const getNavLinkClass = ({ isActive }) =>
    `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
      isActive
        ? 'bg-card text-primary font-semibold border-l-4 border-primary shadow-xs'
        : 'text-secondary-foreground hover:text-foreground hover:bg-surface-container font-medium'
    }`;

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full p-4 select-none">
      {/* Upper Area */}
      <div className="space-y-4">
        {/* Brand Header with Hearth Seal */}
        <div className="flex items-center gap-3 px-1 py-1">
          <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shadow-sm shrink-0">
            <Flame className="w-5 h-5" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-serif text-lg font-semibold tracking-tight text-foreground truncate leading-tight">
              Crumb &amp; Bloom
            </span>
            <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
              Bakehouse Hub · Ops
            </span>
          </div>
        </div>

        {/* Quick CTA Button: Schedule New Batch */}
        <Button
          className="w-full justify-center gap-2 shadow-sm text-sm"
          onClick={() => {}}
        >
          <Plus className="w-4 h-4" />
          <span>Schedule New Batch</span>
        </Button>

        {/* Navigation Sections */}
        <nav className="space-y-1 pt-2">
          <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Operations
          </div>

          <NavLink to="/app" end className={getNavLinkClass} onClick={() => setMobileSidebarOpen(false)}>
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-4 h-4 text-primary" />
              <span>Dashboard</span>
            </div>
            <span className="bg-primary text-primary-foreground font-mono text-[10px] px-1.5 py-0.5 rounded-full font-semibold">
              Live
            </span>
          </NavLink>

          <NavLink to="/app/products" className={getNavLinkClass} onClick={() => setMobileSidebarOpen(false)}>
            <div className="flex items-center gap-3">
              <Store className="w-4 h-4 text-primary" />
              <span>Products</span>
            </div>
            <span className="font-mono text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
              6
            </span>
          </NavLink>

          <NavLink to="/app/orders" className={getNavLinkClass} onClick={() => setMobileSidebarOpen(false)}>
            <div className="flex items-center gap-3">
              <Receipt className="w-4 h-4 text-primary" />
              <span>Orders</span>
            </div>
            <span className="font-mono text-xs font-semibold text-primary bg-secondary px-2 py-0.5 rounded-full">
              4
            </span>
          </NavLink>

          <NavLink to="/app/inventory" className={getNavLinkClass} onClick={() => setMobileSidebarOpen(false)}>
            <div className="flex items-center gap-3">
              <Package className="w-4 h-4 text-primary" />
              <span>Inventory</span>
            </div>
            <Badge variant="warning" dot={true} className="text-[10px] px-1.5 py-0.2">
              3 Low
            </Badge>
          </NavLink>

          <a
            href="#schedule"
            className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-secondary-foreground hover:text-foreground hover:bg-surface-container font-medium transition-colors"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>Bake Schedule</span>
            </div>
            <span className="font-mono text-[11px] text-success bg-success-bg px-1.5 py-0.5 rounded font-semibold">
              Fri Drop
            </span>
          </a>
        </nav>
      </div>

      {/* Sidebar Lower / Footer Section */}
      <div className="pt-4 border-t border-border space-y-3">
        {/* Switch to Storefront Button */}
        <Link
          to="/"
          className="flex items-center justify-between p-2.5 rounded-lg bg-card hover:bg-muted border border-border text-sm font-medium text-foreground transition-colors group"
        >
          <div className="flex items-center gap-2">
            <Store className="w-4 h-4 text-primary" />
            <span>Storefront Hub</span>
          </div>
          <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </Link>

        {/* Hearth Settings Link */}
        <a
          href="#settings"
          className="flex items-center gap-2.5 px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Sliders className="w-4 h-4" />
          <span>Hearth Settings</span>
        </a>

        {/* Baker Profile Indicator */}
        <div className="pt-2 border-t border-border flex items-center justify-between px-1">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-secondary text-primary font-semibold text-xs flex items-center justify-center border border-border shrink-0">
              JH
            </div>
            <div className="flex flex-col truncate">
              <span className="text-xs font-semibold text-foreground truncate leading-tight">
                Julian Hayes
              </span>
              <span className="text-[10px] text-muted-foreground truncate">
                Head Baker &amp; Owner
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-secondary selection:text-primary">
      {/* 1. DESKTOP FIXED SIDEBAR NAVIGATION (w-64 / 16rem) */}
      <aside className="hidden lg:block fixed left-0 top-0 h-screen w-64 bg-surface-container-low border-r border-border z-30">
        {sidebarContent}
      </aside>

      {/* 2. MOBILE / TABLET SLIDING DRAWER BACKDROP */}
      {mobileSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40 transition-opacity"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* 2b. MOBILE / TABLET SLIDING SIDEBAR */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 w-64 bg-surface-container-low border-r border-border z-50 transform transition-transform duration-200 ease-in-out ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="absolute top-3 right-3">
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(false)}
            className="p-1 text-muted-foreground hover:text-foreground rounded-lg"
            aria-label="Close staff navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {sidebarContent}
      </div>

      {/* 3. MAIN STAFF CONTENT WRAPPER (Shifted by 16rem on Desktop) */}
      <div className="lg:pl-64 flex-1 flex flex-col min-w-0">
        {/* Top Operational Header Bar */}
        <header className="sticky top-0 z-20 h-16 w-full border-b border-border bg-background/90 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 md:px-8">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 text-foreground hover:bg-muted rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Open staff navigation"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb / Title Context */}
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-semibold text-primary">
                Bakehouse Operations
              </span>
              <Badge variant="success" dot={true} className="hidden sm:inline-flex text-[11px]">
                Hearth Stone 240°C · Ready
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-muted-foreground hidden md:inline-block">
              Batch #84 · Friday Dawn Bake
            </span>
            <Link to="/">
              <Button size="sm" variant="outline" className="text-xs">
                Exit to Store
              </Button>
            </Link>
          </div>
        </header>

        {/* Main Operational Canvas */}
        <main className="flex-1 w-full max-w-[76rem] mx-auto px-4 sm:px-6 md:px-8 py-8">
          <Outlet />
        </main>

        {/* Operational Footer */}
        <footer className="border-t border-border bg-card/40 py-4 text-center text-xs text-muted-foreground">
          Crumb &amp; Bloom Bakehouse Operations Hub • SE3090 Mini Hackathon Foundation
        </footer>
      </div>
    </div>
  );
}
