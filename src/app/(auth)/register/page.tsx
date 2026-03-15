'use client';

import { useForm, Controller } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  AuthProvider as AuthProviderEnum,
  Role,
} from '@amitShindeGit/workt-npm-package';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn, ConditionalRenderer, isApiError } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader } from '@/components/ui/spinner';
import { authApi } from '@/lib/service/auth-api';
import { useCallback, useState } from 'react';
import { Google } from '@/lib/assets/icons';

type RegisterFormValues = {
  email: string;
  username: string;
  password: string;
  confirm_password: string;
  role: '' | Role;
};

const ROLE_OPTIONS: { value: Role; label: string }[] = [
  { value: Role.EMPLOYER, label: 'Employer' },
  { value: Role.FREELANCER, label: 'Freelancer' },
];

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    defaultValues: { role: '' },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const password = watch('password');

  const handleRegister = useCallback(
    async (data: RegisterFormValues) => {
      try {
        setIsLoading(true);
        setError(null);
        await authApi.register({
          user: {
            email: data.email,
            username: data.username,
            password: data.password,
            confirmPassword: data.confirm_password,
            role: data.role as Role.EMPLOYER | Role.FREELANCER,
          },
          providerData: {
            provider: AuthProviderEnum.LOCAL,
          },
        });
        router.replace('/login');
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
    [router],
  );

  const onSubmit = (data: RegisterFormValues) => {
    void handleRegister(data);
  };

  const handleGoogleLogin = useCallback(() => {}, []);

  return (
    <>
      <ConditionalRenderer check={isLoading}>
        <Loader />
      </ConditionalRenderer>
      <div className='flex min-h-screen w-full flex-col items-center justify-center bg-background px-4'>
        <Card className='w-full min-w-[280px] max-w-xl shrink-0 sm:min-w-[400px]'>
          <CardHeader className='text-center'>
            <CardTitle className='text-2xl'>Sign up</CardTitle>
            <CardDescription>Create an account to get started</CardDescription>
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
                  htmlFor='username'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  Username
                </label>
                <Input
                  id='username'
                  type='text'
                  autoComplete='username'
                  placeholder='johndoe'
                  aria-invalid={!!errors.username}
                  className={cn(errors.username && 'border-destructive')}
                  {...register('username', {
                    required: 'Username is required',
                  })}
                />
                {errors.username && (
                  <p className='text-sm text-destructive' role='alert'>
                    {errors.username.message}
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
                  autoComplete='new-password'
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

              <div className='space-y-2'>
                <label
                  htmlFor='confirm_password'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  Confirm password
                </label>
                <Input
                  id='confirm_password'
                  type='password'
                  autoComplete='new-password'
                  placeholder='••••••••'
                  aria-invalid={!!errors.confirm_password}
                  className={cn(
                    errors.confirm_password && 'border-destructive',
                  )}
                  {...register('confirm_password', {
                    required: 'Please confirm your password',
                    validate: (value) =>
                      value === password || 'Passwords do not match',
                  })}
                />
                {errors.confirm_password && (
                  <p className='text-sm text-destructive' role='alert'>
                    {errors.confirm_password.message}
                  </p>
                )}
              </div>

              <div className='space-y-2'>
                <label
                  htmlFor='role'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  Role
                </label>
                <Controller
                  name='role'
                  control={control}
                  rules={{ required: 'Role is required' }}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      required
                    >
                      <SelectTrigger
                        id='role'
                        aria-invalid={!!errors.role}
                        className={cn(errors.role && 'border-destructive')}
                      >
                        <SelectValue placeholder='Select role' />
                      </SelectTrigger>
                      <SelectContent>
                        {ROLE_OPTIONS.map((opt) => (
                          <SelectItem
                            key={opt.value}
                            value={opt.value}
                            textValue={opt.label}
                          >
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.role && (
                  <p className='text-sm text-destructive' role='alert'>
                    {errors.role.message}
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
                {isSubmitting ? 'Creating account…' : 'Sign up'}
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

            <p className='mt-6 text-center text-sm text-muted-foreground'>
              Already have an account?{' '}
              <Link
                href='/login'
                className='font-medium text-primary underline-offset-4 hover:underline'
              >
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
