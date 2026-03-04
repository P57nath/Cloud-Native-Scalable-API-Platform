# Step 1 — Project Initialization (Explanations)

## What each dependency does

| Package | Purpose |
|--------|---------|
| **@nestjs/common** | Core Nest building blocks: decorators (`@Controller`, `@Injectable`, `@Get`), pipes, guards, filters, interfaces. |
| **@nestjs/core** | Nest runtime: application bootstrap, module system, dependency injection container. |
| **@nestjs/platform-express** | Uses Express under the hood to handle HTTP (you can swap to Fastify later). |
| **@nestjs/config** | Loads `.env` into `process.env` and provides `ConfigService` for typed access to config. |
| **@nestjs/typeorm** | Integrates TypeORM with Nest: `TypeOrmModule`, repository injection. |
| **typeorm** | ORM: maps entities to tables, runs queries, migrations. |
| **pg** | PostgreSQL driver; TypeORM uses it to talk to the database. |
| **reflect-metadata** | Required for decorators and dependency injection (emitted metadata). |
| **rxjs** | Used by Nest for streams and async handling in controllers. |

## How NestJS architecture works

- **Modules** (`@Module`) group controllers and services. `AppModule` is the root; you add feature modules (e.g. `UserModule`, `AuthModule`).
- **Controllers** (`@Controller`) define routes and call services. They should stay thin.
- **Services** (`@Injectable`) hold business logic and use repositories or other services.
- **Providers** are any injectable (services, repos, etc.). They are registered in a module’s `providers` (or via `TypeOrmModule.forFeature([...])` for entities).

Request flow: **HTTP → Express → Nest pipeline (middleware → guards → interceptors → pipes) → Controller → Service → (e.g. TypeORM) → DB**.

## How dependency injection works

- Nest’s **DI container** creates and keeps a single instance (singleton) of each provider per module by default.
- When a class has a constructor like `constructor(private readonly appService: AppService) {}`, Nest sees the type (and optional decorators), creates or reuses `AppService`, and **injects** it.
- So you never do `new AppService()`; you declare what you need and Nest injects it. This makes testing easy (you can inject mocks) and keeps dependencies explicit.

## Environment variables

- **@nestjs/config** with `ConfigModule.forRoot({ isGlobal: true })` loads `.env` from the project root.
- You can inject `ConfigService` and use `configService.get<string>('DB_HOST')` instead of `process.env.DB_HOST` for consistency and testability.
- Copy `.env.example` to `.env` and set your PostgreSQL and JWT values. Never commit `.env`.
