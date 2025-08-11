import { useAuthContext } from "../context/auth-context";
import { useLogout } from "../hooks/use-auth";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const { user } = useAuthContext();
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout.mutate();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Welcome back, {user?.email}!
        </h1>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Your Journal Dashboard
          </h2>
          <p className="text-gray-600">
            This is your protected dashboard. Only authenticated users can see
            this content.
          </p>
          <button
            disabled={logout.isPending}
            onClick={handleLogout}
            className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            {logout.isPending ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
};
