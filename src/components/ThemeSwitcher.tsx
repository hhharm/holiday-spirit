import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const themes = [
  { code: "light", name: "Light", icon: "☀️" },
  { code: "dark", name: "Dark", icon: "🌙" },
  { code: "christmas", name: "Christmas", icon: "🎄" },
];

function ThemeSwitcher() {
  const { t } = useTranslation();
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <div className="theme-switcher">
      <label>{t("theme")}</label>
      <select
        value={theme}
        onChange={(e) => handleThemeChange(e.target.value)}
        className="theme-select"
      >
        {themes.map((themeOption) => (
          <option key={themeOption.code} value={themeOption.code}>
            {themeOption.icon} {themeOption.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ThemeSwitcher;
