// Auth context + provider in one module.
// Flow: AuthProvider → useAuth() → AuthContext.Provider; consumers use useAuthContext() / useAuthManager().
/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "../hooks/use-auth";

// --- Context ---
type AuthContextType = ReturnType<typeof useAuth>;

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export const AuthManagerContext = createContext<{
  resetAuth: () => void;
} | null>(null);

export const useAuthManager = () => {
  const ctx = useContext(AuthManagerContext);
  if (!ctx) throw new Error("useAuthManager must be used within AuthProvider");
  return ctx;
};

// --- Provider ---
const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const authValue = useAuth();
  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  const [authKey, setAuthKey] = useState(0);
  const resetAuth = () => setAuthKey((prev) => prev + 1);

  return (
    <QueryClientProvider client={queryClient} key={authKey}>
      <AuthManagerContext.Provider value={{ resetAuth }}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </AuthManagerContext.Provider>
    </QueryClientProvider>
  );
};
