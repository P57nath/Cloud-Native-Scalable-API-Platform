# Step 5 — Production Practices & Request Lifecycle

## Request lifecycle in NestJS

Order of execution for an incoming request:

1. **Middleware** — Runs first (e.g. logging, cors). Can call `next()` or short-circuit.
2. **Guards** — Decide if the request is allowed (e.g. JWT valid?). If a guard returns false or throws, the request stops.
3. **Interceptors** (before) — Run before the route handler; can modify the request or log.
4. **Pipes** — Transform or validate input (e.g. body, query). ValidationPipe runs our class-validator rules here.
5. **Route handler** — Controller method runs.
6. **Interceptors** (after) — Can transform the response.
7. **Exception filters** — If anything throws, the filter catches it and shapes the HTTP response (e.g. 400, 404, 500).

So: **Middleware → Guards → Pipes → Controller → (optional) Interceptor → (on error) Exception Filter**.

## What we added

- **ValidationPipe (global)** — Validates every request body/query that uses a DTO with class-validator decorators. Invalid input → 400 with error messages.
- **Global exception filter** — Catches any unhandled exception and returns a consistent JSON shape with statusCode and message.
- **Logging middleware** — Logs method, URL, and response time for every request.
- **Health check (GET /health)** — Returns 200 and a simple status so load balancers or orchestrators can probe liveness.
