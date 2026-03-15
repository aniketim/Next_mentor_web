'use client';

import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn, ConditionalRenderer, isApiError } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader } from '@/components/ui/spinner';
import { useAuth } from '@/lib/contexts/auth-context';
import { authApi } from '@/lib/service/auth-api';
import { getConfig } from '@/lib/config';
import { useCallback, useEffect, useState } from 'react';
import { Google } from '@/lib/assets/icons';

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn, isAuthenticated, isReady } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserInfo = useCallback(
    async (code: string) => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await authApi.oAuthUserInfo(code);
        signIn({
          userData: response.user,
          accessToken: response.accessToken,
        });
        router.replace('/');
      } catch (err) {
        if (isApiError(err)) {
          setError(err.message);
        } else {
          setError('Something went wrong. Please retry');
        }
      } finally {
        setIsLoading(false);
      }
    },
    [router, signIn],
  );

  useEffect(() => {
    if (isReady && isAuthenticated) {
      router.replace('/');
    }

    // OAuth callback handler
    const code = searchParams.get('accessToken');
    const oAuthError = searchParams.get('error');

    if (!code || oAuthError) return;

    const url = new URL(window.location.href);
    url.searchParams.delete('accessToken');
    router.replace(url.toString());

    void fetchUserInfo(code);
    
  }, [isReady, isAuthenticated, router, searchParams, fetchUserInfo]);

  const handleLogin = useCallback(
    async (data: LoginFormValues) => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await authApi.login(data);
        signIn({
          userData: response.user,
          accessToken: response.accessToken,
        });
        router.replace('/');
      } catch (err) {
        if (isApiError(err)) {
          setError(err.message);
        } else {
          setError('Something went wrong. Please retry');
        }
      } finally {
        setIsLoading(false);
      }
    },
    [signIn, router],
  );

  const onSubmit = (data: LoginFormValues) => {
    void handleLogin(data);
  };

  const handleGoogleLogin = useCallback(() => {
    setError(null);
    // OAuth must use a full page redirect so the backend can redirect to Google.
    // Using fetch/XHR would follow the redirect and hit CORS (Google doesn't allow it).
    const { NEXT_PUBLIC_AUTH_BACKEND_BASE_URL } = getConfig();
    const base = NEXT_PUBLIC_AUTH_BACKEND_BASE_URL.replace(/\/$/, '');
    window.location.href = `${base}/api/v1/auth/oauth/google`;
  }, []);

  return (
    <>
      <ConditionalRenderer check={isLoading}>
        <Loader />
      </ConditionalRenderer>
      <div className='flex min-h-screen w-full flex-col items-center justify-center bg-background px-4'>
        <Card className='w-full min-w-[280px] max-w-xl shrink-0 sm:min-w-[400px]'>
          <CardHeader className='text-center'>
            <CardTitle className='text-2xl'>Sign in</CardTitle>
            <CardDescription>
              Enter your credentials to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
              <div className='space-y-2'>
                <label
                  htmlFor='email'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  Email
                </label>
                <Input
                  id='email'
                  type='email'
                  autoComplete='email'
                  placeholder='you@example.com'
                  aria-invalid={!!errors.email}
                  className={cn(errors.email && 'border-destructive')}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Invalid email address',
                    },
                  })}
                />
                {errors.email && (
                  <p className='text-sm text-destructive' role='alert'>
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className='space-y-2'>
                <label
                  htmlFor='password'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  Password
                </label>
                <Input
                  id='password'
                  type='password'
                  autoComplete='current-password'
                  placeholder='••••••••'
                  aria-invalid={!!errors.password}
                  className={cn(errors.password && 'border-destructive')}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                    maxLength: {
                      value: 15,
                      message: 'Password must be at most 15 characters',
                    },
                  })}
                />
                {errors.password && (
                  <p className='text-sm text-destructive' role='alert'>
                    {errors.password.message}
                  </p>
                )}
              </div>

              <ConditionalRenderer check={!!error}>
                <p className='text-sm text-destructive' role='alert'>
                  {error}
                </p>
              </ConditionalRenderer>
              <Button
                type='submit'
                variant='primary'
                className='w-full'
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing in…' : 'Sign in'}
              </Button>

              <Button
                type='button'
                variant='secondary'
                className='w-full'
                icon={<Google width={20} height={20} />}
                onClick={handleGoogleLogin}
              >
                Google
              </Button>
            </form>

            <p className='text-center text-sm text-muted-foreground'>
              Don&apos;t have an account?{' '}
              <Link
                href='/register'
                className='font-medium text-primary underline-offset-4 hover:underline'
              >
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
