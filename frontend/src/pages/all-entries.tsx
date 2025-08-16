import { JournalEntryList } from "@/components/journal-entry-list";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const AllEntries = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            All Journal Entries
          </h1>
          <Button onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
        <JournalEntryList />
      </div>
    </div>
  );
};
