import { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import Button from "./shared/Button";

function SettingsPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="settings-button-container">
        <Button color="secondary" size="small" onClick={handleToggle}>
          ⚙️ Settings
        </Button>
      </div>

      {isOpen && (
        <div className="settings-overlay" onClick={handleToggle}>
          <div className="settings-popup" onClick={(e) => e.stopPropagation()}>
            <div className="settings-header">
              <h3>{t("settings")}</h3>
              <Button color="tertiary" size="small" onClick={handleToggle}>
                ×
              </Button>
            </div>
            <div className="settings-content">
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SettingsPopup;
