import { useState } from "react";
import { useTranslation } from "react-i18next";

interface QuestionsInputProps {
  onSave: () => void;
}

function QuestionsInput({ onSave }: QuestionsInputProps) {
  const [questions, setQuestions] = useState("");
  const { t } = useTranslation();

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
      <button className="proceed-button" onClick={handleProceed}>
        {t("proceed")}
      </button>
    </div>
  );
}

export default QuestionsInput;
