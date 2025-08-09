import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryResult,
} from "@tanstack/react-query";
import type {
  AuthResponse,
  LoginRequest,
  SignupRequest,
  User,
} from "../types/auth";

// get API base URL from environment variables
const API_BASE_URL =
  import.meta.env.VITE_ENV === "development"
    ? import.meta.env.VITE_BACKEND_DEV_URL || "http://localhost:3000"
    : import.meta.env.VITE_BACKEND_PROD_URL ||
      "http://lkogk8wo88koc4404g0wws48.167.235.142.148.sslip.io";

// get current authenticated user
export const useCurrentUser = (): UseQueryResult<{ user: User }, Error> => {
  return useQuery<{ user: User }, Error>({
    queryKey: ["auth", "current-user"],
    queryFn: async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/auth/me`, {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch current user");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching current user:", error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: false,
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, Error, LoginRequest>({
    mutationFn: async (data) => {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        let error;
        try {
          error = await response.json();
        } catch {
          error = {
            message: `HTTP ${response.status}: ${response.statusText}`,
          };
        }
        throw error;
      }
      return response.json();
    },
    onSuccess: (response) => {
      queryClient.setQueryData(["auth", "current-user"], {
        user: response.user,
      });
      queryClient.invalidateQueries({ queryKey: ["auth", "current-user"] });
    },
    onError: () => {
      // remove current user from cache if login fails
      queryClient.removeQueries({ queryKey: ["auth", "current-user"] });
    },
  });
};

export const useSignup = () => {
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, Error, SignupRequest>({
    mutationFn: async (data) => {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        let error;
        try {
          error = await response.json();
        } catch {
          error = {
            message: `HTTP ${response.status}: ${response.statusText}`,
          };
        }
        throw error;
      }
      return response.json();
    },
    onSuccess: (response) => {
      queryClient.setQueryData(["auth", "current-user"], {
        user: response.user,
      });
      queryClient.invalidateQueries({ queryKey: ["auth", "current-user"] });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, void>({
    mutationFn: async () => {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        let error;
        try {
          error = await response.json();
        } catch {
          error = {
            message: `HTTP ${response.status}: ${response.statusText}`,
          };
        }
        throw error;
      }
    },
    onSuccess: () => {
      // Clear all cached data on logout
      queryClient.clear();
    },
  });
};

// Convenience hook for auth state
export const useAuth = () => {
  const { data, isLoading, error } = useCurrentUser();

  return {
    user: data?.user || null,
    isAuthenticated: !!data?.user,
    isLoading,
    error,
  };
};
