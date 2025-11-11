import { useState } from "react";
import { SettingsList } from "./settings-list";
import { Settings as SettingsIcon } from "lucide-react";

export const Settings = () => {
  const [selected, setSelected] = useState<boolean>(false);

  return (
    <>
      <button
        className="text-stone-600 font-normal p-2 bg-stone-100/80 shadow-stone-400 shadow-md hover:bg-stone-200 rounded-md transition-colors duration-200 cursor-pointer"
        onClick={() => setSelected(true)}
      >
        <SettingsIcon className="w-5 h-5" />
      </button>

      {selected && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
          onClick={() => setSelected(false)}
        >
          <div className="p-4 bg-stone-200/30 rounded-lg border-1 border-white">
            <div
              className="bg-stone-100/95 p-6 rounded-lg shadow-lg w-80 z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg mb-4">Settings</h2>
              <SettingsList />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
