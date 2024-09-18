import { Hono } from 'hono';
import { Session, User } from 'lucia';

const whoamiApp = new Hono<{
  Variables: {
    user: User | null;
    session: Session | null;
  };
}>().get('', (c) => {
  const user = c.get('user');
  if (!user) {
    return c.json({ error: 'User is not logged in.' }, 401);
  }

  return c.json({ user }, 200);
});

export default whoamiApp;
