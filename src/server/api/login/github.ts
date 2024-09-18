import { lucia } from '@/server/auth/lucia.ts';
import { github } from '@/server/auth/providers.ts';
import { fetchGithubUser } from '@/server/utils/auth.ts';
import { createAccount, getExistingAccount } from '@/server/utils/db.ts';
import { ArcticFetchError, generateState, OAuth2RequestError } from 'arctic';
import { Hono } from 'hono';
import { getCookie, setCookie } from 'hono/cookie';
import { generateIdFromEntropySize } from 'lucia';

const githubApp = new Hono()
  .get('', (c) => {
    const state = generateState();
    const url = github.createAuthorizationURL(state, []);

    setCookie(c, 'github_oauth_state', state, {
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      httpOnly: true,
      maxAge: 60 * 10,
    });

    return c.redirect(url.toString());
  })
  .get('/callback', async (c) => {
    const url = new URL(c.req.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const storedState = getCookie(c, 'github_oauth_state');

    if (!code || !state || !storedState || state !== storedState) {
      return c.json({ error: 'Invalid request!' }, 400);
    }

    try {
      const githubUser = await fetchGithubUser(code);

      const existingAccount = await getExistingAccount('github', githubUser.id);

      if (existingAccount) {
        const session = await lucia.createSession(existingAccount.userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        setCookie(
          c,
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );

        return c.redirect('/');
      }

      const userId = generateIdFromEntropySize(10); // 16 characters long
      await createAccount(userId, 'github', githubUser.id);

      const session = await lucia.createSession(userId, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      setCookie(
        c,
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );

      return c.redirect('/');
    } catch (e) {
      if (e instanceof OAuth2RequestError) {
        // Invalid authorization code, credentials, or redirect URI
        return c.json({ error: e.cause }, 400);
      }
      if (e instanceof ArcticFetchError) {
        // Failed to call `fetch()`
        return c.json({ error: e.cause }, 400);
      }
      // Parse error
      console.error(e);
      return c.json({ error: 'Internal server error!' }, 500);
    }
  });

export default githubApp;
