import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { JournalEntry } from "@/types/journal.types";

export const JournalEntryCard = ({
  entry,
  onEdit,
  onDelete,
}: {
  entry: JournalEntry;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}) => {
  return (
    <div className="flex flex-col gap-y-4">
      <Textarea />
      <div className="flex justify-end">
        <Button onClick={() => onEdit(entry.id)}>Edit</Button>
        <Button onClick={() => onDelete(entry.id)}>Delete</Button>
      </div>
    </div>
  );
};
