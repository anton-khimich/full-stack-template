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
import { SiGoogle } from '@icons-pack/react-simple-icons';
import { Facebook, Github } from 'lucide-react';

type CardProps = React.ComponentProps<typeof Card>;

const signInOptions = [
  {
    name: 'Facebook',
    path: '/api/login/facebook',
    icon: <Facebook className='mr-2 h-4 w-4' />,
  },
  {
    name: 'Google',
    path: '/api/login/google',
    icon: <SiGoogle className='mr-2 h-4 w-4' />,
  },
  {
    name: 'GitHub',
    path: '/api/login/github',
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
            <Button className='w-full' title={option.name} asChild>
              <a href={option.path}>
                {option.icon} {option.name}
              </a>
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
