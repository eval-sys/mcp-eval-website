import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { ShieldCheck, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

declare global {
  interface Window {
    turnstile: {
      render: (element: string | HTMLElement, options: {
        sitekey: string;
        callback?: (token: string) => void;
        'error-callback'?: () => void;
        'expired-callback'?: () => void;
        theme?: 'light' | 'dark' | 'auto';
        size?: 'normal' | 'compact';
      }) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

export const Route = createFileRoute("/_layout/auth/turnstile")({
  component: TurnstileAuthTest,
});

function TurnstileAuthTest() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [authResult, setAuthResult] = useState<{ success: boolean; message: string } | null>(null);
  const [widgetId, setWidgetId] = useState<string | null>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);

  const validCredentials = {
    username: "testuser",
    password: "password123"
  };

  // Test sitekey that forces an interactive challenge
  const TURNSTILE_SITEKEY = "3x00000000000000000000FF";

  useEffect(() => {
    let mounted = true;
    
    const renderWidget = () => {
      if (!mounted || !window.turnstile || !turnstileRef.current || widgetId) {
        return;
      }
      
      // Clear any existing widget content first
      turnstileRef.current.innerHTML = '';
      
      try {
        const id = window.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITEKEY,
          callback: (token: string) => {
            console.log('Turnstile challenge completed');
            setTurnstileToken(token);
          },
          'error-callback': () => {
            console.error('Turnstile error');
            setAuthResult({ 
              success: false, 
              message: "Turnstile challenge failed. Please try again." 
            });
          },
          'expired-callback': () => {
            console.log('Turnstile token expired');
            setTurnstileToken(null);
          },
          theme: 'auto',
          size: 'normal'
        });
        setWidgetId(id);
      } catch (e) {
        console.error('Error rendering Turnstile widget:', e);
      }
    };

    // Check if script already exists
    const existingScript = document.querySelector('script[src*="turnstile"]');
    if (existingScript && window.turnstile) {
      // If script already loaded and Turnstile available, render immediately
      renderWidget();
      return;
    }

    // Load Turnstile script
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      // Wait for Turnstile to be available
      setTimeout(() => {
        if (mounted) {
          renderWidget();
        }
      }, 100);
    };

    document.head.appendChild(script);

    return () => {
      mounted = false;
      // Cleanup
      if (widgetId && window.turnstile) {
        try {
          window.turnstile.remove(widgetId);
          setWidgetId(null);
        } catch (e) {
          console.error('Error removing Turnstile widget:', e);
        }
      }
    };
  }, []); // Remove widgetId from dependencies to prevent re-rendering

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!turnstileToken) {
      setAuthResult({ 
        success: false, 
        message: "Please complete the security challenge first." 
      });
      return;
    }

    setIsLoading(true);
    setAuthResult(null);

    try {
      // Simulate API call to validate both credentials and Turnstile token
      const response = await fetch('/api/test/auth-turnstile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          'cf-turnstile-response': turnstileToken,
          authType: 'turnstile'
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setAuthResult({ 
          success: true, 
          message: "Authentication successful! Security challenge verified." 
        });
      } else {
        setAuthResult({ 
          success: false, 
          message: data.message || "Authentication failed. Please check your credentials." 
        });
        
        // Reset Turnstile widget on failure
        if (widgetId && window.turnstile) {
          window.turnstile.reset(widgetId);
          setTurnstileToken(null);
        }
      }
    } catch (error) {
      // Fallback for when API is not available
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const validCreds = formData.username === validCredentials.username && 
                        formData.password === validCredentials.password;
      
      if (validCreds && turnstileToken) {
        setAuthResult({ 
          success: true, 
          message: "Authentication successful! Security challenge verified." 
        });
      } else if (!validCreds) {
        setAuthResult({ 
          success: false, 
          message: "Invalid credentials. Please check your username and password." 
        });
        // Reset widget on failure
        if (widgetId && window.turnstile) {
          window.turnstile.reset(widgetId);
          setTurnstileToken(null);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <ShieldCheck className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">Secure Sign In</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Complete the security challenge to proceed with authentication
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" data-testid="turnstile-auth-form">
        <div className="space-y-2">
          <Label htmlFor="turnstile-username">Username</Label>
          <Input
            id="turnstile-username"
            name="username"
            type="text"
            value={formData.username}
            onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
            placeholder="Enter username"
            data-testid="turnstile-username-input"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="turnstile-password">Password</Label>
          <Input
            id="turnstile-password"
            name="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            placeholder="Enter password"
            data-testid="turnstile-password-input"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Security Challenge</Label>
          <div 
            ref={turnstileRef}
            className="cf-turnstile"
            data-testid="turnstile-widget"
          />
          {turnstileToken && (
            <div className="text-sm text-green-600 flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              Challenge completed
            </div>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading || !turnstileToken}
          className="w-full"
          data-testid="turnstile-auth-submit"
        >
          {isLoading ? "Verifying..." : "Sign In"}
        </Button>

        {authResult && (
          <div
            className={`p-3 rounded-md flex items-center gap-2 ${
              authResult.success
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
            data-testid="turnstile-auth-result"
          >
            {authResult.success ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <span>{authResult.message}</span>
          </div>
        )}
      </form>

      <div className="text-sm text-muted-foreground space-y-1">
        <p>Test credentials: testuser / password123</p>
        <p>Using test sitekey (interactive challenge required)</p>
      </div>
    </div>
  );
}