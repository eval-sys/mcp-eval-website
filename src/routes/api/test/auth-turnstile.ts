import { createAPIFileRoute } from "@tanstack/react-start/api";

export const APIRoute = createAPIFileRoute("/api/test/auth-turnstile")({
  POST: async ({ request }) => {
    try {
      const contentType = request.headers.get("content-type");
      let authData: Record<string, any> = {};

      if (contentType?.includes("application/json")) {
        authData = await request.json();
      } else if (contentType?.includes("application/x-www-form-urlencoded")) {
        const form = await request.formData();
        authData = Object.fromEntries(form.entries());
      } else {
        return new Response(
          JSON.stringify({ error: "Unsupported content type" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      // Simulate authentication delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const { username, password, "cf-turnstile-response": turnstileToken } = authData;

      // Valid test credentials
      const validCredentials = {
        username: "testuser",
        password: "password123"
      };

      // Mock Turnstile verification (in production, this would call Cloudflare's API)
      const turnstileValid = await mockVerifyTurnstile(turnstileToken);

      let response: any = {
        timestamp: new Date().toISOString(),
        method: "POST",
        url: new URL(request.url).toString(),
        authType: "turnstile",
        username,
        origin: request.headers.get("x-forwarded-for") || "127.0.0.1",
        userAgent: request.headers.get("user-agent") || "Unknown",
        turnstileVerified: turnstileValid
      };

      // Check Turnstile token first
      if (!turnstileToken) {
        response = {
          ...response,
          success: false,
          error: "Security challenge required",
          message: "Please complete the Turnstile challenge",
          authenticated: false
        };
        return new Response(JSON.stringify(response, null, 2), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }

      if (!turnstileValid) {
        response = {
          ...response,
          success: false,
          error: "Security challenge failed",
          message: "Turnstile verification failed. Please try again.",
          authenticated: false
        };
        return new Response(JSON.stringify(response, null, 2), {
          status: 403,
          headers: { "Content-Type": "application/json" }
        });
      }

      // Check credentials after Turnstile passes
      const validCreds = username === validCredentials.username && 
                        password === validCredentials.password;

      if (!validCreds) {
        response = {
          ...response,
          success: false,
          error: "Authentication failed",
          message: "Invalid username or password",
          authenticated: false
        };
        return new Response(JSON.stringify(response, null, 2), {
          status: 401,
          headers: { "Content-Type": "application/json" }
        });
      }

      // Successful authentication with Turnstile
      response = {
        ...response,
        success: true,
        message: "Authentication successful with security verification",
        authenticated: true,
        session: {
          sessionId: "sess_" + Math.random().toString(36).substr(2, 9),
          expiresAt: new Date(Date.now() + 3600000).toISOString(), // 1 hour
          permissions: ["read", "write"],
          role: "user",
          securityLevel: "turnstile-verified"
        },
        user: {
          id: "user_123",
          username: validCredentials.username,
          email: "testuser@example.com",
          firstName: "Test",
          lastName: "User",
          lastLogin: new Date().toISOString(),
          verificationMethod: "turnstile"
        },
        turnstileDetails: {
          verified: true,
          timestamp: new Date().toISOString(),
          // In production, this would include actual Turnstile response data
          challengeType: "non-interactive"
        }
      };

      return new Response(JSON.stringify(response, null, 2), {
        status: 200,
        headers: { 
          "Content-Type": "application/json",
          "Set-Cookie": `session=${response.session.sessionId}; HttpOnly; Secure; SameSite=Strict; Max-Age=3600`
        }
      });

    } catch (error) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Internal server error",
          message: error instanceof Error ? error.message : "Unknown error",
          authenticated: false
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  },

  GET: async ({ request }) => {
    // Return Turnstile configuration and status
    return new Response(JSON.stringify({
      turnstile: {
        enabled: true,
        sitekey: "1x00000000000000000000AA", // Test sitekey
        mode: "test",
        widget: {
          type: "visible",
          theme: "auto",
          size: "normal"
        }
      },
      message: "Use POST method to authenticate with Turnstile verification"
    }, null, 2), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  },
});

// Mock Turnstile verification function
async function mockVerifyTurnstile(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // In production, this would call:
  // https://challenges.cloudflare.com/turnstile/v0/siteverify
  // with the secret key and token
  
  // For testing, accept any token that starts with expected test token format
  // Real tokens from test sitekey start with "XXXX.DUMMY.TOKEN.XXXX"
  return token.includes("DUMMY") || token.length > 20;
}