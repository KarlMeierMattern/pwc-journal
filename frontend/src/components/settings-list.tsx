import { Dropdown } from "./manager-dropdown";

export const SettingsList = () => {
  return (
    <ul className="space-y-4">
      <li className="flex justify-between w-full text-sm">
        <span>Grade level</span>
        <Dropdown />
      </li>
    </ul>
  );
};
