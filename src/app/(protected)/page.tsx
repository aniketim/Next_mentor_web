"use client";

import { Button } from "@/components/ui/button";
import { Google } from "@/lib/assets/icons";
import { getConfig } from "@/lib/config";
import { useAuth } from "@/lib/contexts/auth-context";
import { authApi, providerApi } from "@/lib/service/auth-api";
import { AuthProvider } from "@amitShindeGit/workt-npm-package";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

export default function Home() {
  const { user, signOut, signIn } = useAuth();
  const router = useRouter();

  const searchParams = useSearchParams();



  const handleRevokeAccess = async () => {
    try {
      await providerApi.linkDelinkProviderByUserIdAndProvider({
        provider: AuthProvider.GOOGLE,
        linked: false,
      });

      signOut();
    } catch (err) {
      console.log(err);
    }
  };


  const fetchUserInfo = useCallback(
    async (code: string) => {
      try {

        const response = await authApi.oAuthUserInfo(code);
        signIn({
          userData: response.user,
          accessToken: response.accessToken,
        });
        router.replace('/');
      } catch (err) {
        console.log(err);
      } 
    },
    [router, signIn],
  );

  const handleGoogleLogin = useCallback(() => {
    // OAuth must use a full page redirect so the backend can redirect to Google.
    // Using fetch/XHR would follow the redirect and hit CORS (Google doesn't allow it).
    const { NEXT_PUBLIC_AUTH_BACKEND_BASE_URL } = getConfig();
    const base = NEXT_PUBLIC_AUTH_BACKEND_BASE_URL.replace(/\/$/, '');
    window.location.href = `${base}/api/v1/auth/oauth/google?accessToken=${sessionStorage.getItem('auth_access_token')}`;
  }, []);

  useEffect(() => {

    // OAuth callback handler
    const code = searchParams.get('accessToken');
    const oAuthError = searchParams.get('error');
    if (!code || oAuthError) return;

    const url = new URL(window.location.href);
    url.searchParams.delete('accessToken');
    router.replace(url.toString());

    void fetchUserInfo(code);
    
  }, [fetchUserInfo, router, searchParams]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center justify-between bg-white px-16 py-32 dark:bg-black sm:items-start">
        {user && (
          <p className="text-muted-foreground">
            Signed in as <strong>{user.email}</strong>
          </p>
        )}
        <Button onClick={() => signOut()} variant="primary">
          Sign out
        </Button>

        <Button
                type='button'
                variant='secondary'
                icon={<Google width={20} height={20} />}
                onClick={handleGoogleLogin}
              >
                Google
              </Button>

        <Button icon={<Google width={20} height={20} />} onClick={() => handleRevokeAccess()} variant="secondary">
          Revoke access
        </Button>
      </main>
    </div>
  );
}
