import { useMutation, useQueryClient } from "@tanstack/react-query";

// Types for agent response
export type JournalSummary = {
  summary: string;
  keyThemes: string[];
  moodAnalysis: string;
  insights: string[];
  entryCount: number;
  dateRange: {
    from: string;
    to: string;
  };
};

const API_BASE_URL =
  import.meta.env.VITE_ENV === "development"
    ? import.meta.env.VITE_BACKEND_DEV_URL || "http://localhost:3000"
    : import.meta.env.VITE_BACKEND_PROD_URL ||
      "http://lkogk8wo88koc4404g0wws48.167.235.142.148.sslip.io";

export const useAgent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params?: {
      from?: string;
      to?: string;
    }): Promise<JournalSummary> => {
      const searchParams = new URLSearchParams();
      if (params?.from) searchParams.append("from", params.from);
      if (params?.to) searchParams.append("to", params.to);

      const response = await fetch(
        `${API_BASE_URL}/api/v1/agent/journal-summary?${searchParams.toString()}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to get journal summary");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journal", "entries"] });
    },
    onError: () => {
      queryClient.removeQueries({ queryKey: ["journal", "entries"] });
    },
  });
};
