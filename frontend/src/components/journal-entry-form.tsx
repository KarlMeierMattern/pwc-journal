import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { JournalEntryFiltersString } from "./journal-entry-filters-string";

const journalSchema = z.object({
  content: z.string().min(1, "Content is required").trim(),
  date: z.string().min(1, "Date is required"),
});

type JournalFormData = z.infer<typeof journalSchema>;

export const JournalEntryForm = ({
  onSave,
}: {
  onSave: (content: string, date: string) => void;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<JournalFormData>({
    resolver: zodResolver(journalSchema),
    defaultValues: {
      content: "",
      date: new Date().toISOString().split("T")[0],
    },
  });

  const watchedDate = watch("date");

  const onSubmit = (data: JournalFormData) => {
    onSave(data.content, data.date);
    reset({
      content: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 w-full max-w-2xl">
        <Textarea
          {...register("content")}
          placeholder="e.g., Worked on Project X today. Completed the initial design phase and had a productive meeting with the team. Feeling accomplished but also a bit tired from the long hours. Thinking about how to improve the workflow for next week."
          rows={5}
          className="w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-stone-500 text-sm text-stone-700 bg-white resize-y placeholder:text-stone-400 [field-sizing:fixed] min-h-[120px]"
        />
        {errors.content && (
          <p className="text-sm text-red-500 mt-1">{errors.content.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-4 w-full max-w-2xl">
        <JournalEntryFiltersString
          text="Date"
          date={watchedDate}
          onDateChange={(val) =>
            setValue("date", val || "", { shouldValidate: true })
          }
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="text-stone-100 font-normal px-4 py-2 bg-stone-600/80 shadow-stone-400 shadow-md hover:bg-stone-400 rounded-md transition-colors duration-200 cursor-pointer"
        >
          {isSubmitting ? "Saving..." : "Create"}
        </Button>
      </div>
    </form>
  );
};
