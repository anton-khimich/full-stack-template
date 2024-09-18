'use client';

import { hcWithType } from '@/server/api/hc.ts';
import { useEffect, useState } from 'react';

const client = hcWithType('');

export default function Page() {
  const [userId, setUserId] = useState<string>();

  useEffect(() => {
    async function fetchUser() {
      const res = await client.api.whoami.$get();
      if (res.status === 401) {
        const data = await res.json();
        console.warn(data.error);
      } else {
        const data = await res.json();
        setUserId(data.user.id);
      }
    }
    fetchUser().catch((e: unknown) => {
      console.error('Unknown error occurred!', e);
    });
  }, []);

  return (
    <>
      <h1>Hello, Next.js!</h1>
      {userId ?
        <p>Logged in!</p>
      : <p>Logged out...</p>}
    </>
  );
}
