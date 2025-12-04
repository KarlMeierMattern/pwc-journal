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
    <div className="min-h-screen flex justify-center p-4 sm:p-8 font-geist bg-gradient-to-br from-stone-100 via-stone-300 to-orange-400">
      <div className="p-4 sm:p-8 w-full max-w-2xl h-fit bg-stone-50/30 rounded-xl shadow-md border-1 border-white backdrop-blur-3xl">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 tracking-tight">
              Journal Entries
            </h1>
            <Button
              className="text-xs text-stone-600 font-normal px-3 sm:px-4 py-2 bg-stone-100/80 shadow-stone-400 shadow-md hover:bg-stone-200 rounded-md transition-colors duration-200 cursor-pointer whitespace-nowrap flex-shrink-0"
              onClick={() => navigate("/dashboard")}
            >
              Back to Dashboard
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center mb-6 sm:justify-between gap-2">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="flex-1 [&_button]:w-full">
                <JournalEntryFilters
                  text="From"
                  date={fromDate}
                  onDateChange={setFromDate}
                />
              </div>
              <div className="flex-1 [&_button]:w-full">
                <JournalEntryFilters
                  text="To"
                  date={toDate}
                  onDateChange={setToDate}
                />
              </div>
              <div className="flex-1">
                <Button
                  className="w-full text-xs text-stone-600 font-normal px-3 sm:px-4 py-2 bg-stone-100/80 shadow-stone-400 shadow-md hover:bg-stone-200 rounded-md transition-colors duration-200 cursor-pointer whitespace-nowrap"
                  variant="outline"
                  onClick={() => {
                    setFromDate(undefined);
                    setToDate(undefined);
                  }}
                >
                  Clear filters
                </Button>
              </div>
            </div>
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
                    endDate.setDate(endDate.getDate());
                    return endDate.toISOString();
                  })()
                : undefined,
            }}
          />
        </div>
      </div>
    </div>
  );
};
