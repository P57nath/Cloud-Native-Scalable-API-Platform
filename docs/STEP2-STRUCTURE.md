# Step 2 — Folder Structure (Clean Architecture)

## Why this structure is scalable

```
src/
  modules/          # Feature modules: one folder per domain (user, auth, product, ...)
    user/
    auth/
  common/           # Shared filters, guards, interceptors, pipes, decorators
    filters/
    interceptors/
    guards/
  config/           # App and database configuration (env-based)
  database/         # Optional: migrations, seeds (when you add them)
```

- **modules/** — Each feature (user, auth, etc.) owns its controllers, services, DTOs, and entities. Adding a new feature = new folder + import in `AppModule`. No cross-cutting clutter.
- **common/** — Reusable HTTP/security pieces (e.g. global exception filter, JWT guard, logging interceptor) live in one place. Any module can use them.
- **config/** — Centralizes configuration (DB, JWT, etc.) so the rest of the app depends on `ConfigService` or typed config objects, not raw `process.env` scattered everywhere.
- **database/** — When you introduce migrations, they stay in one predictable place.

This keeps the app **monolithic but production-structured**: clear boundaries, easy to test, and later you can extract a module into a separate service if needed.
