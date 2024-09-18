import { Hono } from 'hono';
import { setCookie } from 'hono/cookie';
import { Session, User } from 'lucia';

import { lucia } from '../auth/lucia.ts';

const logoutApp = new Hono<{
  Variables: {
    user: User | null;
    session: Session | null;
  };
}>().get('', async (c) => {
  const session = c.get('session');
  if (!session) {
    return c.json({ error: 'Cannot log out as user is not logged in.' }, 401);
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  setCookie(
    c,
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return c.redirect('/login');
});

export default logoutApp;
