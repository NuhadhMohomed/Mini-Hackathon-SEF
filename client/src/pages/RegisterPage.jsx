import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function RegisterPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Register</CardTitle>
            <Badge variant="outline">Route: /register</Badge>
          </div>
          <CardDescription>
            User registration placeholder. Account creation will be hooked to auth APIs later.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground" htmlFor="reg-email">
                Email Address
              </label>
              <Input
                id="reg-email"
                type="email"
                placeholder="name@example.com"
                disabled
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground" htmlFor="reg-password">
                Password
              </label>
              <Input
                id="reg-password"
                type="password"
                placeholder="••••••••"
                disabled
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground" htmlFor="reg-confirm">
                Confirm Password
              </label>
              <Input
                id="reg-confirm"
                type="password"
                placeholder="••••••••"
                disabled
              />
            </div>
            <Button type="submit" className="w-full" disabled>
              Create Account (Auth Pending)
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 border-t pt-4 text-xs text-muted-foreground text-center">
          <div>
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Log in here
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
