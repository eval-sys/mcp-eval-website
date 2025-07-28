import { createAPIFileRoute } from "@tanstack/react-start/api";

export const APIRoute = createAPIFileRoute("/api/test/auth")({
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
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

      const { username, password, captcha, authType = "basic" } = authData;

      // Valid test credentials
      const validCredentials = {
        username: "testuser",
        password: "password123"
      };

      // Check credentials
      const validCreds = username === validCredentials.username && 
                        password === validCredentials.password;

      let response: any = {
        timestamp: new Date().toISOString(),
        method: "POST",
        url: new URL(request.url).toString(),
        authType,
        username,
        origin: request.headers.get("x-forwarded-for") || "127.0.0.1",
        userAgent: request.headers.get("user-agent") || "Unknown"
      };

      if (authType === "challenge" && captcha) {
        // For challenge auth, also validate CAPTCHA (simplified)
        const validCaptcha = captcha.length >= 6; // Simple validation
        
        if (!validCaptcha) {
          response = {
            ...response,
            success: false,
            error: "CAPTCHA verification failed",
            message: "Please complete the CAPTCHA challenge",
            authenticated: false
          };
          return new Response(JSON.stringify(response, null, 2), {
            status: 401,
            headers: { "Content-Type": "application/json" }
          });
        }
      }

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

      // Successful authentication
      response = {
        ...response,
        success: true,
        message: "Authentication successful",
        authenticated: true,
        session: {
          sessionId: "sess_" + Math.random().toString(36).substr(2, 9),
          expiresAt: new Date(Date.now() + 3600000).toISOString(), // 1 hour
          permissions: ["read", "write"],
          role: "user"
        },
        user: {
          id: "user_123",
          username: validCredentials.username,
          email: "testuser@example.com",
          firstName: "Test",
          lastName: "User",
          lastLogin: new Date().toISOString()
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
    // Return authentication status
    const cookies = request.headers.get("cookie");
    const sessionCookie = cookies?.match(/session=([^;]+)/)?.[1];

    if (sessionCookie) {
      return new Response(JSON.stringify({
        authenticated: true,
        session: {
          sessionId: sessionCookie,
          status: "active"
        },
        user: {
          username: "testuser",
          email: "testuser@example.com"
        }
      }, null, 2), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify({
      authenticated: false,
      message: "No active session found"
    }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  },
});