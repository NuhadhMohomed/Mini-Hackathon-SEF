import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PageHeader({
  title,
  subtitle,
  breadcrumbs = [],
  action,
  className,
}) {
  return (
    <div
      className={cn(
        'flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/80 pb-6',
        className
      )}
    >
      <div className="space-y-1.5 min-w-0">
        {/* Breadcrumb Navigation */}
        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground font-sans">
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <React.Fragment key={idx}>
                  {idx > 0 && <ChevronRight className="w-3 h-3 text-muted-foreground/60 shrink-0" />}
                  {crumb.href && !isLast ? (
                    <Link
                      to={crumb.href}
                      className="hover:text-primary transition-colors truncate max-w-[140px]"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className={cn('truncate max-w-[180px]', isLast && 'text-foreground font-semibold')}>
                      {crumb.label}
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        )}

        {/* Title & Subtitle */}
        <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs sm:text-sm text-muted-foreground font-sans max-w-3xl">
            {subtitle}
          </p>
        )}
      </div>

      {/* Action / Controls Slot */}
      {action && (
        <div className="flex items-center gap-2.5 shrink-0 self-start md:self-end">
          {action}
        </div>
      )}
    </div>
  );
}
