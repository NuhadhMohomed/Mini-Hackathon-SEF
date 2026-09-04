import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function TestFoundationPage() {
  const [clickCount, setClickCount] = useState(0);
  const [healthStatus, setHealthStatus] = useState(null);
  const [loadingHealth, setLoadingHealth] = useState(false);
  const [healthError, setHealthError] = useState(null);

  const testBackendHealth = async () => {
    setLoadingHealth(true);
    setHealthError(null);
    try {
      const res = await fetch('/api/health');
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      const data = await res.json();
      setHealthStatus(data);
    } catch (err) {
      setHealthError(err.message);
    } finally {
      setLoadingHealth(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Frontend Foundation Verification</CardTitle>
            <Badge variant="secondary">UI Verified</Badge>
          </div>
          <CardDescription>
            Validates Tailwind CSS styling tokens, path alias resolution, and shadcn/ui component integration.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="rounded-md border p-4 bg-muted/40 space-y-3">
            <h4 className="text-sm font-semibold">1. Component Test: shadcn/ui Buttons</h4>
            <div className="flex flex-wrap gap-3 items-center">
              <Button onClick={() => setClickCount((c) => c + 1)}>
                Default Button ({clickCount} clicks)
              </Button>
              <Button variant="secondary" onClick={() => setClickCount(0)}>
                Reset Count
              </Button>
              <Button variant="outline">Outline Variant</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </div>

          <div className="rounded-md border p-4 bg-muted/40 space-y-3">
            <h4 className="text-sm font-semibold">2. Integration Test: Backend Connectivity</h4>
            <p className="text-xs text-muted-foreground">
              Tests communication with Express backend via the configured Vite proxy at <code>/api/health</code>.
            </p>
            <Button
              variant="outline"
              onClick={testBackendHealth}
              disabled={loadingHealth}
            >
              {loadingHealth ? 'Querying /api/health...' : 'Test Backend Health'}
            </Button>

            {healthError && (
              <div className="text-xs text-destructive bg-destructive/10 border border-destructive/20 p-2.5 rounded">
                Health check notice: {healthError} (ensure backend server is running on port 5000)
              </div>
            )}

            {healthStatus && (
              <pre className="text-xs bg-card border p-3 rounded overflow-x-auto font-mono text-muted-foreground">
                {JSON.stringify(healthStatus, null, 2)}
              </pre>
            )}
          </div>
        </CardContent>

        <CardFooter className="text-xs text-muted-foreground">
          Ready for domain feature additions once problem selection is finalized.
        </CardFooter>
      </Card>
    </div>
  );
}
