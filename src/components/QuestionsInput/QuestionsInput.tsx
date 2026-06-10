import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  IconArrowNarrowRight,
  IconArrowsShuffle,
  IconSend,
  IconTrash,
  IconUpload,
} from "@tabler/icons-react";
import Button from "../shared/Button";
import { predefinedSets } from "../../data/predefinedSets";
import { ICON_PROPS } from "../../constants/icons";
import "./QuestionsInput.css";

interface QuestionsInputProps {
  onSave: () => void;
}

function QuestionsInput({ onSave }: QuestionsInputProps) {
  const [questions, setQuestions] = useState("");
  const [selectedSetId, setSelectedSetId] = useState("");
  const { t, i18n } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleLoadSet = () => {
    const selectedSet = predefinedSets.find((set) => set.id === selectedSetId);
    if (selectedSet) {
      const lang = i18n.language as "en" | "uk" | "ru";
      const questionsArray =
        selectedSet.questions[lang] || selectedSet.questions.en;
      setQuestions(questionsArray.join("\n"));
    }
  };

  const handleRandomize = () => {
    if (!questions.trim()) return;
    const arr = questions
      .split("\n")
      .map((q) => q.trim())
      .filter((q) => q.length > 0);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setQuestions(arr.join("\n"));
  };

  const handleClear = () => {
    setQuestions("");
  };

  const handleProceed = () => {
    if (questions.trim()) {
      const questionArray = questions
        .split("\n")
        .map((q) => q.trim())
        .filter((q) => q.length > 0);

      localStorage.setItem("saved_questions", JSON.stringify(questionArray));
      localStorage.setItem("opened_questions", JSON.stringify([]));

      onSave();
    }
  };

  return (
    <div className="app">
      <div className="input-panel">
        <div className="input-header">
          <span className="input-emoji">🎄</span>
          <h1>{t("enterQuestions")}</h1>
          <p className="input-subtitle">{t("inputSubtitle")}</p>
        </div>

        <div className="textarea-row">
          <textarea
            className="questions-textarea"
            value={questions}
            onChange={(e) => setQuestions(e.target.value)}
            placeholder={t("questionsPlaceholder")}
            rows={10}
          />
          <div className="textarea-actions">
            <Button
              color="secondary"
              size="small"
              onClick={handleRandomize}
              disabled={!questions.trim()}
              title={t("randomizeQuestions")}
              startIcon={<IconArrowsShuffle {...ICON_PROPS} />}
            />
            <Button
              color="secondary"
              size="small"
              onClick={handleClear}
              disabled={!questions.trim()}
              title={t("close")}
              startIcon={<IconTrash {...ICON_PROPS} />}
            />
          </div>
        </div>

        <div className="separator">{t("orImportFromFile")}</div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".txt,text/plain"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => {
              const text = (reader.result as string) || "";
              setQuestions(text);
            };
            reader.readAsText(file);
            e.target.value = "";
          }}
        />
        <Button
          color="secondary"
          size="small"
          startIcon={<IconUpload {...ICON_PROPS} />}
          onClick={() => fileInputRef.current?.click()}
        >
          {t("importQuestions")}
        </Button>

        <div className="separator">{t("orSelectPredefined")}</div>

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
            startIcon={<IconSend {...ICON_PROPS} />}
            onClick={handleLoadSet}
            disabled={!selectedSetId}
          >
            {t("loadSet")}
          </Button>
        </div>

        <Button
          color="primary"
          className="proceed-button"
          onClick={handleProceed}
          disabled={!questions.trim()}
          endIcon={<IconArrowNarrowRight {...ICON_PROPS} />}
        >
          {t("proceed")}
        </Button>
      </div>
    </div>
  );
}

export default QuestionsInput;
