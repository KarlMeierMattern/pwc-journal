import { Dropdown } from "./manager-dropdown";

export const SettingsList = () => {
  return (
    <ul className="space-y-4">
      <li className="flex justify-between w-full text-sm">
        <span>Manager level</span>
        <Dropdown />
      </li>

      <li className="flex justify-between w-full text-sm">
        <span>Manager level</span>
        <span>Manager level</span>
      </li>

      <li className="flex justify-between w-full text-sm">
        <span>Manager level</span>
        <span>Manager level</span>
      </li>
    </ul>
  );
};
