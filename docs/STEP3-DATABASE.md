# Step 3 — Database (TypeORM) & User Entity

## What the decorators mean

- **@Entity()** — Marks the class as a TypeORM entity; by default the table name is the class name in snake_case (`user`).
- **@PrimaryGeneratedColumn('uuid')** — Primary key, auto-generated UUID.
- **@Column()** — Maps the property to a column. Options like `unique: true`, `length`, `type` customize the column.
- **@CreateDateColumn()** — TypeORM sets this automatically on insert.
- **@UpdateDateColumn()** — TypeORM updates this on every save.

## How the ORM maps entity to table

TypeORM turns the `User` class into a `user` table. Each decorated property becomes a column. When you use `userRepository.save(user)`, TypeORM generates `INSERT`/`UPDATE`; when you use `userRepository.find()`, it runs `SELECT` and maps rows back to `User` instances. So you work with objects; TypeORM handles SQL.

## How migrations work (optional for now)

In production you should use **migrations** instead of `synchronize: true`. Migrations are versioned SQL files (e.g. "add role to user table"). You generate them with `typeorm migration:generate` and run them with `typeorm migration:run`. That way schema changes are repeatable and safe. For this baseline we use `synchronize` in dev only for simplicity.
