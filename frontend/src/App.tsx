import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Signup } from "./pages/signup";
import { Login } from "./pages/login";
import { Dashboard } from "./pages/dashboard";
import { ProtectedRoute } from "@/components/protected-route";
import { AuthGuard } from "@/components/auth-guard";
import { Navigate } from "react-router-dom";
import { AllEntries } from "./pages/all-entries";

const App = () => {
  return (
    <AuthGuard>
      <Routes>
        <Route path="/" element={<Home />} />
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
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/all-entries" element={<AllEntries />} />
      </Routes>
    </AuthGuard>
  );
};

export default App;
