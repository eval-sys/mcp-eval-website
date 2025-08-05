# Database Setup Instructions

## PostgreSQL Setup

1. **Install PostgreSQL** (if not already installed):
   - macOS: `brew install postgresql`
   - Ubuntu/Debian: `sudo apt-get install postgresql`
   - Windows: Download from https://www.postgresql.org/download/windows/

2. **Start PostgreSQL**:
   - macOS: `brew services start postgresql`
   - Linux: `sudo systemctl start postgresql`
   - Windows: Start from Services

3. **Create Database**:
   ```bash
   # Connect to PostgreSQL
   psql -U postgres

   # Create database
   CREATE DATABASE mcp_eval_db;

   # Exit
   \q
   ```

4. **Update Environment Variables**:
   - Copy `.env.example` to `.env`
   - Update `DATABASE_URL` with your PostgreSQL connection string
   - Default: `postgresql://postgres:postgres@localhost:5432/mcp_eval_db`

5. **Run Database Migrations**:
   
   Option A - Using Push (Recommended for development):
   ```bash
   # Push schema directly to database without generating migration files
   pnpm drizzle-kit push
   ```

   Option B - Using Migrations (Recommended for production):
   ```bash
   # Generate migration files
   pnpm drizzle-kit generate

   # Apply migrations to database
   pnpm drizzle-kit migrate
   ```

   Other useful commands:
   ```bash
   # Pull schema from existing database
   pnpm drizzle-kit pull

   # Check migration consistency
   pnpm drizzle-kit check
   ```

## Vercel Deployment

For production deployment on Vercel:

1. Add a PostgreSQL database (e.g., Vercel Postgres, Supabase, or Neon)
2. Add `DATABASE_URL` environment variable in Vercel project settings
3. Deploy as usual

## Testing

The Customer Information Form now:
- Saves submissions to PostgreSQL database
- Returns a unique submission ID
- Displays submission data on the result page by fetching from database
- No longer uses sessionStorage