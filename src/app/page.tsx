'use client';

import { Button, buttonVariants } from '@/components/ui/button.tsx';
import { hcWithType } from '@/server/api/hc.ts';
import LinkModule from 'next/link.js';
import { useEffect, useState } from 'react';

const Link = LinkModule.default;

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
        <p>
          Logged in!{' '}
          <Button className='w-auto' title='Logout' asChild>
            <a href='/api/logout'>Logout</a>
          </Button>
        </p>
      : <p>
          Logged out...{' '}
          <Link
            href={'/login'}
            className={`${buttonVariants({ variant: 'default' })} w-auto`}
          >
            Login
          </Link>
        </p>
      }
    </>
  );
}
