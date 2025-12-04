import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { JournalEntryFiltersString } from "./journal-entry-filters-string";

export const JournalEntryFormEdit = ({
  entry,
  onSave,
  onCancel,
}: {
  entry?: { content: string; date: string };
  onSave: (content: string, date: string) => void;
  onCancel?: () => void;
}) => {
  const [content, setContent] = useState(entry?.content || "");
  const [date, setDate] = useState(
    entry?.date || new Date().toISOString().split("T")[0]
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (entry) {
      setContent(entry.content);
      setDate(entry.date);
    }
  }, [entry]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (content.trim().length === 0) {
      setError("Content is required");
      return;
    }
    if (date.trim().length === 0) {
      setError("Date is required");
      return;
    }
    setIsSubmitting(true);
    Promise.resolve(onSave(content.trim(), date)).finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        placeholder="Write your thoughts..."
        className="text-xs sm:text-base"
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

      <JournalEntryFiltersString
        text="Date"
        date={date}
        onDateChange={(val: string) => setDate(val)}
      />

      <div className="flex gap-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Update"}
        </Button>
        <Button type="button" variant="outline" onClick={() => onCancel?.()}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
