import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
import type { JournalEntry } from "@/types/journal.types";

const journalSchema = z.object({
  content: z.string().min(1, "Content is required").trim(),
});

type JournalFormData = z.infer<typeof journalSchema>;

export const JournalEntryForm = ({
  entry,
  onSave,
  onCancel,
}: {
  entry?: JournalEntry;
  onSave: (content: string) => void;
  onCancel?: () => void;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<JournalFormData>({
    resolver: zodResolver(journalSchema),
    defaultValues: {
      content: entry?.content || "",
    },
  });

  const onSubmit = async (data: JournalFormData) => {
    onSave(data.content);
  };

  const handleCancel = () => {
    if (!entry) {
      reset(); // Reset form in create mode
    } else {
      onCancel?.(); // Call parent onCancel in edit mode
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <Textarea
          id="content"
          {...register("content")}
          placeholder="Write your thoughts..."
          rows={8}
        />
        {errors.content && (
          <p className="text-sm text-red-500 mt-1">{errors.content.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : entry ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
};
