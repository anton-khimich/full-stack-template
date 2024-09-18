import { Hono } from 'hono';

const helloApp = new Hono().get('', (c) => {
  return c.json({
    message: 'Hello Next.js!',
  });
});

export default helloApp;
