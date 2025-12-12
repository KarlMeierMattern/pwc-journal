import { useState } from "react";
import {
  useJournalEntries,
  useUpdateEntry,
  useDeleteEntry,
} from "@/hooks/use-journal";
import { JournalEntryCard } from "./journal-entry-card";
import { JournalEntryFormEdit } from "./journal-entry-form-edit";
import type { JournalEntry } from "@/types/journal.types";

export const JournalEntryList = ({
  filters,
}: {
  filters?: { from?: string; to?: string };
} = {}) => {
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);

  const { data: entries, isLoading, error } = useJournalEntries(filters);
  const updateMutation = useUpdateEntry();
  const deleteMutation = useDeleteEntry();

  const handleEdit = (id: number) => {
    const entry = entries?.find((e) => e.id === id);
    if (entry) {
      setEditingEntry(entry);
    }
  };

  const handleDelete = async (id: number) => {
    deleteMutation.mutate({ id: id.toString() });
  };

  // Updated handleSave to include date
  const handleSave = async (content: string, date: string) => {
    if (!editingEntry) {
      throw new Error("No entry being edited");
    }
    await updateMutation.mutateAsync({
      id: editingEntry.id.toString(),
      content,
      date,
    });
    setEditingEntry(null);
  };

  if (isLoading) {
    return (
      <div className="text-center py-8 text-xs sm:text-base">
        Loading entries...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500 text-xs sm:text-base">
        Failed to load entries
      </div>
    );
  }

  if (!entries || entries.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 text-xs sm:text-base">
        No journal entries yet. Start writing!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {entries.map((entry) => (
        <div key={entry.id}>
          {editingEntry?.id === entry.id ? (
            <JournalEntryFormEdit
              entry={editingEntry}
              onSave={handleSave}
              onCancel={() => setEditingEntry(null)}
            />
          ) : (
            <JournalEntryCard
              entry={entry}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      ))}
    </div>
  );
};
