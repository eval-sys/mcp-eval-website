import { createAPIFileRoute } from "@tanstack/react-start/api";

export const APIRoute = createAPIFileRoute("/api/test/get")({
  GET: async ({ request }) => {
    try {
      const url = new URL(request.url);
      const searchParams = Object.fromEntries(url.searchParams.entries());

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 300));

      const response = {
        args: searchParams,
        headers: {
          "Accept": request.headers.get("accept") || "*/*",
          "Accept-Encoding": request.headers.get("accept-encoding") || "gzip, deflate",
          "Accept-Language": request.headers.get("accept-language") || "en-US,en;q=0.9",
          "Host": request.headers.get("host") || "localhost:3000",
          "User-Agent": request.headers.get("user-agent") || "Unknown",
          "X-Amzn-Trace-Id": "Root=1-" + Math.random().toString(36).substr(2, 9),
        },
        origin: request.headers.get("x-forwarded-for") || "127.0.0.1",
        url: request.url,
        timestamp: new Date().toISOString(),
        method: "GET",
        json: null,
        form: {},
        files: {},
        data: "",
      };

      return new Response(JSON.stringify(response, null, 2), {
        status: 200,
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        }
      });

    } catch (error) {
      return new Response(
        JSON.stringify({
          error: "Internal server error",
          message: error instanceof Error ? error.message : "Unknown error",
          timestamp: new Date().toISOString()
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  },
});