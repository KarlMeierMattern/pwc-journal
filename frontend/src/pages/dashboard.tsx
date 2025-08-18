import { useAuthContext } from "../context/auth-context";
import { useLogout } from "../hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { JournalEntryForm } from "@/components/journal-entry-form";
import { useCreateEntry } from "@/hooks/use-journal";
import { Button } from "@/components/ui/button";
import { LLMResponse } from "@/components/llm-response";
import { useAgent, type JournalSummary } from "@/hooks/use-agent";
import { JournalEntryFilters } from "@/components/journal-entry-filters";
import { useState } from "react";

export const Dashboard = () => {
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [isLoading, setIsLoading] = useState(false);
  const [llmResponse, setLlmResponse] = useState<JournalSummary>();
  const { user, authLoading } = useAuthContext();
  const logout = useLogout();
  const navigate = useNavigate();
  const createMutation = useCreateEntry();
  const agentMutation = useAgent();

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

  const handleResponse = async () => {
    setIsLoading(true);
    const response = await agentMutation.mutateAsync({
      from: fromDate?.toISOString(),
      to: toDate?.toISOString(),
    });
    setLlmResponse(response);
    setIsLoading(false);
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
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
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
        <div className="flex items-center mb-6 justify-between">
          <div className="flex items-center gap-2">
            <JournalEntryFilters
              text="From"
              date={fromDate}
              onDateChange={setFromDate}
            />
            <JournalEntryFilters
              text="To"
              date={toDate}
              onDateChange={setToDate}
            />
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setFromDate(undefined);
              setToDate(undefined);
            }}
            className="cursor-pointer"
          >
            Clear filters
          </Button>
          <Button
            variant="outline"
            onClick={() => handleResponse()}
            className="cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Getting summary..." : "Get summary"}
          </Button>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <LLMResponse response={llmResponse} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};
