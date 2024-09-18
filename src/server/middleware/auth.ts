import { Context, Next } from 'hono';
import { getCookie, setCookie } from 'hono/cookie';
import type { Session, User } from 'lucia';

import { lucia } from '../auth/lucia.ts';

const authMiddleware = async (
  c: Context<
    {
      Variables: {
        user: User | null;
        session: Session | null;
      };
    },
    '*'
  >,
  next: Next,
) => {
  const sessionId = getCookie(c, lucia.sessionCookieName) ?? null;
  if (!sessionId) {
    c.set('user', null);
    c.set('session', null);
    return next();
  }
  const { session, user } = await lucia.validateSession(sessionId);
  if (session?.fresh) {
    setCookie(
      c,
      lucia.sessionCookieName,
      lucia.createSessionCookie(session.id).serialize(),
    );
  }
  if (!session) {
    setCookie(
      c,
      lucia.sessionCookieName,
      lucia.createBlankSessionCookie().serialize(),
    );
  }
  c.set('user', user);
  c.set('session', session);
  return next();
};

export default authMiddleware;
