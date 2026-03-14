import { clsx, type ClassValue } from "clsx"
import type { ApiError } from "next/dist/server/api-utils";
import type { ReactElement, ReactNode } from "react";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const ConditionalRenderer = ({
  check,
  children,
}: {
  readonly check: boolean;
  readonly children: ReactNode;
}): ReactNode | undefined => {
  if (!check) return null;

  return children;
};

export function isApiError(err: unknown): err is ApiError {
  return (
    typeof err === "object" &&
    err !== null &&
    "error" in err &&
    "message" in err &&
    "statusCode" in err
  );
}