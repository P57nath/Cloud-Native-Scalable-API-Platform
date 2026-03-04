# Step 4 — Authentication

## What JWT is

A **JSON Web Token** is a signed string containing claims (e.g. `{ sub: userId, email }). The server signs it with a secret; later the client sends it (e.g. in `Authorization: Bearer <token>`). The server verifies the signature and trusts the payload. So the server does not need to store sessions; the token is self-contained and stateless.

## How the auth flow works

1. **Register** — Client sends email + password. Server hashes password (bcrypt), saves user, returns success (or JWT).
2. **Login** — Client sends email + password. Server finds user, compares password with bcrypt, then issues a JWT containing the user id (and optionally email/role). Client stores the token and sends it on every request.
3. **Protected routes** — Client sends `Authorization: Bearer <token>`. The JWT guard validates the token and attaches the user to the request; the controller can use it.

## What the guard does internally

The **JwtAuthGuard** uses Passport’s JWT strategy. For each request it:
1. Reads the Bearer token from the header.
2. Verifies the signature with `JWT_SECRET`.
3. If valid, loads the user (e.g. by `payload.sub`) and sets `request.user`.
4. If invalid or missing, it throws Unauthorized and the request never reaches the controller.

So the guard is the gatekeeper: no valid JWT ⇒ 401.
