import { Hono } from 'hono';
import { csrf } from 'hono/csrf';

import helloApp from './routes/hello.ts';

const app = new Hono().basePath('/api').use(csrf());

app.route('/hello', helloApp);

export default app;
export type AppType = typeof app;
