import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Navigation, Home, ArrowRight, ExternalLink, Code, Database } from "lucide-react";
import { Button } from "~/components/ui/button";

export const Route = createFileRoute("/_layout/navigation")({
  component: WebNavigationTest,
});

function WebNavigationTest() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'services' | 'contact'>('home');
  const [visitHistory, setVisitHistory] = useState<string[]>(['home']);

  const navigateToPage = (page: string) => {
    setCurrentPage(page as any);
    setVisitHistory(prev => [...prev, page]);
  };

  const pages = {
    home: {
      title: "Welcome to Navigation Test",
      content: "This is the homepage of our navigation test environment. Use the navigation menu to explore different pages and test multi-page navigation scenarios.",
      data: {
        pageType: "homepage",
        features: ["Navigation testing", "Multi-page flows", "Data extraction"],
        lastUpdated: new Date().toISOString(),
      }
    },
    about: {
      title: "About Our Service",
      content: "Learn about our comprehensive testing platform designed for automated browser testing. We provide various endpoints and pages to validate navigation workflows.",
      data: {
        pageType: "about",
        company: "MCPBench Testing",
        founded: "2024",
        mission: "Comprehensive automation testing",
      }
    },
    services: {
      title: "Our Testing Services", 
      content: "We offer various testing scenarios including form interactions, file downloads, authentication flows, and element extraction capabilities.",
      data: {
        pageType: "services",
        offerings: ["Form Testing", "Download Testing", "Auth Testing", "Navigation Testing"],
        pricing: "Free for testing",
      }
    },
    contact: {
      title: "Contact Information",
      content: "Get in touch with our testing platform. This page demonstrates contact forms and information extraction scenarios.",
      data: {
        pageType: "contact",
        email: "test@mcpbench.local",
        phone: "+1-555-TEST-123",
        address: "123 Test Street, Automation City",
      }
    }
  };

  const currentPageData = pages[currentPage];
  const breadcrumbs = visitHistory.slice(-3);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Navigation className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold" data-testid="navigation-heading">
            Web Navigation Test Environment
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Test multi-page navigation, link following, and data extraction across different page types.
          Perfect for validating complex browsing scenarios and page-to-page workflows.
        </p>
      </div>

      {/* Navigation Bar */}
      <nav className="border rounded-lg p-4 bg-card" data-testid="main-navigation">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Site Navigation</h2>
          <div className="text-sm text-muted-foreground">
            Pages visited: {visitHistory.length}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {Object.entries(pages).map(([key, page]) => (
            <Button
              key={key}
              variant={currentPage === key ? "default" : "outline"}
              onClick={() => navigateToPage(key)}
              data-testid={`nav-${key}`}
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              {page.title.split(' ')[0]}
            </Button>
          ))}
        </div>
      </nav>

      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground" data-testid="breadcrumbs">
        <span>Navigation path:</span>
        {breadcrumbs.map((page, index) => (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && <ArrowRight className="h-3 w-3" />}
            <span className={index === breadcrumbs.length - 1 ? "text-foreground font-medium" : ""}>
              {pages[page as keyof typeof pages]?.title || page}
            </span>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Page Content */}
          <div className="border rounded-lg p-6" data-testid="page-content">
            <h1 className="text-2xl font-bold mb-4" data-testid="page-title">
              {currentPageData.title}
            </h1>
            
            <div className="prose max-w-none mb-6" data-testid="page-text">
              <p>{currentPageData.content}</p>
            </div>

            {/* Page Actions */}
            <div className="flex gap-3">
              <Button variant="outline" data-testid="extract-data-btn">
                <Database className="mr-2 h-4 w-4" />
                Extract Page Data
              </Button>
              <Button variant="outline" data-testid="view-source-btn">
                <Code className="mr-2 h-4 w-4" />
                View Page Source
              </Button>
            </div>
          </div>

          {/* Page-specific Content */}
          {currentPage === 'home' && (
            <div className="border rounded-lg p-6 bg-muted/30">
              <h3 className="text-lg font-semibold mb-3">Quick Navigation</h3>
              <div className="grid gap-3 md:grid-cols-2">
                <button 
                  onClick={() => navigateToPage('services')}
                  className="p-3 border rounded-lg hover:bg-background transition-colors text-left"
                  data-testid="quick-nav-services"
                >
                  <div className="font-medium">Explore Services</div>
                  <div className="text-sm text-muted-foreground">Learn about our testing capabilities</div>
                </button>
                <button 
                  onClick={() => navigateToPage('contact')}
                  className="p-3 border rounded-lg hover:bg-background transition-colors text-left"
                  data-testid="quick-nav-contact"
                >
                  <div className="font-medium">Contact Us</div>
                  <div className="text-sm text-muted-foreground">Get in touch for support</div>
                </button>
              </div>
            </div>
          )}

          {currentPage === 'services' && (
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Service Details</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {currentPageData.data.offerings.map((service, index) => (
                  <div key={index} className="p-3 border rounded-lg" data-testid={`service-${index}`}>
                    <div className="font-medium">{service}</div>
                    <div className="text-sm text-muted-foreground">Comprehensive testing scenarios</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentPage === 'contact' && (
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Contact Form</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-md"
                    data-testid="contact-name"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input 
                    type="email" 
                    className="w-full p-2 border rounded-md"
                    data-testid="contact-email"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <textarea 
                    rows={4} 
                    className="w-full p-2 border rounded-md"
                    data-testid="contact-message"
                    placeholder="Your message here..."
                  />
                </div>
                <div className="md:col-span-2">
                  <Button data-testid="contact-submit">Send Message</Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Page Data */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">Page Data (JSON)</h3>
            <div className="bg-muted rounded-md p-3">
              <pre className="text-xs" data-testid="page-json-data">
                {JSON.stringify(currentPageData.data, null, 2)}
              </pre>
            </div>
          </div>

          {/* External Links */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">External Links</h3>
            <div className="space-y-2">
              <a 
                href="/forms"
                className="flex items-center gap-2 p-2 hover:bg-muted rounded-md text-sm"
                data-testid="external-forms"
              >
                <ExternalLink className="h-4 w-4" />
                Form Testing Page
              </a>
              <a 
                href="/downloads"
                className="flex items-center gap-2 p-2 hover:bg-muted rounded-md text-sm"
                data-testid="external-downloads"
              >
                <ExternalLink className="h-4 w-4" />
                Download Testing Page
              </a>
              <a 
                href="/auth/basic"
                className="flex items-center gap-2 p-2 hover:bg-muted rounded-md text-sm"
                data-testid="external-auth"
              >
                <ExternalLink className="h-4 w-4" />
                Auth Testing Page
              </a>
            </div>
          </div>

          {/* Navigation History */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">Visit History</h3>
            <div className="space-y-1" data-testid="visit-history">
              {visitHistory.slice(-10).map((page, index) => (
                <div key={index} className="text-sm p-2 bg-muted rounded text-center">
                  {pages[page as keyof typeof pages]?.title || page}
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-3"
              onClick={() => setVisitHistory(['home'])}
              data-testid="clear-history"
            >
              Clear History
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
}