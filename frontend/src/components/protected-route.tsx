// Auth-aware route components:
// - ProtectedRoute: guard for a route; redirect to login if not authenticated, else render children.
// - RootRedirect: for "/" only; redirect to /dashboard if authenticated, else /login.

import { useAuthContext } from "@/auth/auth";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

// For path "/": send authenticated users to /dashboard, others to /login.
export const RootRedirect = () => {
  const { isAuthenticated, authLoading } = useAuthContext();

  if (authLoading) {
    return <div>Loading...</div>;
  }

  return <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, authLoading } = useAuthContext();

  if (authLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
