"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn, ConditionalRenderer, isApiError } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader } from "@/components/ui/spinner";
import { useAuth } from "@/lib/contexts/auth-context";
import { authApi } from "@/lib/service/auth-api";
import { useCallback, useEffect, useState } from "react";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const { signIn, isAuthenticated, isReady } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isReady && isAuthenticated) {
      router.replace("/");
    }
  }, [isReady, isAuthenticated, router]);

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
        router.replace("/");
      } catch (err) {
        if (isApiError(err)) {
          setError(err.message);
        } else {
          setError("Something went wrong. Please retry");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [signIn, router]
  );

  const onSubmit = (data: LoginFormValues) => {
    void handleLogin(data);
  };

  return (
    <>
    <ConditionalRenderer check={isLoading}><Loader /></ConditionalRenderer>
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background px-4">
      <Card className="w-full min-w-[280px] max-w-xl shrink-0 sm:min-w-[400px]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Sign in</CardTitle>
          <CardDescription>Enter your credentials to continue</CardDescription>
        </CardHeader>
        <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
              className={cn(errors.email && "border-destructive")}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-destructive" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              aria-invalid={!!errors.password}
              className={cn(errors.password && "border-destructive")}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                maxLength: {
                  value: 15,
                  message: "Password must be at most 15 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-sm text-destructive" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          <ConditionalRenderer check={!!error}><p className="text-sm text-destructive" role="alert">{error}</p></ConditionalRenderer>
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-primary underline-offset-4 hover:underline"
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
