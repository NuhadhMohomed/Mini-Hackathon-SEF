import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function LoginPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Login</CardTitle>
            <Badge variant="outline">Route: /login</Badge>
          </div>
          <CardDescription>
            Authentication route placeholder. Full auth logic will be implemented in future phases.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground" htmlFor="login-email">
                Email Address
              </label>
              <Input
                id="login-email"
                type="email"
                placeholder="name@example.com"
                disabled
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground" htmlFor="login-password">
                Password
              </label>
              <Input
                id="login-password"
                type="password"
                placeholder="••••••••"
                disabled
              />
            </div>
            <Button type="submit" className="w-full" disabled>
              Sign In (Auth Pending)
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 border-t pt-4 text-xs text-muted-foreground text-center">
          <div>
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-primary hover:underline font-medium">
              Register here
            </Link>
          </div>
          <Link to="/" className="text-xs text-muted-foreground hover:underline">
            &larr; Back to Home
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
