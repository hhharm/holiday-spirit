import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../shared/Button";
import { predefinedSets } from "../../data/predefinedSets";
import "./QuestionsInput.css";

interface QuestionsInputProps {
  onSave: () => void;
}

function QuestionsInput({ onSave }: QuestionsInputProps) {
  const [questions, setQuestions] = useState("");
  const [selectedSetId, setSelectedSetId] = useState("");
  const { t, i18n } = useTranslation();

  const handleLoadSet = () => {
    const selectedSet = predefinedSets.find((set) => set.id === selectedSetId);
    if (selectedSet) {
      const lang = i18n.language as "en" | "uk" | "ru";
      const questionsArray =
        selectedSet.questions[lang] || selectedSet.questions.en;
      setQuestions(questionsArray.join("\n"));
    }
  };

  const handleProceed = () => {
    if (questions.trim()) {
      // Split by newlines and filter empty lines
      const questionArray = questions
        .split("\n")
        .map((q) => q.trim())
        .filter((q) => q.length > 0);

      localStorage.setItem("saved_questions", JSON.stringify(questionArray));
      localStorage.setItem("opened_questions", JSON.stringify([]));

      console.log("Questions saved:", questionArray);
      onSave();
    }
  };

  return (
    <div className="app">
      <h1>{t("enterQuestions")}</h1>

      <textarea
        className="questions-textarea"
        value={questions}
        onChange={(e) => setQuestions(e.target.value)}
        placeholder={t("questionsPlaceholder")}
        rows={10}
      />

      <div className="separator">{t("orEnterCustom")}</div>

      <div className="predefined-sets">
        <div className="set-selector">
          <select
            value={selectedSetId}
            onChange={(e) => setSelectedSetId(e.target.value)}
            className="set-select"
          >
            <option value="">{t("selectSet")}</option>
            {predefinedSets.map((set) => (
              <option key={set.id} value={set.id}>
                {t(set.nameKey)}
              </option>
            ))}
          </select>
          <Button
            color="secondary"
            size="small"
            onClick={handleLoadSet}
            disabled={!selectedSetId}
          >
            {t("loadSet")}
          </Button>
        </div>
      </div>

      <Button
        color="primary"
        className="proceed-button"
        onClick={handleProceed}
      >
        {t("proceed")}
      </Button>
    </div>
  );
}

export default QuestionsInput;
