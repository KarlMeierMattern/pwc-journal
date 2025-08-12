// Route-level wrapper - Protects specific routes from unauthorized access
// Blocks unauthenticated users - Redirects to login if not authenticated
// Runs every time user visits a protected route

import { useAuthContext } from "../../context/auth-context";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
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
