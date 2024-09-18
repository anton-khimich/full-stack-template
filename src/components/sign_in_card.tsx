'use client';

import { Button } from '@/components/ui/button.tsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { cn } from '@/lib/utils.ts';
import { hcWithType } from '@/server/api/hc.ts';
import { SiGoogle } from '@icons-pack/react-simple-icons';
import { Facebook, Github } from 'lucide-react';

type CardProps = React.ComponentProps<typeof Card>;

const client = hcWithType('');

const signInOptions = [
  {
    name: 'Facebook',
    onClick: () => console.log('Clicked Facebook!'),
    icon: <Facebook className='mr-2 h-4 w-4' />,
  },
  {
    name: 'Google',
    onClick: () => console.log('Clicked Google!'),
    icon: <SiGoogle className='mr-2 h-4 w-4' />,
  },
  {
    name: 'GitHub',
    onClick: () => client.api.login.github.$get(),
    icon: <Github className='mr-2 h-4 w-4' />,
  },
];

export function SignInCard({ className, ...props }: CardProps) {
  return (
    <Card className={cn('w-[300px]', className)} {...props}>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl'>Sign In</CardTitle>
        <CardDescription>
          Login with one of the providers below.
        </CardDescription>
      </CardHeader>
      <CardContent className='grid gap-4'>
        {signInOptions.map((option, index) => (
          <div key={index} className='grid gap-6'>
            <Button
              onClick={option.onClick}
              className='w-full'
              title={option.name}
            >
              {option.icon} {option.name}
            </Button>
            <a href='/api/login/github'>Click here</a>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
