
# MCP Eval Website

A comprehensive evaluation platform for MCP Bench.

## Tech Stack

- [React 19](https://react.dev) + [React Compiler](https://react.dev/learn/react-compiler)
- TanStack [Start](https://tanstack.com/start/latest) + [Router](https://tanstack.com/router/latest) + [Query](https://tanstack.com/query/latest)
- [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [Drizzle ORM](https://orm.drizzle.team/) + [PostgreSQL](https://www.postgresql.org/)
- Server Functions for type-safe backend operations

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm/yarn
- PostgreSQL 14+ (for database features)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/lobehub/mcp-eval-website.git
   cd mcp-eval-website
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Create a `.env` file based on [`.env.example`](./.env.example):

   ```bash
   cp .env.example .env
   ```

   Update the `DATABASE_URL` with your PostgreSQL connection string.

4. Set up the database (see [Database Setup](./README_DB_SETUP.md) for details):

   ```bash
   # Push schema to database
   pnpm drizzle-kit push
   ```

5. Run the development server:

   ```bash
   pnpm dev
   ```

   The development server should now be running at [http://localhost:3000](http://localhost:3000).

## Features

- **Authentication Tests**: Multiple authentication flow evaluations including Cloudflare Turnstile
- **Form Handling**: Comprehensive form interaction testing with PostgreSQL backend
- **File Downloads**: Download functionality testing
- **Data Extraction**: Content extraction and parsing tests
- **Navigation**: Complex navigation pattern evaluations
- **Database Integration**: Customer form submissions stored in PostgreSQL
- **Server Functions**: Type-safe backend operations using TanStack Start

## Development

### Available Scripts

These scripts in [package.json](./package.json#L5) use **pnpm** by default, but you can modify them to use your preferred package manager.

- **`ui`** - The shadcn/ui CLI. (e.g. `pnpm ui add button` to add the button component)
- **`format`**, **`lint`**, **`check-types`** - Run Prettier, ESLint, and check TypeScript types respectively.
  - **`check`** - Run all three above. (e.g. `pnpm check`)
- **`deps`** - Selectively upgrade dependencies via taze.

### Project Structure

```
src/
├── routes/
│   ├── _layout.auth.*.tsx         # Authentication test routes
│   ├── _layout.forms/              # Form handling tests
│   │   ├── index.tsx               # Form submission page
│   │   └── result.$submissionId.tsx # Dynamic result page
│   ├── _layout.downloads.tsx       # Download tests
│   ├── _layout.extraction.tsx      # Data extraction tests
│   └── _layout.navigation.tsx      # Navigation tests
├── server-functions/               # TanStack Start server functions
│   └── customer-form.ts            # Form submission logic
├── db/                             # Database configuration
│   ├── schema.ts                   # Drizzle ORM schema
│   └── index.ts                    # Database connection
├── components/
│   └── ui/                         # Reusable UI components
└── lib/
    └── utils.ts                    # Utility functions
```

## Building for production

### Deploy to Vercel

This project is configured for Vercel deployment. To deploy:

1. **Via Vercel Dashboard (Recommended)**
   - Import your Git repository on [Vercel](https://vercel.com/new)
   - Add the `DATABASE_URL` environment variable in project settings
   - Vercel will automatically detect the configuration and deploy your app

2. **Via Vercel CLI**
   ```bash
   pnpm dlx vercel
   ```

The project includes:
- `vite.config.ts` configured with `target: "vercel"`
- `vercel.json` with proper build settings

**Database Options for Production:**
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Neon](https://neon.tech/)
- [Supabase](https://supabase.com/)
- Any PostgreSQL-compatible database

### Other Platforms

For other deployment platforms, update the `target` in `vite.config.ts` and read the [hosting docs](https://tanstack.com/start/latest/docs/framework/react/hosting).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [Unlicense](./LICENSE).
