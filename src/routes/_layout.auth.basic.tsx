import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export const Route = createFileRoute("/_layout/auth/basic")({
  component: BasicAuthTest,
});

function BasicAuthTest() {
  const [isLoading, setIsLoading] = useState(false);
  const [basicAuth, setBasicAuth] = useState({ username: "", password: "" });
  const [basicResult, setBasicResult] = useState<{ success: boolean; message: string } | null>(null);

  const validCredentials = {
    username: "testuser",
    password: "password123"
  };

  const handleBasicAuth = async () => {
    setIsLoading(true);
    setBasicResult(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const success = basicAuth.username === validCredentials.username && 
                     basicAuth.password === validCredentials.password;
      
      const message = success ? 
        "Authentication successful! Access granted." :
        "Invalid credentials. Please check your username and password.";

      setBasicResult({ success, message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Basic Authentication</h1>

      <div className="space-y-4" data-testid="basic-auth-form">
        <div className="space-y-2">
          <Label htmlFor="basic-username">Username</Label>
          <Input
            id="basic-username"
            name="username"
            value={basicAuth.username}
            onChange={(e) => setBasicAuth(prev => ({ ...prev, username: e.target.value }))}
            placeholder="Enter username"
            data-testid="basic-username-input"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="basic-password">Password</Label>
          <Input
            id="basic-password"
            name="password"
            type="password"
            value={basicAuth.password}
            onChange={(e) => setBasicAuth(prev => ({ ...prev, password: e.target.value }))}
            placeholder="Enter password"
            data-testid="basic-password-input"
          />
        </div>

        <Button
          onClick={handleBasicAuth}
          disabled={isLoading}
          className="w-full"
          data-testid="basic-auth-submit"
        >
          {isLoading ? "Authenticating..." : "Authenticate"}
        </Button>

        {basicResult && (
          <div
            className={`p-3 rounded-md flex items-center gap-2 ${
              basicResult.success
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
            data-testid="basic-auth-result"
          >
            {basicResult.success ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <span>{basicResult.message}</span>
          </div>
        )}
      </div>
    </div>
  );
}