import { createAPIFileRoute } from "@tanstack/react-start/api";

export const APIRoute = createAPIFileRoute("/api/test/forms")({
  POST: async ({ request }) => {
    try {
      const contentType = request.headers.get("content-type");
      let formData: Record<string, any> = {};

      if (contentType?.includes("application/json")) {
        formData = await request.json();
      } else if (contentType?.includes("application/x-www-form-urlencoded")) {
        const form = await request.formData();
        formData = Object.fromEntries(form.entries());
      } else {
        return new Response(
          JSON.stringify({ error: "Unsupported content type" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Validate required fields
      const requiredFields = ["custname", "custtel", "custemail", "size", "delivery"];
      const missingFields = requiredFields.filter(field => !formData[field]);

      if (missingFields.length > 0) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Missing required fields",
            missingFields,
            receivedData: formData
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      // Successful response
      const response = {
        success: true,
        timestamp: new Date().toISOString(),
        method: "POST",
        url: new URL(request.url).toString(),
        headers: {
          "Content-Type": contentType || "unknown",
          "User-Agent": request.headers.get("user-agent") || "unknown",
          "Accept": request.headers.get("accept") || "unknown",
        },
        form: formData,
        args: {},
        files: {},
        origin: request.headers.get("x-forwarded-for") || "127.0.0.1",
        json: contentType?.includes("application/json") ? formData : null,
      };

      return new Response(JSON.stringify(response, null, 2), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });

    } catch (error) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Internal server error",
          message: error instanceof Error ? error.message : "Unknown error"
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  },
});