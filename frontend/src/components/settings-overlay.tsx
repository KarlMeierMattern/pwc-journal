import { SettingsList } from "./settings-list";

export const SettingsOverlay = ({ onClose }: { onClose: () => void }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <div className="absolute -inset-2 border-1 border-stone-400 rounded-lg bg-stone-50/10" />
        <div className="relative bg-white/90 p-6 rounded-lg shadow-lg w-80">
          <h2 className="text-lg mb-4">Settings</h2>
          <SettingsList />
        </div>
      </div>
    </div>
  );
};
