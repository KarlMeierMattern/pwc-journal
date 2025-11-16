import { format, eachDayOfInterval, subDays, isSameDay } from "date-fns";
import type { JournalEntry } from "@/types/journal.types";

export const GitHubChart = ({ data }: { data: JournalEntry[] }) => {
  // last 30 days
  const today = new Date();
  const last30Days = eachDayOfInterval({
    start: subDays(today, 29),
    end: today,
  });

  const hasEntry = (date: Date) =>
    data?.some((entry) => isSameDay(new Date(entry.date), date));

  return (
    <div className="grid grid-cols-10 gap-0 w-fit text-right">
      {last30Days.map((day) => (
        <div
          key={day.toISOString()}
          className={`w-3 h-3 rounded m-0.5 ${
            hasEntry(day)
              ? "bg-orange-400 hover:bg-green-300 transition-colors duration-200 shadow-orange-400 shadow-md"
              : "bg-stone-400 hover:bg-stone-200 transition-colors duration-200 shadow-stone-400 shadow-md"
          }`}
          title={format(day, "yyyy-MM-dd")}
        />
      ))}
    </div>
  );
};
