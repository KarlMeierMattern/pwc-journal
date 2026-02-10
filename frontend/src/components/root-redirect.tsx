// Root route: redirect to /dashboard if authenticated, else /login.
// Waits for auth check to complete (same Loading as AuthGuard) before redirecting.

import { useAuthContext } from "@/context/auth-context";
import { Navigate } from "react-router-dom";

export const RootRedirect = () => {
  const { isAuthenticated, authLoading } = useAuthContext();

  if (authLoading) {
    return <div>Loading...</div>;
  }

  return <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />;
};
