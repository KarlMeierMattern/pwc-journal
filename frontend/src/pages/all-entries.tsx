import { useState } from "react";
import { JournalEntryList } from "@/components/journal-entry-list";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { JournalEntryFilters } from "@/components/journal-entry-filters";

export const AllEntries = () => {
  const navigate = useNavigate();
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  return (
    <div className="min-h-screen p-8 bg-stone-50 font-geist">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-semibold text-gray-800 tracking-tight mb-8">
            All Journal Entries
          </h1>
          <Button onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
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
          >
            Clear filters
          </Button>
        </div>
        <JournalEntryList
          filters={{
            from: fromDate
              ? (() => {
                  const startDate = new Date(fromDate);
                  return startDate.toISOString();
                })()
              : undefined,
            to: toDate
              ? (() => {
                  const endDate = new Date(toDate);
                  endDate.setDate(endDate.getDate() + 1);
                  return endDate.toISOString();
                })()
              : undefined,
          }}
        />
      </div>
    </div>
  );
};
