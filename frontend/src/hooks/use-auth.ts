import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  AuthResponse,
  LoginRequest,
  SignupRequest,
  User,
} from "../types/auth.types";

const API_BASE_URL =
  import.meta.env.VITE_ENV === "development"
    ? import.meta.env.VITE_BACKEND_DEV_URL
    : import.meta.env.VITE_BACKEND_PROD_URL;

// get current authenticated user
// handles caching and refetching of user data automatically
export const useCurrentUser = () => {
  return useQuery<User, Error>({
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
        const data: { user: User } = await response.json(); // the resulting object must have a property named user, and the value of that property must match the structure of the User
        return data.user;
      } catch (error) {
        console.error("Error fetching current user:", error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: false,
  });
};

// Convenience hook for auth state
export const useAuth = () => {
  const { data, isLoading, error } = useCurrentUser();

  return {
    user: data || null,
    isAuthenticated: !!data,
    authLoading: isLoading,
    error,
  };
};

export const useSignup = () => {
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, Error, SignupRequest>({
    mutationFn: async (data: SignupRequest): Promise<AuthResponse> => {
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
    onSuccess: (response: AuthResponse) => {
      queryClient.setQueryData<User>(["auth", "current-user"], response.user);
    },
    onError: () => {
      queryClient.removeQueries({ queryKey: ["auth", "current-user"] });
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, Error, LoginRequest>({
    mutationFn: async (data: LoginRequest): Promise<AuthResponse> => {
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
    onSuccess: (response: AuthResponse) => {
      queryClient.setQueryData(["auth", "current-user"], response.user);
      queryClient.invalidateQueries({ queryKey: ["auth", "current-user"] });
    },
    onError: () => {
      queryClient.removeQueries({ queryKey: ["auth", "current-user"] });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, Error, void>({
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
      return response.json();
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
};

export const useUpdateGrade = () => {
  const queryClient = useQueryClient();

  return useMutation<
    { message: string; grade: string },
    Error,
    { grade: string }
  >({
    mutationFn: async (data: { grade: string }) => {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/grade`, {
        method: "PATCH",
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
    onSuccess: (_response, variables) => {
      // Update the user in cache
      queryClient.setQueryData<User>(["auth", "current-user"], (old) => {
        if (!old) return old;
        return { ...old, grade: variables.grade };
      });
      queryClient.invalidateQueries({ queryKey: ["auth", "current-user"] });
    },
  });
};
