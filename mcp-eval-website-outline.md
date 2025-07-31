# MCP Eval Website Routes

url: https://mcp-eval-website.vercel.app

## Authentication Routes

### /auth/basic
- Basic authentication with username and password
- Valid credentials: testuser/password123

### /auth/form
- Form-based login authentication
- Valid credentials: testuser/password123

### /auth/challenge
- Authentication with CAPTCHA challenge
- Valid credentials: testuser/password123
- Requires CAPTCHA validation

### /auth/turnstile
- Authentication with Cloudflare Turnstile security challenge
- Valid credentials: testuser/password123
- Uses test sitekey (3x00000000000000000000FF) that forces interactive challenge
- Requires manually completing Turnstile challenge before sign in

## Form Routes

### /forms/
- Customer information form with multiple field types
- Fields: custname, custtel, custemail, size, delivery, comments
- Redirects to /forms/result on successful submission

### /forms/result
- Displays submitted form data
- Retrieves data from sessionStorage

## Download Route

### /downloads
- File download testing page
- Multiple file types available for download
- Supports individual and bulk downloads

## Extraction Route

### /extraction
- Element extraction and web scraping test page
- Contains HTTP methods, status codes, and various data formats
- Multiple sections with navigation links

## Navigation Route

### /navigation
- Multi-page navigation simulation
- Pages: home, about, services, contact
- Tracks navigation history and breadcrumbs

## API Routes

### /api/test/auth
- POST: Authentication endpoint
- GET: Check authentication status

### /api/test/forms
- POST: Form submission endpoint

### /api/test/downloads/[fileId]
- Dynamic file download endpoint

### /api/test/get
- General HTTP method testing endpoint

### /api/test/auth-turnstile
- POST: Authentication with Turnstile verification
- GET: Returns Turnstile configuration info
- Validates both credentials and Turnstile token