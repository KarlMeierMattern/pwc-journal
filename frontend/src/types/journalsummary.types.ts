export type JournalSummary = {
  summary: string;
  keyThemes: string[];
  insights: string[];
  framework: {
    inspire: string;
    empower: string;
    evolve: string;
    champion: string;
    build: string;
    deliver: string;
  };
  entryCount: number;
  dateRange: {
    from: string;
    to: string;
  };
};
