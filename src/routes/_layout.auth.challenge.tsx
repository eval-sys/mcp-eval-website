import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { RefreshCw, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export const Route = createFileRoute("/_layout/auth/challenge")({
  component: ChallengeAuthTest,
});

function ChallengeAuthTest() {
  const [isLoading, setIsLoading] = useState(false);
  const [captchaChallenge, setCaptchaChallenge] = useState("");
  const [challengeAuth, setChallengeAuth] = useState({ username: "", password: "", captcha: "" });
  const [challengeResult, setChallengeResult] = useState<{ success: boolean; message: string } | null>(null);

  const validCredentials = {
    username: "testuser",
    password: "password123"
  };

  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaChallenge(result);
    setChallengeAuth(prev => ({ ...prev, captcha: "" }));
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleChallengeAuth = async () => {
    setIsLoading(true);
    setChallengeResult(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const validCreds = challengeAuth.username === validCredentials.username && 
                        challengeAuth.password === validCredentials.password;
      const validCaptcha = challengeAuth.captcha.toUpperCase() === captchaChallenge;
      
      let message = "";
      let success = false;

      if (!validCaptcha) {
        message = "CAPTCHA verification failed. Please try again.";
      } else if (!validCreds) {
        message = "Invalid credentials. Authentication failed.";
      } else {
        message = "Authentication successful! All security checks passed.";
        success = true;
      }

      setChallengeResult({ success, message });
      
      if (!validCaptcha) {
        generateCaptcha();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Challenge Authentication</h1>

      <div className="space-y-4" data-testid="challenge-auth-form">
        <div className="space-y-2">
          <Label htmlFor="challenge-username">Username</Label>
          <Input
            id="challenge-username"
            name="username"
            value={challengeAuth.username}
            onChange={(e) => setChallengeAuth(prev => ({ ...prev, username: e.target.value }))}
            placeholder="Enter username"
            data-testid="challenge-username-input"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="challenge-password">Password</Label>
          <Input
            id="challenge-password"
            name="password"
            type="password"
            value={challengeAuth.password}
            onChange={(e) => setChallengeAuth(prev => ({ ...prev, password: e.target.value }))}
            placeholder="Enter password"
            data-testid="challenge-password-input"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="captcha">CAPTCHA Verification</Label>
          <div className="flex gap-3 items-center">
            <div 
              className="bg-muted p-3 rounded border font-mono text-lg tracking-widest select-none"
              data-testid="captcha-display"
            >
              {captchaChallenge}
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={generateCaptcha}
              data-testid="captcha-refresh"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
          <Input
            id="captcha"
            name="captcha"
            value={challengeAuth.captcha}
            onChange={(e) => setChallengeAuth(prev => ({ ...prev, captcha: e.target.value }))}
            placeholder="Enter CAPTCHA code"
            data-testid="captcha-input"
          />
        </div>

        <Button
          onClick={handleChallengeAuth}
          disabled={isLoading}
          className="w-full"
          data-testid="challenge-auth-submit"
        >
          {isLoading ? "Verifying..." : "Submit"}
        </Button>

        {challengeResult && (
          <div
            className={`p-3 rounded-md flex items-center gap-2 ${
              challengeResult.success
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
            data-testid="challenge-auth-result"
          >
            {challengeResult.success ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <span>{challengeResult.message}</span>
          </div>
        )}
      </div>
    </div>
  );
}