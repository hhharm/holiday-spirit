import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../shared/Button";
import QuestionCard from "./QuestionCard";
import "./QuestionsGrid.css";
import {
  IconDownload,
  IconEyeCheck,
  IconEyeX,
  IconRefreshAlert,
  IconRotateClockwise,
} from "@tabler/icons-react";
import { ICON_PROPS } from "../../constants/icons";

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
          <QuestionCard
            key={index}
            index={index}
            isOpened={openedQuestions.includes(index)}
            onClick={handleCardClick}
          />
        ))}
      </div>
      <div className="control-buttons">
        <Button
          color="secondary"
          size="small"
          onClick={onRestart}
          title={t("restartCards")}
          startIcon={<IconRotateClockwise {...ICON_PROPS} />}
        ></Button>
        <Button
          color="secondary"
          size="small"
          onClick={onReset}
          title={t("resetQuestions")}
          startIcon={<IconRefreshAlert {...ICON_PROPS} />}
        ></Button>
        <Button
          color="secondary"
          startIcon={<IconDownload {...ICON_PROPS} />}
          size="small"
          title={t("exportQuestions")}
          onClick={() => {
            const text = savedQuestions.join("\n");
            const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "questions.txt";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }}
        ></Button>
      </div>

      {selectedQuestion !== null && (
        <div className="popup-overlay" onClick={handleClose}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>
              {t("question")} {selectedQuestion + 1}
            </h2>
            <p className="question-text">{savedQuestions[selectedQuestion]}</p>
            <div className="popup-buttons">
              <Button
                color="secondary"
                onClick={handleClose}
                startIcon={<IconEyeX {...ICON_PROPS} />}
              >
                {t("close")}
              </Button>
              <Button
                color="primary"
                onClick={handleDone}
                startIcon={<IconEyeCheck {...ICON_PROPS} />}
              >
                {t("done")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionsGrid;
