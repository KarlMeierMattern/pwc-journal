export type JournalEntry = {
  id: number;
  userId: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export type JournalEntryResponse = {
  message: string;
  entry: JournalEntry;
};
