import type { JournalSummary } from "@/types/journalsummary.types";

const API_BASE_URL =
  import.meta.env.VITE_ENV === "development"
    ? import.meta.env.VITE_BACKEND_DEV_URL
    : import.meta.env.VITE_BACKEND_PROD_URL;

export const getJournalSummary = async (params?: {
  from?: string;
  to?: string;
  customPrompt?: string;
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
      body: JSON.stringify({
        customPrompt: params?.customPrompt,
      }),
    },
  );
  if (!response.ok) {
    throw new Error("Failed to get journal summary");
  }
  return response.json();
};
