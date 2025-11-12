"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

// import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const JournalEntryFilters = ({
  text,
  date,
  onDateChange,
}: {
  text: string;
  date?: Date;
  onDateChange: (date: Date | undefined) => void;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="justify-start text-left text-stone-600 font-normal bg-stone-100/80 shadow-stone-400 shadow-md hover:bg-stone-200 rounded-md transition-colors duration-200 cursor-pointer"
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>{text}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={onDateChange} />
      </PopoverContent>
    </Popover>
  );
};
