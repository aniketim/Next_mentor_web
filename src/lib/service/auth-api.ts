import { ApiClient, AuthApi, ProviderApi } from "@amitShindeGit/workt-npm-package";
import { getConfig } from "@/lib/config";

const { NEXT_PUBLIC_AUTH_BACKEND_BASE_URL } = getConfig();

const authApiClient = new ApiClient(NEXT_PUBLIC_AUTH_BACKEND_BASE_URL);

export const authApi = new AuthApi(authApiClient);

export const providerApi = new ProviderApi(authApiClient);


export { authApiClient };
