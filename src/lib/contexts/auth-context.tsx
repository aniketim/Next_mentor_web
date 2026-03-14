"use client";

import { authApiClient } from "@/lib/service/auth-api";
import type { LoginResponseData } from "@amitShindeGit/workt-npm-package";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const AUTH_ACCESS_TOKEN_KEY = "auth_access_token";
const AUTH_USER_KEY = "auth_user";

type AuthContextType = {
  user: LoginResponseData["user"] | null;
  isAuthenticated: boolean;
  isReady: boolean;
  signIn: (args: {
    userData: LoginResponseData["user"];
    accessToken: string;
  }) => void;
  signOut: () => void;
  updateUser: (userData: Partial<LoginResponseData["user"]>) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isReady: false,
  signIn: () => {},
  signOut: () => {},
  updateUser: () => {},
});

type AuthProviderProps = { children: ReactNode };

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<LoginResponseData["user"] | null>(null);
  const [isReady, setIsReady] = useState(false);

  const signIn = useCallback(
    ({
      userData,
      accessToken,
    }: {
      userData: LoginResponseData["user"];
      accessToken: string;
    }) => {
      setUser(userData);
      authApiClient.setAuthToken(accessToken);
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(AUTH_ACCESS_TOKEN_KEY, accessToken);
        window.sessionStorage.setItem(AUTH_USER_KEY, JSON.stringify(userData));
      }
    },
    []
  );

  const signOut = useCallback(() => {
    setUser(null);
    authApiClient.setAuthToken(undefined);
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(AUTH_ACCESS_TOKEN_KEY);
      window.sessionStorage.removeItem(AUTH_USER_KEY);
    }
  }, []);

  const updateUser = useCallback(
    (userData: Partial<LoginResponseData["user"]>) => {
      setUser((prev) => {
        if (!prev) return prev;
        const next = { ...prev, ...userData };
        if (typeof window !== "undefined") {
          window.sessionStorage.setItem(AUTH_USER_KEY, JSON.stringify(next));
        }
        return next;
      });
    },
    []
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      setIsReady(true);
      return;
    }
    const token = window.sessionStorage.getItem(AUTH_ACCESS_TOKEN_KEY);
    const storedUser = window.sessionStorage.getItem(AUTH_USER_KEY);
    if (token && storedUser) {
      try {
        const userData = JSON.parse(storedUser) as LoginResponseData["user"];
        setUser(userData);
        authApiClient.setAuthToken(token);
      } catch {
        window.sessionStorage.removeItem(AUTH_ACCESS_TOKEN_KEY);
        window.sessionStorage.removeItem(AUTH_USER_KEY);
      }
    }
    setIsReady(true);
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isReady,
    signIn,
    signOut,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
