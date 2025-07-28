import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export const Route = createFileRoute("/_layout/auth/form")({
  component: FormAuthTest,
});

function FormAuthTest() {
  const [isLoading, setIsLoading] = useState(false);
  const [formAuth, setFormAuth] = useState({ username: "", password: "" });
  const [formResult, setFormResult] = useState<{ success: boolean; message: string } | null>(null);

  const validCredentials = {
    username: "testuser",
    password: "password123"
  };

  const handleFormAuth = async () => {
    setIsLoading(true);
    setFormResult(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const success = formAuth.username === validCredentials.username && 
                     formAuth.password === validCredentials.password;
      
      const message = success ? 
        "Login successful! Redirecting to dashboard..." :
        "Login failed. Invalid username or password.";

      setFormResult({ success, message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Login Form</h1>

      <form onSubmit={(e) => { e.preventDefault(); handleFormAuth(); }} className="space-y-4" data-testid="form-auth-form">
        <div className="space-y-2">
          <Label htmlFor="form-username">Username</Label>
          <Input
            id="form-username"
            name="username"
            value={formAuth.username}
            onChange={(e) => setFormAuth(prev => ({ ...prev, username: e.target.value }))}
            placeholder="Enter username"
            data-testid="form-username-input"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="form-password">Password</Label>
          <Input
            id="form-password"
            name="password"
            type="password"
            value={formAuth.password}
            onChange={(e) => setFormAuth(prev => ({ ...prev, password: e.target.value }))}
            placeholder="Enter password"
            data-testid="form-password-input"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full"
          data-testid="form-auth-submit"
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>

        {formResult && (
          <div
            className={`p-3 rounded-md flex items-center gap-2 ${
              formResult.success
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
            data-testid="form-auth-result"
          >
            {formResult.success ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <span>{formResult.message}</span>
          </div>
        )}
      </form>
    </div>
  );
}