import { and, eq } from 'drizzle-orm';

import { db } from '../db/db.ts';
import { accountTable, userTable } from '../db/schema/auth.ts';

export async function getExistingAccount(
  provider: string,
  providerUserId: string,
) {
  return db
    .select()
    .from(accountTable)
    .where(
      and(
        eq(accountTable.providerId, provider),
        eq(accountTable.providerUserId, providerUserId),
      ),
    )
    .get();
}

export async function createAccount(
  userId: string,
  provider: string,
  providerUserId: string,
) {
  await db.batch([
    db.insert(userTable).values({ id: userId }),
    db.insert(accountTable).values({
      providerId: provider,
      providerUserId,
      userId,
    }),
  ]);
}
