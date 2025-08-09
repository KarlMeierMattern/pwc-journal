import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "../hooks/use-auth";
import { AuthContext } from "../context/auth-context";

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

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>{children}</AuthContextProvider>
    </QueryClientProvider>
  );
};
