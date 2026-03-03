import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  AuthResponse,
  LoginRequest,
  SignupRequest,
  User,
} from "../types/auth.types";
import {
  getCurrentUser,
  loginService,
  logoutService,
  signupService,
  updateGradeService,
} from "@/service/auth-service";

export const useCurrentUser = () => {
  return useQuery<User, Error>({
    queryKey: ["auth", "current-user"],
    queryFn: getCurrentUser,
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
    mutationFn: signupService,
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
    mutationFn: loginService,
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
    mutationFn: logoutService,
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
    mutationFn: updateGradeService,
    onSuccess: (_response, variables) => {
      queryClient.setQueryData<User>(["auth", "current-user"], (old) => {
        if (!old) return old;
        return { ...old, grade: variables.grade };
      });
      queryClient.invalidateQueries({ queryKey: ["auth", "current-user"] });
    },
  });
};
