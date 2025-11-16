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
import { SettingsOverlay } from "@/components/settings-overlay";
import { useState } from "react";
import { GitHubChart } from "@/components/github-chart";
import { useLastMonthEntries } from "@/hooks/use-journal";

export const Dashboard = () => {
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [llmResponse, setLlmResponse] = useState<JournalSummary>();
  const [isLoading, setIsLoading] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, authLoading } = useAuthContext();
  const logout = useLogout();
  const { resetAuth } = useAuthManager();
  const createMutation = useCreateEntry();
  const agentMutation = useAgent();
  const { data } = useLastMonthEntries();

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
      <div className="p-8 bg-stone-50/30 w-full max-w-2xl h-fit rounded-xl shadow-md backdrop-blur-3xl">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-4xl font-semibold text-gray-800 tracking-tight mb-2">
              Journal
            </h1>
            <p className="text-gray-600 text-xs">Logged in as {user?.email}</p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              className="text-xs text-stone-600 font-normal px-4 py-2 bg-stone-100/80 shadow-stone-400 shadow-md hover:bg-stone-200 rounded-md transition-colors duration-200 cursor-pointer"
              onClick={() => navigate("/all-entries")}
            >
              Entries
            </Button>
            <Settings onOpen={() => setSettingsOpen(true)} />
            <Button
              disabled={logout.isPending}
              onClick={handleLogout}
              className="text-xs px-4 py-2 text-white font-normal bg-orange-400 shadow-stone-400 shadow-md hover:bg-orange-300 rounded-md transition-colors duration-200 cursor-pointer"
            >
              {logout.isPending ? "Logging out..." : "Logout"}
            </Button>
          </div>
        </div>
        <div className="bg-stone-50 rounded-xl shadow-sm p-6 mb-6 w-full">
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
          <Button
            className="text-xs text-stone-600 font-normal bg-stone-50/80 shadow-stone-400 shadow-md hover:bg-stone-200 rounded-md transition-colors duration-200 cursor-pointer"
            variant="outline"
            onClick={() => {
              setFromDate(undefined);
              setToDate(undefined);
            }}
          >
            Clear filters
          </Button>
        </div>
        <Button
          className={`w-full max-4-2xl mb-4 text-stone-100 font-normal px-4 py-2 bg-stone-600/80 border-none shadow-stone-400 shadow-md hover:bg-stone-400 rounded-md transition-colors duration-300 cursor-pointer ${
            isLoading ? "animate-pulse" : ""
          }`}
          disabled={isLoading}
          onClick={() => handleResponse()}
        >
          {isLoading ? "Getting summary..." : "Get summary"}
        </Button>

        <div className="bg-stone-100 rounded-xl shadow-sm p-6 mb-6">
          <LLMResponse response={llmResponse} isLoading={isLoading} />
        </div>
        <div className="flex justify-center">
          <GitHubChart data={data ?? []} />
        </div>
      </div>

      {settingsOpen && (
        <SettingsOverlay onClose={() => setSettingsOpen(false)} />
      )}
    </div>
  );
};
