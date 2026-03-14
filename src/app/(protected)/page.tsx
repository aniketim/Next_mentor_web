"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/contexts/auth-context";

export default function Home() {
  const { user, signOut } = useAuth();

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
      </main>
    </div>
  );
}
