import type { JournalEntry } from "@/types/journal.types";
import { Button } from "@/components/ui/button";

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
    <div className="flex flex-col gap-y-4 p-4 border rounded-lg shadow-sm bg-stone-50 font-geist">
      <div className="whitespace-pre-wrap">{entry.content}</div>
      <div className="text-sm text-gray-500">
        {new Date(entry.date).toLocaleDateString()}
      </div>

      <div className="flex justify-end gap-2">
        <Button onClick={() => onEdit(entry.id)}>Edit</Button>
        <Button variant="destructive" onClick={() => onDelete(entry.id)}>
          Delete
        </Button>
      </div>
    </div>
  );
};
