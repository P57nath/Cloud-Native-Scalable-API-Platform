import { DataSource, DataSourceOptions } from 'typeorm';

/**
 * TypeORM configuration built from environment variables.
 * Used by TypeOrmModule.forRoot() in AppModule.
 */
export function typeOrmConfig(): DataSourceOptions {
  return {
    type: 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USERNAME ?? 'postgres',
    password: process.env.DB_PASSWORD ?? '1234',
    database: process.env.DB_DATABASE ?? 'api_platform',
    // Entities path: works when running from dist/ (compiled) or src/ (dev)
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: process.env.NODE_ENV !== 'production', // only for dev; use migrations in prod
    logging: process.env.NODE_ENV !== 'production',
  };
}

// Export DataSource for CLI migrations (optional, later)
const dataSource = new DataSource(typeOrmConfig());
export { dataSource };
