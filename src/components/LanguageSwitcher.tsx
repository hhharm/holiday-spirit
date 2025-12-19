import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "uk", name: "Українська", flag: "🇺🇦" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
];

function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (languageCode: string) => {
    // Persist selection and switch language
    try {
      localStorage.setItem("i18nextLng", languageCode);
    } catch {}
    i18n.changeLanguage(languageCode);
  };

  return (
    <div className="language-switcher">
      <label>{t("languageSelector")}</label>
      <select
        value={i18n.resolvedLanguage || i18n.language?.split("-")[0]}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="language-select"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSwitcher;
