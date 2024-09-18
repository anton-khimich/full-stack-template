import { github } from '@/server/auth/providers.ts';
import { z } from 'zod';

const githubUserSchema = z.object({
  id: z.coerce.string().min(1),
  login: z.string().min(1),
});
type GithubUser = z.infer<typeof githubUserSchema>;

export async function fetchGithubUser(code: string): Promise<GithubUser> {
  const tokens = await github.validateAuthorizationCode(code);
  const githubUserResponse = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${tokens.accessToken()}`,
    },
  });

  return githubUserSchema.parse(await githubUserResponse.json());
}
