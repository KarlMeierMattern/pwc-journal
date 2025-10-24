import { useState } from "react";

export const Dropdown = () => {
  const [selected, setSelected] = useState<string>("Option 1");

  const options = [
    "Associate",
    "Senior Associate",
    "Manager",
    "Director",
    "Partner",
  ];

  return (
    <div className="max-w-xs">
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
