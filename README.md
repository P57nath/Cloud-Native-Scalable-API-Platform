# Cloud-Native Scalable API Platform — Baseline v1

Monolithic NestJS backend with TypeORM and PostgreSQL. No Docker/Kubernetes/Redis/microservices/CI-CD in this baseline.

## Tech stack

- Node.js, NestJS, TypeScript
- TypeORM, PostgreSQL
- @nestjs/config (`.env`), JWT auth, bcrypt, class-validator

## Commands

```bash
# Install dependencies
npm install

# Copy env and set your DB + JWT values
cp .env.example .env

# Run in development
npm run start:dev

# Build
npm run build

# Run production build
npm run start:prod
```

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Hello message |
| GET | `/health` | Health check (status, timestamp) |
| POST | `/auth/register` | Register (body: `email`, `password`) |
| POST | `/auth/login` | Login (body: `email`, `password`) |
| GET | `/auth/me` | Current user (protected; `Authorization: Bearer <token>`) |

## Docs

- `docs/STEP1-EXPLANATIONS.md` — Dependencies, Nest architecture, DI
- `docs/STEP2-STRUCTURE.md` — Folder structure and scalability
- `docs/STEP3-DATABASE.md` — Entity decorators, ORM mapping, migrations
- `docs/STEP4-AUTH.md` — JWT, auth flow, guards
- `docs/STEP5-REQUEST-LIFECYCLE.md` — Middleware, guards, pipes, filters
- `docs/STEP6-SECURITY-CLEAN.md` — Password hiding, DTOs, env, config