import { useCurrentUser } from "@/hooks/use-auth";
import { useUpdateGrade } from "@/hooks/use-auth";

export const Dropdown = () => {
  const { data: user } = useCurrentUser();
  const updateGrade = useUpdateGrade();

  const options = [
    "Associate",
    "Senior Associate",
    "Manager Level 1",
    "Manager Level 2",
    "Manager Level 3",
    "Manager Level 4",
    "Senior Manager",
  ];

  const selected = user?.grade || "";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newGrade = e.target.value;
    updateGrade.mutate(
      { grade: newGrade },
      {
        onError: (error) => {
          console.error("Failed to update grade:", error);
        },
      }
    );
  };

  return (
    <div className="max-w-xs">
      <select
        value={selected}
        onChange={handleChange}
        disabled={updateGrade.isPending}
        className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <option value="">Select grade...</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
