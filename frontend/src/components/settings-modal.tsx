import { useState } from "react";
import { SettingsList } from "./settings-list";
import { Settings as SettingsIcon } from "lucide-react";

export const Settings = () => {
  const [selected, setSelected] = useState<boolean>(false);

  return (
    <>
      <button
        className="bg-stone-50 text-black border border-gray-200 p-2 rounded-xl flex items-center justify-center cursor-pointer"
        onClick={() => setSelected(true)}
      >
        <SettingsIcon className="w-5 h-5" />
      </button>

      {selected && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          onClick={() => setSelected(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-96 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Settings</h2>
            <SettingsList />
          </div>
        </div>
      )}
    </>
  );
};
