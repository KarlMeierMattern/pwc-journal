// The Flow:
// AuthProvider → calls useAuth() hook
// useAuth() → returns { user, isAuthenticated, authLoading, error }
// AuthProvider → passes this value to AuthContext.Provider
// AuthGuard → calls useAuthContext()
// useAuthContext() → reads from AuthContext
// AuthGuard → gets authLoading from context

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "../hooks/use-auth";
import { AuthContext, AuthManagerContext } from "../context/auth-context";

// Auth context provider
const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const authValue = useAuth();

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

// Provides React Query context and custom AuthContextProvider
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  const [authKey, setAuthKey] = useState(0);

  // resetAuth works by changing a React key, which forces React to fully re-mount the AuthContextProvider — wiping its internal state and all React Query caches inside it.
  const resetAuth = () => setAuthKey((prev) => prev + 1);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthManagerContext.Provider value={{ resetAuth }}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </AuthManagerContext.Provider>
    </QueryClientProvider>
  );
};
