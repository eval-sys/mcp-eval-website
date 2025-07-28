import { createAPIFileRoute } from "@tanstack/react-start/api";

export const APIRoute = createAPIFileRoute("/api/test/downloads/$fileId")({
  GET: async ({ request, params }) => {
    try {
      const { fileId } = params;

      // Define available files
      const files: Record<string, { name: string; content: string; contentType: string; size: number }> = {
        "sample-text": {
          name: "sample-document.txt",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nGenerated on: " + new Date().toLocaleString(),
          contentType: "text/plain",
          size: 2560
        },
        "sample-json": {
          name: "data-export.json",
          content: JSON.stringify({
            test: true,
            timestamp: new Date().toISOString(),
            data: {
              users: 100,
              files: 25,
              downloads: 500,
              categories: ["test", "automation", "playwright"],
              settings: {
                theme: "dark",
                language: "en",
                notifications: true
              }
            },
            metadata: {
              version: "1.0.0",
              format: "json",
              encoding: "utf-8",
              generator: "MCPBench Test Environment"
            }
          }, null, 2),
          contentType: "application/json",
          size: 5324
        },
        "sample-csv": {
          name: "users-list.csv",
          content: "Name,Email,Age,City,Country,Department,Salary\nJohn Doe,john@example.com,30,New York,USA,Engineering,75000\nJane Smith,jane@example.com,25,Los Angeles,USA,Marketing,65000\nBob Johnson,bob@example.com,35,Chicago,USA,Sales,70000\nAlice Brown,alice@example.com,28,Miami,USA,Design,68000\nCharlie Wilson,charlie@example.com,32,Seattle,USA,Engineering,80000\nDiana Davis,diana@example.com,29,Boston,USA,HR,62000\nEve Anderson,eve@example.com,31,Austin,USA,Engineering,77000\nFrank Miller,frank@example.com,27,Denver,USA,Marketing,63000",
          contentType: "text/csv",
          size: 8912
        },
        "sample-image": {
          name: "test-image.png",
          content: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==", // 1x1 transparent PNG
          contentType: "image/png",
          size: 128000
        },
        "sample-pdf": {
          name: "report.pdf",
          content: "%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj 2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj 3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R/Contents 4 0 R>>endobj 4 0 obj<</Length 44>>stream\nBT\n/F1 12 Tf\n100 700 Td\n(Test PDF Document) Tj\nET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f \n0000000010 00000 n \n0000000053 00000 n \n0000000125 00000 n \n0000000185 00000 n \ntrailer<</Size 5/Root 1 0 R>>\nstartxref\n274\n%%EOF",
          contentType: "application/pdf",
          size: 350208
        }
      };

      const file = files[fileId];
      if (!file) {
        return new Response(
          JSON.stringify({ error: "File not found", fileId }),
          { status: 404, headers: { "Content-Type": "application/json" } }
        );
      }

      // Simulate download delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

      let content: Uint8Array;
      
      if (file.contentType === "image/png") {
        // Decode base64 for images
        content = Uint8Array.from(atob(file.content), c => c.charCodeAt(0));
      } else {
        // Use text content directly
        content = new TextEncoder().encode(file.content);
      }

      return new Response(content, {
        status: 200,
        headers: {
          "Content-Type": file.contentType,
          "Content-Disposition": `attachment; filename="${file.name}"`,
          "Content-Length": content.length.toString(),
          "Cache-Control": "no-cache",
        }
      });

    } catch (error) {
      return new Response(
        JSON.stringify({
          error: "Internal server error",
          message: error instanceof Error ? error.message : "Unknown error"
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  },
});