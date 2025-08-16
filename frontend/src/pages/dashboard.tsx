import { useAuthContext } from "../context/auth-context";
import { useLogout } from "../hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { JournalEntryForm } from "@/components/journal-entry-form";
import { useCreateEntry } from "@/hooks/use-journal";
import { Button } from "@/components/ui/button";

export const Dashboard = () => {
  const { user, authLoading } = useAuthContext();
  const logout = useLogout();
  const navigate = useNavigate();
  const createMutation = useCreateEntry();

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        navigate("/login", { replace: true });
      },
    });
  };

  const handleCreateEntry = (content: string) => {
    createMutation.mutate(content);
  };

  if (authLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-stone-50 font-geist">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-semibold text-gray-800 tracking-tight mb-8">
            Journal
          </h1>
          <Button onClick={() => navigate("/all-entries")}>All entries</Button>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 ">
          <JournalEntryForm onSave={handleCreateEntry} />
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Logged in as {user?.email}</p>
            <button
              disabled={logout.isPending}
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              {logout.isPending ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
