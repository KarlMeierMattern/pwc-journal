import { useState } from "react";
import {
  useJournalEntries,
  useUpdateEntry,
  useDeleteEntry,
} from "@/hooks/use-journal";
import { JournalEntryCard } from "./journal-entry-card";
import { JournalEntryForm } from "./journal-entry-form";
import type { JournalEntry } from "@/types/journal.types";

export const JournalEntryList = () => {
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);

  const { data: entries, isLoading, error } = useJournalEntries();
  const updateMutation = useUpdateEntry();
  const deleteMutation = useDeleteEntry();

  const handleEdit = (id: number) => {
    const entry = entries?.find((e) => e.id === id);
    if (entry) {
      setEditingEntry(entry);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this entry?")) {
      deleteMutation.mutate({ id: id.toString() });
    }
  };

  const handleSave = (content: string) => {
    if (editingEntry) {
      updateMutation.mutate(
        { id: editingEntry.id.toString(), content },
        {
          onSuccess: () => setEditingEntry(null),
        }
      );
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading entries...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Failed to load entries
      </div>
    );
  }

  if (!entries || entries.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No journal entries yet. Start writing!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {entries.map((entry) => (
        <div key={entry.id}>
          {editingEntry?.id === entry.id ? (
            <JournalEntryForm
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
