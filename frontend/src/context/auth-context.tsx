import { createContext, useContext } from "react";
import { useAuth } from "../hooks/use-auth";

// Auth context type
type AuthContextType = ReturnType<typeof useAuth>;

// Create context with undefined default (will be provided by AuthProvider)
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Custom hook to use auth context
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
