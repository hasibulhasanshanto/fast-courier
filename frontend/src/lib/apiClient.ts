import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

/**
 * Base URL for the JSONPlaceholder REST API. Centralized so that swapping
 * the backend (mock vs. production) only requires changing one constant.
 */
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "https://jsonplaceholder.typicode.com";

/**
 * Normalized error shape returned to the service / store layers.
 * Keeping it small and serializable makes it easy to surface in UI.
 */
export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

/**
 * Pull a friendly error message out of an Axios error (or any unknown error).
 * The JSONPlaceholder API doesn't always return a useful body, so we fall
 * back to a generic message when the response is empty.
 */
function toApiError(err: unknown): ApiError {
  if (err instanceof AxiosError) {
    const status = err.response?.status ?? 0;
    const data = err.response?.data;
    const message =
      (typeof data === "string" && data) ||
      (data && typeof data === "object" && "message" in data
        ? String((data as { message: unknown }).message)
        : null) ||
      err.message ||
      "Request failed";
    return new ApiError(message, status, data);
  }
  if (err instanceof Error) {
    return new ApiError(err.message, 0, null);
  }
  return new ApiError("Unknown error", 0, null);
}

/**
 * Pre-configured Axios instance. Use this everywhere — don't import
 * `axios` directly in features so the base URL and interceptors stay
 * consistent.
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor: forward auth token from Zustand store on every call.
// We import lazily inside the interceptor to avoid a circular dependency
// between the auth store and the API client.
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    try {
      // Read the persisted auth state directly from localStorage so we
      // don't pull the auth store into the network layer's hot path.
      const raw = localStorage.getItem("auth-store");
      if (raw) {
        const parsed = JSON.parse(raw) as {
          state?: { token?: string | null };
        };
        const token = parsed.state?.token;
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch {
      // Ignore: a malformed persisted store shouldn't kill the request.
    }
    return config;
  },
  (err) => Promise.reject(err),
);

// Response interceptor: unwrap data and normalize errors so call sites
// only deal with the success payload or an `ApiError`.
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (err) => Promise.reject(toApiError(err)),
);

/**
 * Thin wrapper around the configured Axios instance. Returns the response
 * `data` directly so service functions read like:
 *
 *   const posts = await apiGet<Post[]>("/posts");
 */
export async function apiGet<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  const res = await apiClient.get<T>(url, config);
  return res.data;
}

export async function apiPost<T, B = unknown>(
  url: string,
  body?: B,
  config?: AxiosRequestConfig,
): Promise<T> {
  const res = await apiClient.post<T>(url, body, config);
  return res.data;
}

export async function apiPut<T, B = unknown>(
  url: string,
  body?: B,
  config?: AxiosRequestConfig,
): Promise<T> {
  const res = await apiClient.put<T>(url, body, config);
  return res.data;
}

export async function apiPatch<T, B = unknown>(
  url: string,
  body?: B,
  config?: AxiosRequestConfig,
): Promise<T> {
  const res = await apiClient.patch<T>(url, body, config);
  return res.data;
}

export async function apiDelete<T = unknown>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  const res = await apiClient.delete<T>(url, config);
  return res.data;
}
