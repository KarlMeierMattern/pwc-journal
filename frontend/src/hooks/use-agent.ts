import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getJournalSummary } from "@/service/agent-service";

export const useAgent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: getJournalSummary,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journal", "entries"] });
    },
    onError: () => {
      queryClient.removeQueries({ queryKey: ["journal", "entries"] });
    },
  });
};
