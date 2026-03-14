/** Add new env vars here and in `envSchema` below. Use literal process.env.X so Next.js inlines them. */
export type Config = {
  NEXT_PUBLIC_AUTH_BACKEND_BASE_URL: string;
};

const envSchema = {
  NEXT_PUBLIC_AUTH_BACKEND_BASE_URL: process.env.NEXT_PUBLIC_AUTH_BACKEND_BASE_URL,
} satisfies Record<keyof Config, string | undefined>;

function requireEnv(value: string | undefined, name: string): string {
  if (value === undefined || value.trim() === "") {
    throw new Error(
      `Missing required environment variable: ${name}. Ensure it is set in .env or .env.local.`
    );
  }
  return value.trim();
}

export function getConfig(): Config {
  const config = {} as Config;
  for (const key of Object.keys(envSchema) as (keyof Config)[]) {
    (config as Record<string, string>)[key] = requireEnv(
      envSchema[key],
      key
    );
  }
  return config;
}
