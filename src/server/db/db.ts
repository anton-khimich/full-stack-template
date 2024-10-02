import { createClient } from '@libsql/client/web';
import { drizzle, LibSQLDatabase } from 'drizzle-orm/libsql';

let dbClient: LibSQLDatabase | undefined;

export function createDbClient(): LibSQLDatabase {
  return drizzle(
    createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    }),
  );
}

export function getDbClient(): LibSQLDatabase {
  if (!dbClient) {
    dbClient = createDbClient();
  }
  return dbClient;
}
