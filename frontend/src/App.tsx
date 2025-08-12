import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Signup } from "./pages/signup";
import { Login } from "./pages/login";
import { Dashboard } from "./pages/dashboard";
import { ProtectedRoute } from "./components/auth/protected-route";
import { AuthGuard } from "./components/auth/auth-guard";
import { Navigate } from "react-router-dom";

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
      </Routes>
      //{" "}
    </AuthGuard>
  );
};

export default App;
