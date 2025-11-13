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
    <div className="flex flex-col gap-y-4 p-4 border rounded-lg shadow-sm bg-stone-100 font-geist text-sm">
      <div className="whitespace-pre-wrap">{entry.content}</div>
      <div className="text-sm text-gray-500">
        {new Date(entry.date).toLocaleDateString()}
      </div>

      <div className="flex justify-end gap-2">
        <Button
          onClick={() => onEdit(entry.id)}
          className="text-xs text-stone-600 font-normal px-4 py-2 bg-stone-200/80 shadow-stone-400 shadow-md hover:bg-stone-300 rounded-md transition-colors duration-200 cursor-pointer"
        >
          Edit
        </Button>
        <Button
          variant="destructive"
          onClick={() => onDelete(entry.id)}
          className="text-xs px-4 py-2 text-white font-normal bg-orange-400 shadow-stone-400 shadow-md hover:bg-orange-300 rounded-md transition-colors duration-200 cursor-pointer"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
