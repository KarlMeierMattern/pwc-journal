// App-level wrapper - Handles loading states during auth initialization
// Doesn't block routes - Just shows loading spinner while checking auth
// Runs once when app starts

import { useAuthContext } from "@/context/auth-context";

type AuthGuardProps = {
  children: React.ReactNode;
};

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { authLoading } = useAuthContext();

  if (authLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};
