import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  JournalEntry,
  JournalEntryResponse,
} from "../types/journal.types";

const API_BASE_URL =
  import.meta.env.VITE_ENV === "development"
    ? import.meta.env.VITE_BACKEND_DEV_URL
    : import.meta.env.VITE_BACKEND_PROD_URL;

export const useCreateEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      content,
      date,
    }: {
      content: string;
      date: string;
    }) => {
      const response = await fetch(`${API_BASE_URL}/api/v1/journal`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, date }),
      });
      if (!response.ok) {
        throw new Error("Failed to create journal entry");
      }
      return response.json();
    },
    // Invalidate and refetch journal entries instead of trying to access non-existent data
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journal", "entries"] });
    },
    onError: () => {
      queryClient.removeQueries({ queryKey: ["journal", "entries"] });
    },
  });
};

export const useJournalEntries = (params?: {
  from?: string;
  to?: string;
  limit?: number;
  page?: number;
}) => {
  return useQuery<JournalEntry[]>({
    queryKey: ["journal", "entries", params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params?.from) searchParams.append("from", params.from);
      if (params?.to) searchParams.append("to", params.to);
      if (params?.limit) searchParams.append("limit", params.limit.toString());
      if (params?.page) searchParams.append("page", params.page.toString());

      const response = await fetch(
        `${API_BASE_URL}/api/v1/journal?${searchParams.toString()}`,
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch journal entries");
      }
      const data = await response.json();

      // Validate that we got an array of entries
      if (!Array.isArray(data)) {
        throw new Error("Invalid response format");
      }

      return data;
    },
    // Keep data fresh for 2 minutes
    staleTime: 2 * 60 * 1000,
    // Keep in cache for 10 minutes after component unmounts
    gcTime: 10 * 60 * 1000,
  });
};

export const useJournalEntry = (id?: string) => {
  return useQuery<JournalEntry>({
    queryKey: ["journal", "entry", id],
    queryFn: async () => {
      if (!id) throw new Error("Journal entry ID is required");

      const response = await fetch(`${API_BASE_URL}/api/v1/journal/${id}`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch journal entry");
      }
      return response.json();
    },
    enabled: !!id,
  });
};

export const useUpdateEntry = () => {
  const queryClient = useQueryClient();

  return useMutation<
    JournalEntryResponse,
    Error,
    { id: string; content: string }
  >({
    mutationFn: async ({ id, content }: { id: string; content: string }) => {
      if (!id || !content) throw new Error("Missing required parameters");

      const response = await fetch(`${API_BASE_URL}/api/v1/journal/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });
      if (!response.ok) {
        throw new Error("Failed to update journal entry");
      }
      return response.json();
    },
    onSuccess: (response: JournalEntryResponse) => {
      queryClient.setQueryData(
        ["journal", "entry", response.entry.id],
        response.entry
      );
      queryClient.invalidateQueries({ queryKey: ["journal", "entries"] });
    },
    onError: () => {
      queryClient.removeQueries({ queryKey: ["journal", "entry"] });
    },
  });
};

export const useDeleteEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const response = await fetch(`${API_BASE_URL}/api/v1/journal/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to delete journal entry");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journal", "entries"] });
      queryClient.removeQueries({ queryKey: ["journal", "entry"] });
    },
    onError: () => {
      queryClient.removeQueries({ queryKey: ["journal", "entries"] });
    },
  });
};
