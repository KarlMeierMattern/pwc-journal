// import { Label } from "@/components/ui/label";
// import type { JournalEntry } from "@/types/journal.types";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { JournalEntryFilters } from "./journal-entry-filters";

const journalSchema = z.object({
  content: z.string().min(1, "Content is required").trim(),
  date: z.string().min(1, "Date is required"),
});

type JournalFormData = z.infer<typeof journalSchema>;

function parseLocalDate(dateString: string | undefined): Date | undefined {
  if (!dateString) return undefined;
  const [year, month, day] = dateString.split("-");
  if (!year || !month || !day) return undefined;
  return new Date(Number(year), Number(month) - 1, Number(day));
}

export const JournalEntryForm = ({
  entry,
  onSave,
  onCancel,
}: {
  entry?: JournalFormData;
  onSave: (content: string, date: string) => void;
  onCancel?: () => void;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<JournalFormData>({
    resolver: zodResolver(journalSchema),
    defaultValues: {
      content: entry?.content || "",
      date:
        entry?.date ||
        `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${new Date()
          .getDate()
          .toString()
          .padStart(2, "0")}`,
    },
  });

  const watchedDate = watch("date");

  const dateObj = parseLocalDate(watchedDate);

  const onSubmit = async (data: JournalFormData) => {
    onSave(data.content, data.date);
    if (!entry) {
      reset();
    }
  };

  const handleCancel = () => {
    if (!entry) {
      reset(); // Reset form in create mode
    } else {
      onCancel?.(); // Call parent onCancel in edit mode
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 ">
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
        <JournalEntryFilters
          text="Date"
          date={dateObj}
          onDateChange={(date: Date | undefined) =>
            setValue(
              "date",
              date
                ? `${date.getFullYear()}-${(date.getMonth() + 1)
                    .toString()
                    .padStart(2, "0")}-${date
                    .getDate()
                    .toString()
                    .padStart(2, "0")}`
                : "",
              { shouldValidate: true }
            )
          }
        />
        <Button
          className="text-stone-600 font-normal px-4 py-2 bg-stone-100/80 shadow-stone-400 shadow-md hover:bg-stone-200 rounded-md transition-colors duration-200 cursor-pointer"
          type="button"
          variant="outline"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          className="text-stone-100 font-normal px-4 py-2 bg-stone-600/80 shadow-stone-400 shadow-md hover:bg-stone-400 rounded-md transition-colors duration-200 cursor-pointer"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : entry ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
};
