import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function NotFoundPage() {
  const location = useLocation();

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center">
        <CardHeader className="space-y-2">
          <div className="flex justify-center">
            <Badge variant="destructive" className="text-xs px-3 py-1 font-mono">
              Error 404
            </Badge>
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">Page Not Found</CardTitle>
          <CardDescription className="text-sm">
            The requested page does not exist or has been moved.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-xs text-muted-foreground">
            Attempted route:{' '}
            <code className="bg-muted px-2 py-1 rounded font-mono text-foreground font-semibold">
              {location.pathname}
            </code>
          </p>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-4">
          <Link to="/">
            <Button variant="default">
              Return to Home Page
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
