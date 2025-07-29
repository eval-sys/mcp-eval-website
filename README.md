# MCP Eval Website

A comprehensive evaluation platform for MCP Bench

## Tech Stack

- [React 19](https://react.dev) + [React Compiler](https://react.dev/learn/react-compiler)
- TanStack [Start](https://tanstack.com/start/latest) + [Router](https://tanstack.com/router/latest) + [Query](https://tanstack.com/query/latest)
- [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm/yarn

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

3. Create a `.env` file based on [`.env.example`](./.env.example).

4. Run the development server:

   ```bash
   pnpm dev
   ```

   The development server should now be running at [http://localhost:3000](http://localhost:3000).

## Features

- **Authentication Tests**: Multiple authentication flow evaluations
- **Form Handling**: Comprehensive form interaction testing
- **File Downloads**: Download functionality testing
- **Data Extraction**: Content extraction and parsing tests
- **Navigation**: Complex navigation pattern evaluations

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
│   ├── _layout.auth.*.tsx    # Authentication test routes
│   ├── _layout.forms/         # Form handling tests
│   ├── _layout.downloads.tsx  # Download tests
│   ├── _layout.extraction.tsx # Data extraction tests
│   └── _layout.navigation.tsx # Navigation tests
├── components/
│   └── ui/                    # Reusable UI components
└── lib/
    └── utils.ts               # Utility functions
```

## Building for production

### Deploy to Vercel

This project is configured for Vercel deployment. To deploy:

1. **Via Vercel Dashboard (Recommended)**
   - Import your Git repository on [Vercel](https://vercel.com/new)
   - Vercel will automatically detect the configuration and deploy your app

2. **Via Vercel CLI**
   ```bash
   pnpm dlx vercel
   ```

The project includes:
- `vite.config.ts` configured with `target: "vercel"`
- `vercel.json` with proper build settings

### Other Platforms

For other deployment platforms, update the `target` in `vite.config.ts` and read the [hosting docs](https://tanstack.com/start/latest/docs/framework/react/hosting).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [Unlicense](./LICENSE).
