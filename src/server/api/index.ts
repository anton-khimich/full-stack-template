import { Hono } from 'hono';
import { csrf } from 'hono/csrf';

import authMiddleware from '../middleware/auth.ts';
import helloApp from './hello.ts';
import githubApp from './login/github.ts';
import logoutApp from './logout.ts';
import whoamiApp from './whoami.ts';

const app = new Hono()
  .basePath('/api')
  .use(csrf())
  .use(authMiddleware)
  .route('/hello', helloApp)
  .route('/login/github', githubApp)
  .route('/logout', logoutApp)
  .route('/whoami', whoamiApp);

export default app;
export type AppType = typeof app;
