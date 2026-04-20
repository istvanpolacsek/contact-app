# Contact App - Interview Application

A modern contact management application built with **Next.js**, **PostgreSQL**, and **MinIO S3 storage**, deployed using Docker Compose. Features component development with Storybook and managed with Nx monorepo tooling.

## 🚀 Quick Start

### Option 1: Full Stack with Docker Compose (Recommended)

Run the complete application stack with database, file storage, and the Next.js app:

#### Prerequisites
- **Docker** and **Docker Compose** ([install](https://docs.docker.com/compose/install/))
- 3 GB free disk space (for database and storage volumes)

#### Setup Steps

1. **Clone the repository and navigate to project:**
   ```bash
   cd contact-app
   ```

2. **Create the Docker network:**
   ```bash
   docker network create contact-app
   ```

3. **Configure environment variables:**
   ```bash
   cp apps/app/.env.example apps/app/.env
   ```
   The `.env` file includes defaults for development. No changes needed unless you want to customize ports or credentials.

4. **Start all services:**
   ```bash
   docker-compose -f apps/app/docker-compose.yml up
   ```
   Wait for all services to initialize (about 30-60 seconds).

5. **Access the application:**
   - **Next.js Application:** http://localhost:3000
   - **MinIO Console:** http://localhost:9001 (Access with `minioadmin` / `minioadmin`)
   - **PostgreSQL:** localhost:5432

#### Stopping Services
```bash
docker-compose -f apps/app/docker-compose.yml down
```

To remove volumes and reset data:
```bash
docker-compose -f apps/app/docker-compose.yml down -v
```

---

### Option 2: Local Storybook for Component Development

Run Storybook locally for isolated component development without backend dependencies:

#### Prerequisites
- **Node.js** 18+ and **Yarn 4**
- About 2 GB disk space for dependencies

#### Setup Steps

1. **Navigate to project:**
   ```bash
   cd contact-app
   ```

2. **Install dependencies:**
   ```bash
   yarn install
   ```

3. **Start Storybook:**
   ```bash
   yarn nx run app:storybook
   ```
   Storybook will open automatically in your browser (typically http://localhost:6006).

4. **Develop components:**
   - Edit components in `apps/app/src/components/`
   - Stories are typically in `.stories.tsx` files
   - Changes hot-reload automatically

#### Build Storybook for deployment:
```bash
yarn nx run app:build-storybook
```

---

## 📁 Project Structure

```
contact-app/
├── apps/
│   └── app/                    # Next.js application
│       ├── src/
│       │   ├── app/           # Next.js app router pages
│       │   ├── components/    # Reusable React components
│       │   └── lib/           # Utility functions and API helpers
│       ├── .env               # Environment variables (local development)
│       ├── .env.example       # Template for environment variables
│       ├── docker-compose.yml # Multi-service Docker setup
│       ├── Dockerfile         # Production build configuration
│       └── project.json       # Nx project configuration
├── libs/                       # Shared libraries (if any)
├── nx.json                     # Nx workspace configuration
├── package.json               # Root dependencies
├── tsconfig.base.json         # Base TypeScript configuration
└── yarn.lock                  # Dependency lock file
```

---

## 🔧 Development Workflow

### Linting & Code Quality
```bash
yarn nx lint app
```

### Building the Application
```bash
yarn nx run app:build
```

### Running Tests
```bash
yarn test
```

---

## 🐛 Troubleshooting

### Docker Issues

**Error: "Network contact-app not found"**
- Solution: Create the network first: `docker network create contact-app`

**Ports already in use**
- Modify port mappings in `apps/app/docker-compose.yml`
- Or find and stop conflicting services:
  ```bash
  lsof -i :3000   # Check port 3000
  lsof -i :5432   # Check port 5432
  lsof -i :9000   # Check port 9000
  ```

**Database connection errors on first run**
- The database container needs time to initialize (30-60 seconds)
- Check logs: `docker-compose -f apps/app/docker-compose.yml logs postgres`
- Wait a moment and try again

**MinIO bucket not created**
- MinIO creates the bucket automatically on startup
- Check MinIO console at http://localhost:9001
- If missing, manually create bucket via console

### Local Development Issues

**Storybook won't start**
- Clear cache: `rm -rf .next node_modules/.cache`
- Reinstall: `yarn install`
- Try again: `yarn nx run app:storybook`

**Port 6006 already in use**
- The Storybook port can be customized in `.storybook/main.ts` if it exists
- Or find conflicting process: `lsof -i :6006`

---

## 📝 Environment Variables

See `apps/app/.env.example` for all available configuration options. Key variables:

| Variable | Purpose | Example |
|----------|---------|---------|
| `DB_PASSWORD` | PostgreSQL password | `postgres` |
| `DB_HOSTNAME` | Database host | `postgres` (Docker) or `localhost` |
| `S3_BUCKET` | MinIO bucket name | `contact-app-media` |
| `NEXT_PUBLIC_S3_ENDPOINT_PUBLIC` | Public S3 endpoint URL | `http://localhost:9000` |

---

## 🚢 Production Deployment

The `Dockerfile` at `apps/app/Dockerfile` builds an optimized production image:

```bash
docker build -f apps/app/Dockerfile -t contact-app:latest .
```

Environment variables must be provided at runtime:
```bash
docker run -p 3000:3000 \
  -e DB_HOSTNAME=your-db-host \
  -e DB_USER=your-user \
  -e DB_PASSWORD=your-password \
  -e DB_DATABASE=your-db \
  contact-app:latest
```

---

## 📚 Additional Resources

- **Next.js Docs:** https://nextjs.org/docs
- **Storybook Docs:** https://storybook.js.org/docs
- **Nx Documentation:** https://nx.dev
- **PostgreSQL Docs:** https://www.postgresql.org/docs/
- **MinIO Docs:** https://min.io/docs/minio/container/

---

## 📄 License

MIT

---

Nx monorepo scaffold initialized with Yarn (`yarn@4`) and Plug'n'Play disabled (`nodeLinker: node-modules`).
