import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Neutral Welcome Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="outline">Route: /</Badge>
            <Badge variant="secondary">Step 4 Complete</Badge>
          </div>
          <CardTitle className="text-2xl mt-2">React Router Foundation</CardTitle>
          <CardDescription>
            Clean client routing architecture configured for the hackathon application. The final problem domain is not yet selected.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This landing page serves as the entrypoint to test navigation flows across public, authentication, and application layouts without page reloads.
          </p>

          <div className="rounded-lg border p-4 bg-muted/30 space-y-3">
            <h3 className="text-sm font-semibold">Route Verification Navigation</h3>
            <div className="flex flex-wrap gap-2.5">
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Test /login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" size="sm">
                  Test /register
                </Button>
              </Link>
              <Link to="/app">
                <Button variant="default" size="sm">
                  Test /app (Protected Layout)
                </Button>
              </Link>
              <Link to="/this-route-does-not-exist">
                <Button variant="destructive" size="sm">
                  Test 404 Route
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground border-t pt-4">
          Navigation handled via HTML5 History API (client-side routing).
        </CardFooter>
      </Card>
    </div>
  );
}
