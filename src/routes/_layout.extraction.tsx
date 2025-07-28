import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Code, Database, Globe, Download, Upload, Trash2, Edit, Search } from "lucide-react";
import { Button } from "~/components/ui/button";

export const Route = createFileRoute("/_layout/extraction")({
  component: ElementExtractionTest,
});

function ElementExtractionTest() {
  const httpMethods = [
    { method: "GET", description: "Retrieve data from server", icon: Download, color: "text-green-600" },
    { method: "POST", description: "Send data to server", icon: Upload, color: "text-blue-600" },
    { method: "PUT", description: "Update existing resource", icon: Edit, color: "text-yellow-600" },
    { method: "DELETE", description: "Remove resource", icon: Trash2, color: "text-red-600" },
    { method: "PATCH", description: "Partial update", icon: Edit, color: "text-purple-600" },
    { method: "HEAD", description: "Get headers only", icon: Search, color: "text-gray-600" },
    { method: "OPTIONS", description: "Get allowed methods", icon: Code, color: "text-orange-600" },
  ];

  const navigationLinks = [
    { label: "HTTP Methods", href: "#http-methods", section: "methods" },
    { label: "Request & Response", href: "#request-response", section: "request" },
    { label: "Authentication", href: "#auth", section: "auth" },
    { label: "Status Codes", href: "#status-codes", section: "status" },
    { label: "Headers", href: "#headers", section: "headers" },
    { label: "Cookies", href: "#cookies", section: "cookies" },
    { label: "JSON", href: "#json", section: "json" },
    { label: "XML", href: "#xml", section: "xml" },
  ];

  const statusCodes = [
    { code: "200", name: "OK", description: "Request successful" },
    { code: "201", name: "Created", description: "Resource created" },
    { code: "400", name: "Bad Request", description: "Invalid request" },
    { code: "401", name: "Unauthorized", description: "Authentication required" },
    { code: "404", name: "Not Found", description: "Resource not found" },
    { code: "500", name: "Internal Server Error", description: "Server error" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header Section */}
      <header className="text-center space-y-4" data-testid="page-header">
        <div className="flex items-center justify-center gap-3">
          <Globe className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold" data-testid="main-heading">
            HTTP Request & Response Service
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="main-description">
          A comprehensive testing service for HTTP methods, request/response handling, and web automation.
          Perfect for testing Playwright element extraction and web scraping capabilities.
        </p>
      </header>

      {/* Navigation Bar */}
      <nav className="border rounded-lg p-4 bg-muted/30" data-testid="main-navigation">
        <h2 className="text-lg font-semibold mb-3">Navigation</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {navigationLinks.map((link) => (
            <a
              key={link.section}
              href={link.href}
              className="flex items-center gap-2 p-2 rounded-md hover:bg-background border transition-colors"
              data-testid={`nav-${link.section}`}
              data-section={link.section}
            >
              <ExternalLink className="h-4 w-4" />
              <span className="text-sm">{link.label}</span>
            </a>
          ))}
        </div>
      </nav>

      {/* HTTP Methods Section */}
      <section id="http-methods" className="space-y-4" data-testid="http-methods-section">
        <h2 className="text-2xl font-bold">HTTP Methods</h2>
        <p className="text-muted-foreground">
          Click on any HTTP method below to test different request types and see their responses.
        </p>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {httpMethods.map((method) => {
            const Icon = method.icon;
            return (
              <div
                key={method.method}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                data-testid={`http-method-${method.method.toLowerCase()}`}
                data-method={method.method}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Icon className={`h-5 w-5 ${method.color}`} />
                  <span className="font-semibold text-lg">{method.method}</span>
                </div>
                <p className="text-sm text-muted-foreground">{method.description}</p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="mt-3 w-full"
                  data-testid={`${method.method.toLowerCase()}-button`}
                >
                  Test {method.method}
                </Button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Status Codes Section */}
      <section id="status-codes" className="space-y-4" data-testid="status-codes-section">
        <h2 className="text-2xl font-bold">HTTP Status Codes</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {statusCodes.map((status) => (
            <div
              key={status.code}
              className="border rounded-lg p-3 flex items-center gap-3"
              data-testid={`status-${status.code}`}
              data-code={status.code}
            >
              <div className="font-mono font-bold text-lg">{status.code}</div>
              <div>
                <div className="font-medium">{status.name}</div>
                <div className="text-sm text-muted-foreground">{status.description}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Request Examples Section */}
      <section id="request-response" className="space-y-4" data-testid="request-examples">
        <h2 className="text-2xl font-bold">Request & Response Examples</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* JSON Example */}
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3" data-testid="json-title">JSON Response Example</h3>
            <div className="bg-muted rounded-md p-4">
              <pre className="text-sm" data-testid="json-content">
{`{
  "args": {},
  "headers": {
    "Accept": "application/json",
    "Host": "localhost:3000",
    "User-Agent": "Playwright/1.0"
  },
  "origin": "127.0.0.1",
  "url": "http://localhost:3000/test/extraction"
}`}
              </pre>
            </div>
          </div>

          {/* Form Data Example */}
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3" data-testid="form-title">Form Data Example</h3>
            <div className="bg-muted rounded-md p-4">
              <pre className="text-sm" data-testid="form-content">
{`{
  "form": {
    "key1": "value1",
    "key2": "value2"
  },
  "files": {},
  "json": null
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Links Collection */}
      <section className="space-y-4" data-testid="links-collection">
        <h2 className="text-2xl font-bold">Useful Links</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          <a 
            href="/forms" 
            className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
            data-testid="forms-link"
          >
            <ExternalLink className="h-4 w-4" />
            <span>Form Testing</span>
          </a>
          <a 
            href="/downloads" 
            className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
            data-testid="downloads-link"
          >
            <Download className="h-4 w-4" />
            <span>File Downloads</span>
          </a>
          <a 
            href="/auth/basic" 
            className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
            data-testid="auth-link"
          >
            <Database className="h-4 w-4" />
            <span>Authentication</span>
          </a>
        </div>
      </section>

      {/* Footer with metadata */}
      <footer className="border-t pt-6 text-center text-sm text-muted-foreground" data-testid="page-footer">
        <p>HTTP Request & Response Service • Generated on {new Date().toLocaleDateString()}</p>
        <div className="mt-2 space-x-4">
          <span data-testid="page-url">URL: {typeof window !== 'undefined' ? window.location.href : '/extraction'}</span>
          <span data-testid="page-title">Title: HTTP Request & Response Service</span>
        </div>
      </footer>
    </div>
  );
}