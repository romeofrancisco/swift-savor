import React from "react";
import { Switch } from "./ui/switch";
import { useTheme } from "@/context/ThemeProvider";

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <div className="flex items-center space-x-2 ms-auto">
      <Switch
        id="dark-mode"
        checked={theme === "dark"}
        onCheckedChange={handleTheme}
      />
    </div>
  );
};

export default ThemeToggle;
