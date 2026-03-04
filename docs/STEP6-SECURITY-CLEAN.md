# Step 6 — Security & Clean Practices

- **Hide password in responses** — Auth endpoints return `user` with password omitted via `omitPassword()`. Never expose hashed passwords.
- **DTOs** — All incoming data (register, login) is validated and typed with class-validator DTOs. This prevents invalid or extra fields and gives clear error messages.
- **Environment variables** — Secrets (DB password, JWT_SECRET) and config (PORT, DB_HOST) live in `.env`. Copy `.env.example` and never commit `.env`.
- **Config structure** — `config/database.config.ts` centralizes DB options; JWT config is in `AuthModule` via `ConfigService`. For more options you can add `config/app.config.ts` and load it with `ConfigModule.forRoot({ load: [appConfig] })`.
