import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { api, setAuthSession } from '@/lib/api';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setErrorMessage('Please fill in all required fields');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await api.post('/auth/register', {
        name,
        email,
        phone: phone || '+1 (555) 000-0000',
        password,
        address: 'Porchside Pickup · 42 Orchard Lane',
      });

      setAuthSession(res.token, {
        role: res.role || 'customer',
        email: res.email,
        name: res.name,
      });

      setSuccessMessage('Account created successfully! Welcome to Crumb & Bloom.');
      setTimeout(() => {
        navigate('/my-orders');
      }, 700);
    } catch (err) {
      setErrorMessage(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-8 px-4">
      <Card className="border-border shadow-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-serif font-semibold text-foreground">
              Create Patron Account
            </CardTitle>
            <Badge variant="outline" className="text-xs">Crumb &amp; Bloom</Badge>
          </div>
          <CardDescription className="text-sm text-secondary-foreground">
            Register to track weekly sourdough hearth reservations and receive Porchside locker PINs.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {errorMessage && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-success-bg border border-success/30 text-success-text rounded-lg text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-success" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground" htmlFor="reg-name">
                Full Name
              </label>
              <Input
                id="reg-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Elena Rostova"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground" htmlFor="reg-email">
                Email Address
              </label>
              <Input
                id="reg-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="elena@example.com"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground" htmlFor="reg-phone">
                Phone Number (for SMS pickup alerts)
              </label>
              <Input
                id="reg-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 345-6789"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground" htmlFor="reg-password">
                Password
              </label>
              <Input
                id="reg-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground" htmlFor="reg-confirm">
                Confirm Password
              </label>
              <Input
                id="reg-confirm"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <Button type="submit" className="w-full font-medium pt-2" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
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
