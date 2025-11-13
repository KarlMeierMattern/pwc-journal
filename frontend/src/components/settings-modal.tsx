import { Settings as SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

// Settings.tsx
export const Settings = ({ onOpen }: { onOpen: () => void }) => (
  <Button
    className="text-stone-600 font-normal p-2 bg-stone-100/80 shadow-md hover:bg-stone-200 rounded-md"
    onClick={onOpen}
  >
    <SettingsIcon className="w-4 h-4" />
  </Button>
);
