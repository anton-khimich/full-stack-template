import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from 'drizzle-orm/sqlite-core';

export const userTable = sqliteTable('user', {
  id: text('id').primaryKey(),
});

export const sessionTable = sqliteTable('session', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => userTable.id),
  expiresAt: integer('expires_at').notNull(),
});

export const accountTable = sqliteTable(
  'account',
  {
    providerId: text('provider_id'),
    providerUserId: text('provider_user_id'),
    userId: text('user_id')
      .notNull()
      .references(() => userTable.id),
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [table.providerId, table.providerUserId],
      }),
    };
  },
);
