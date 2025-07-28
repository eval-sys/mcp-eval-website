import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { TestTube, FileText, Search, Download, Shield, Lock, RefreshCw, Navigation } from "lucide-react";

export const Route = createFileRoute("/_layout")({
  component: MainLayout,
});

function MainLayout() {
  const navigationItems = [
    { to: "/forms/", label: "Form Interaction", icon: FileText },
    { to: "/extraction", label: "Element Extraction", icon: Search },
    { to: "/downloads", label: "File Downloads", icon: Download },
    { to: "/auth/basic", label: "Basic Auth", icon: Lock },
    { to: "/auth/form", label: "Form Login", icon: Shield },
    { to: "/auth/challenge", label: "Challenge Auth", icon: RefreshCw },
    { to: "/navigation", label: "Web Navigation", icon: Navigation },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Sidebar Navigation */}
      <nav className="w-64 border-r bg-card flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <TestTube className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-semibold">MCPBench Test</h1>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 p-4">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors [&.active]:bg-primary [&.active]:text-primary-foreground"
                  activeProps={{ className: "bg-primary text-primary-foreground" }}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}