import { useAuthContext, useAuthManager } from "../context/auth-context";
import { useLogout } from "../hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { JournalEntryForm } from "@/components/journal-entry-form";
import { useCreateEntry } from "@/hooks/use-journal";
import { Button } from "@/components/ui/button";
import { LLMResponse } from "@/components/llm-response";
import { useAgent, type JournalSummary } from "@/hooks/use-agent";
import { JournalEntryFilters } from "@/components/journal-entry-filters";
import { Settings } from "@/components/settings-modal";
import { useState } from "react";

export const Dashboard = () => {
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [llmResponse, setLlmResponse] = useState<JournalSummary>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user, authLoading } = useAuthContext();
  const logout = useLogout();
  const { resetAuth } = useAuthManager();
  const createMutation = useCreateEntry();
  const agentMutation = useAgent();

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        resetAuth();
        navigate("/login", { replace: true });
      },
    });
  };

  const handleCreateEntry = (content: string, date: string) => {
    createMutation.mutate({ content, date });
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
    <div className="min-h-screen flex justify-center p-8 font-geist bg-gradient-to-br from-stone-100 via-stone-300 to-orange-400">
      <div className="p-8 bg-stone-50/30 w-full max-w-4xl rounded-xl shadow-md border-1 border-white backdrop-blur-3xl">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="mb-4">
              <h1 className="text-4xl font-semibold text-gray-800 tracking-tight mb-2">
                Journal
              </h1>
              <p className="text-gray-600 text-xs">
                Logged in as {user?.email}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                className="text-stone-600 font-normal px-4 py-2 bg-stone-100/80 shadow-stone-400 shadow-md hover:bg-stone-200 rounded-md transition-colors duration-200 cursor-pointer"
                onClick={() => navigate("/all-entries")}
              >
                Entries
              </Button>
              <Settings />
            </div>
          </div>
          <div className="bg-stone-50 rounded-xl shadow-sm p-6 mb-6 ">
            <JournalEntryForm onSave={handleCreateEntry} />
          </div>

          <div className="flex items-center mb-6 justify-between">
            <div className="flex gap-2">
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
            <div className="flex gap-2">
              <Button
                className="text-stone-600 font-normal mx-2 bg-stone-50/80 shadow-stone-400 shadow-md hover:bg-stone-200 rounded-md transition-colors duration-200 cursor-pointer"
                variant="outline"
                onClick={() => {
                  setFromDate(undefined);
                  setToDate(undefined);
                }}
              >
                Clear filters
              </Button>
              <Button
                className="text-stone-600 font-normal mx-2 bg-stone-50/80 shadow-stone-400 shadow-md hover:bg-stone-200 rounded-md transition-colors duration-200 cursor-pointer"
                disabled={isLoading}
                variant="outline"
                onClick={() => handleResponse()}
              >
                {isLoading ? "Getting summary..." : "Get summary"}
              </Button>
            </div>
          </div>
          <div className="bg-stone-100 rounded-xl shadow-sm p-6 mb-6">
            <LLMResponse response={llmResponse} isLoading={isLoading} />
          </div>
          <div className="flex justify-between items-center">
            <button
              disabled={logout.isPending}
              onClick={handleLogout}
              className=" px-4 py-2 text-white font-normal mx-2 bg-orange-400 shadow-stone-400 shadow-md hover:bg-orange-300 rounded-md transition-colors duration-200 cursor-pointer"
            >
              {logout.isPending ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
