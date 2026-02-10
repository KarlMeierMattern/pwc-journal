import { Routes, Route } from "react-router-dom";
import { Signup } from "./pages/signup";
import { Login } from "./pages/login";
import { Dashboard } from "./pages/dashboard";
import { ProtectedRoute, RootRedirect } from "@/components/protected-route";
import { AuthGuard } from "@/components/auth-guard";
import { AllEntries } from "./pages/all-entries";

const App = () => {
  return (
    <AuthGuard>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        <Route path="/all-entries" element={<AllEntries />} />
      </Routes>
    </AuthGuard>
  );
};

export default App;
