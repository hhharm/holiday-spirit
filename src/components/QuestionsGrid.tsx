import { useState } from "react";
import { useTranslation } from "react-i18next";

interface QuestionsGridProps {
  savedQuestions: string[];
  openedQuestions: number[];
  onReset: () => void;
  onRestart: () => void;
  onMarkAsOpened: (index: number) => void;
}

function QuestionsGrid({
  savedQuestions,
  openedQuestions,
  onReset,
  onRestart,
  onMarkAsOpened,
}: QuestionsGridProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const { t } = useTranslation();

  const handleCardClick = (index: number) => {
    if (!openedQuestions.includes(index)) {
      setSelectedQuestion(index);
    }
  };

  const handleClose = () => {
    setSelectedQuestion(null);
  };

  const handleDone = () => {
    if (selectedQuestion !== null) {
      onMarkAsOpened(selectedQuestion);
      setSelectedQuestion(null);
    }
  };

  return (
    <div className="questions-grid-container">
      <div className="questions-grid">
        {savedQuestions.map((_, index) => (
          <div
            key={index}
            className={`question-card ${
              openedQuestions.includes(index) ? "opened" : ""
            }`}
            onClick={() => handleCardClick(index)}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <div className="control-buttons">
        <button className="small-button" onClick={onRestart}>
          {t("restartCards")}
        </button>
        <button className="small-button" onClick={onReset}>
          {t("resetQuestions")}
        </button>
      </div>

      {selectedQuestion !== null && (
        <div className="popup-overlay" onClick={handleClose}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>
              {t("question")} {selectedQuestion + 1}
            </h2>
            <p className="question-text">{savedQuestions[selectedQuestion]}</p>
            <div className="popup-buttons">
              <button className="popup-button secondary" onClick={handleClose}>
                {t("close")}
              </button>
              <button className="popup-button primary" onClick={handleDone}>
                {t("done")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionsGrid;
