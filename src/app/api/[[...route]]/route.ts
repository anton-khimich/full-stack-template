import app from '@/server/api/index.ts';
import { handle } from 'hono/vercel';

export const runtime = 'edge';

export const GET = handle(app);
export const POST = handle(app);
