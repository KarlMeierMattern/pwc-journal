"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useMemo } from "react";

export const JournalEntryFiltersString = ({
  text,
  date,
  onDateChange,
}: {
  text: string;
  date: string;
  onDateChange: (date: string) => void;
}) => {
  const dateObj = useMemo(() => (date ? new Date(date) : undefined), [date]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!dateObj}
          className="text-xs justify-start text-left text-stone-600 font-normal bg-stone-100/80 shadow-stone-400 shadow-md hover:bg-stone-200 rounded-md transition-colors duration-200 cursor-pointer"
        >
          <CalendarIcon />
          {dateObj ? format(dateObj, "PPP") : <span>{text}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={dateObj}
          onSelect={(selectedDate: Date | undefined) => {
            const formatted = selectedDate
              ? `${selectedDate.getFullYear()}-${String(
                  selectedDate.getMonth() + 1
                ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(
                  2,
                  "0"
                )}`
              : "";
            onDateChange(formatted);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
